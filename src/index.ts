import "./styles/index.scss";

const init = async (): Promise<void> => {
  const streamMic = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: false,
      latency: { max: 10 / 1000 },
      sampleSize: { max: 64 },
    },
  });

  const audioContext = new AudioContext();
  const recordingSource = audioContext.createMediaStreamSource(streamMic);
  const recordingDestination = audioContext.createMediaStreamDestination();
  recordingSource.connect(recordingDestination);

  // const audioBuffer = await audioContext.decodeAudioData(ab);
  let recorder: MediaRecorder;
  let isRecording = false;

  const video = document.getElementById("video") as HTMLVideoElement;
  const audio = document.getElementById("recording") as HTMLAudioElement;
  // const btnStop = document.getElementById("stop") as HTMLButtonElement;
  // const btnPlay = document.getElementById("play") as HTMLButtonElement;
  const btnRecord = document.getElementById("record") as HTMLButtonElement;

  video.addEventListener("canplay", async () => {
    // btnPlay.addEventListener("click", () => {
    //   video.play();
    // });
    const backing = audioContext.createMediaElementSource(video);

    btnRecord.addEventListener("click", () => {
      if (isRecording) {
        isRecording = false;
        btnRecord.innerHTML = "start recording";
        video.pause();
        recorder.stop();
        return;
      }
      btnRecord.innerHTML = "stop recording";

      // get audiostream from video
      // connect to output so you can hear it
      backing.connect(audioContext.destination);
      // connect to recording destination
      // backing.connect(recordingDestination);

      video.play();

      recorder = new MediaRecorder(recordingDestination.stream);
      recorder.ondataavailable = async (event: { data: BlobPart }) => {
        const blob = new Blob([event.data], { type: "audio/ogg; codecs=opus" });
        const url = window.URL.createObjectURL(blob);
        audio.src = url;
        console.log("data available");
        // const a = document.createElement("A") as HTMLAnchorElement;
        // a.href = url;
        // a.download = url;
        // a.click();
        // window.URL.revokeObjectURL(url);
      };
      recorder.start();
      isRecording = true;
    });

    // btnStop.addEventListener("click", () => {
    //   video.pause();
    //   if (isRecording === true) {
    //     // video.muted = false;
    //     recorder.stop();
    //     isRecording = false;
    //   }
    // });
  });

  video.src = "./95BPM.mp4";
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
