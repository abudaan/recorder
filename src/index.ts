import "./styles/index.scss";

const init = async (): Promise<void> => {
  const s = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: false,
      latency: { max: 10 / 1000 },
      sampleSize: { max: 64 },
    },
  });

  const audioContext = new AudioContext();
  // const audioBuffer = await audioContext.decodeAudioData(ab);

  const video = document.getElementById("video") as HTMLVideoElement;
  const btnStop = document.getElementById("stop") as HTMLButtonElement;
  const btnPlay = document.getElementById("play") as HTMLButtonElement;
  const btnRecord = document.getElementById("record") as HTMLButtonElement;

  let isRecording = false;

  // console.log(recording.mediaStream.getTracks());

  video.addEventListener("canplay", async () => {
    // listen to backing
    const backing = audioContext.createMediaElementSource(video);
    const recording = audioContext.createMediaStreamSource(s);
    backing.connect(audioContext.destination);

    // record play along
    const dest = audioContext.createMediaStreamDestination();
    recording.connect(dest);
    backing.connect(dest);
    let recorder: MediaRecorder;
    // console.log(s.getAudioTracks()[0].getConstraints());
    // recording.connect(audioContext.destination);
    btnPlay.addEventListener("click", () => {
      video.play();
    });

    btnRecord.addEventListener("click", () => {
      video.play();
      recorder = new MediaRecorder(new MediaStream(dest.stream));
      recorder.ondataavailable = async (event: { data: BlobPart }) => {
        const blob = new Blob([event.data], { type: "video/webm" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("A") as HTMLAnchorElement;
        a.href = url;
        a.download = url;
        a.click();
        window.URL.revokeObjectURL(url);
      };
      recorder.start();
      isRecording = true;
    });

    btnStop.addEventListener("click", () => {
      video.pause();
      if (isRecording === true) {
        recorder.stop();
        isRecording = false;
      }
    });
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
