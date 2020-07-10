import adapter from "webrtc-adapter";
import "./styles/index.scss";

console.log(adapter.browserDetails);

const init = async (): Promise<void> => {
  const video = document.getElementById("video") as HTMLVideoElement;
  const listRecordings = document.getElementById("recordings") as HTMLDivElement;
  const btnRecord = document.getElementById("record") as HTMLButtonElement;
  const inputRouting = document.getElementById("routing") as HTMLInputElement;

  const addRecording = (event: BlobEvent) => {
    const blob = new Blob([event.data], { type: "audio/ogg; codecs=opus" });
    const url = window.URL.createObjectURL(blob);
    const audio = document.createElement("audio") as HTMLAudioElement;
    audio.src = url;
    audio.controls = true;
    const btnDelete = document.createElement("button") as HTMLButtonElement;
    btnDelete.innerHTML = "delete";
    btnDelete.addEventListener("click", (e: InputEvent) => {
      const target = e.target as HTMLButtonElement;
      const audio = target.previousSibling as HTMLAudioElement;
      window.URL.revokeObjectURL(audio.src);
      target.parentNode.parentNode.removeChild(target.parentNode);
    });
    const article = document.createElement("article");
    article.appendChild(audio);
    article.appendChild(btnDelete);
    listRecordings.appendChild(article);
  };

  const streamMic = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      latency: { max: 10 / 1000 },
      sampleSize: { max: 64 },
      channelCount: 2,
    },
  });

  const audioContext = new AudioContext();
  const audioTrackVideo = audioContext.createMediaElementSource(video);
  const microphoneInput = audioContext.createMediaStreamSource(streamMic);
  const recordingDestination = audioContext.createMediaStreamDestination();
  const recorder = new MediaRecorder(recordingDestination.stream);
  audioTrackVideo.connect(audioContext.destination);
  audioTrackVideo.connect(recordingDestination);

  let isRecording = false;
  let hardwareMixing = false;

  video.src = "./95BPM.mp4";

  inputRouting.addEventListener("change", (e) => {
    hardwareMixing = (e.target as HTMLInputElement).checked;
    try {
      // hardware mixing means that the signal of your microphone and the audio of the
      // video are mixed on your sound card, so when hardware mixing is enabled we don't
      // have to add the audio of teh video to the MediaStream that we send to MediaRecorder
      if (hardwareMixing) {
        audioTrackVideo.disconnect(recordingDestination);
      } else {
        audioTrackVideo.connect(recordingDestination);
      }
    } catch (e) {
      console.log(e);
    }
  });

  btnRecord.addEventListener("click", () => {
    if (isRecording) {
      isRecording = false;
      btnRecord.innerHTML = "start recording";
      recorder.stop();
      video.pause();
      video.currentTime = 0;
      microphoneInput.disconnect(recordingDestination);
      return;
    }

    btnRecord.innerHTML = "stop recording";
    microphoneInput.connect(recordingDestination);

    recorder.ondataavailable = async (event: BlobEvent) => {
      addRecording(event);
    };

    video.play();
    recorder.start();
    isRecording = true;
  });
};

document.addEventListener("DOMContentLoaded", init);
