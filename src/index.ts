import "./styles/index.scss";

const init = async (): Promise<void> => {
  const video = document.getElementById("video") as HTMLVideoElement;
  const audio = document.getElementById("recording") as HTMLAudioElement;
  // const btnStop = document.getElementById("stop") as HTMLButtonElement;
  // const btnPlay = document.getElementById("play") as HTMLButtonElement;
  const btnRecord = document.getElementById("record") as HTMLButtonElement;
  const inputRouting = document.getElementById("routing") as HTMLInputElement;

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
  const recordingSource = audioContext.createMediaStreamSource(streamMic);
  const recordingDestination = audioContext.createMediaStreamDestination();
  const audioTrackVideo = audioContext.createMediaElementSource(video);
  const recorder = new MediaRecorder(recordingDestination.stream);
  audioTrackVideo.connect(audioContext.destination);
  audioTrackVideo.connect(recordingDestination);

  let isRecording = false;
  let hardwareMixing = false;

  video.src = "./95BPM.mp4";

  inputRouting.addEventListener("change", (e) => {
    hardwareMixing = (e.target as HTMLInputElement).checked;
    try {
      if (hardwareMixing) {
        // add audio track of video to recording
        audioTrackVideo.disconnect(recordingDestination);
      } else {
        audioTrackVideo.connect(recordingDestination);
      }
    } catch (e) {
      console.log(e);
    }
  });

  btnRecord.addEventListener("click", () => {
    // route to speakers/headphones

    if (isRecording) {
      isRecording = false;
      btnRecord.innerHTML = "start recording";
      recorder.stop();
      video.pause();
      video.currentTime = 0;
      recordingSource.disconnect(recordingDestination);
      return;
    }

    btnRecord.innerHTML = "stop recording";
    recordingSource.connect(recordingDestination);

    recorder.ondataavailable = async (event: { data: BlobPart }) => {
      const blob = new Blob([event.data], { type: "audio/ogg; codecs=opus" });
      const url = window.URL.createObjectURL(blob);
      audio.src = url;
      // const a = document.createElement("A") as HTMLAnchorElement;
      // a.href = url;
      // a.download = url;
      // a.click();
      // window.URL.revokeObjectURL(url);
    };

    video.play();
    recorder.start();
    isRecording = true;
  });

  // btnPlay.addEventListener("click", () => {
  //   video.play();
  // });

  // btnStop.addEventListener("click", () => {
  //   video.pause();
  //   if (isRecording === true) {
  //     // video.muted = false;
  //     recorder.stop();
  //     isRecording = false;
  //   }
  // });

  // video.addEventListener("canplay", async () => {
  // });

  // video.srcObject = s;
  // video.play();
  // video.muted = true;
  // s.getTracks().forEach(track => {
  //   if (track.kind === "video") {
  //     const settings = track.getSettings();
  //     videoWidth = settings.width;
  //     videoHeight = settings.height;
  //   }
  // });

  // source.connect(audioCtx.destination);
};

document.addEventListener("DOMContentLoaded", init);
