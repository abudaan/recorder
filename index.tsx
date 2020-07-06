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
  const recording = audioContext.createMediaStreamSource(s);
  // const audioBuffer = await audioContext.decodeAudioData(ab);

  // let videoWidth = 0;
  // let videoHeight = 0;
  const div = document.getElementById("app");
  const btnStop = document.createElement("BUTTON") as HTMLButtonElement;
  btnStop.innerHTML = "stop";
  const btnPlay = document.createElement("BUTTON") as HTMLButtonElement;
  btnPlay.innerHTML = "play";
  const video = document.createElement("VIDEO") as HTMLVideoElement;
  video.id = "video";
  video.style.width = "800px";
  video.style.height = "500px";
  div.appendChild(video);
  div.appendChild(btnStop);
  div.appendChild(btnPlay);

  const chunks = [];

  // console.log(recording.mediaStream.getTracks());

  video.addEventListener("canplay", async () => {
    // listen to backing
    const backing = audioContext.createMediaElementSource(video);
    backing.connect(audioContext.destination);

    // record play along
    const dest = audioContext.createMediaStreamDestination();
    recording.connect(dest);
    let recorder: MediaRecorder;
    // backing.connect(dest);
    // console.log(s.getAudioTracks()[0].getConstraints());
    // recording.connect(audioContext.destination);
    btnPlay.addEventListener("click", () => {
      video.play();
      // const elem = document.querySelector("video") as HTMLVideoElement;
      // console.log(elem);
      // let combined = new MediaStream([
      //   ...s.getAudioTracks(),
      //   ...dest.stream.getAudioTracks(),
      //   // ...recording.mediaStream.getTracks(),
      // ]);

      const combined = new MediaStream(dest.stream);
      // combined.addTrack(dest.stream.getAudioTracks()[0]);
      // combined.addTrack(s.getAudioTracks()[0]);

      // console.log(combined.getAudioTracks(), dest.stream.getAudioTracks());
      // let combined = new MediaStream(backing);
      // console.log(dest.stream.getTracks());
      // console.log((elem as any).audioTracks);
      recorder = new MediaRecorder(new MediaStream(combined));
      recorder.ondataavailable = async (event: { data: BlobPart }) => {
        const blob = new Blob([event.data], { type: "video/webm" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("A") as HTMLAnchorElement;
        a.href = url;
        a.download = url;
        a.click();
        window.URL.revokeObjectURL(url);
        // if (typeof event.data === "undefined") return;
        // // if (event.data.size === 0) return;
        // chunks.push(event.data);
      };
      recorder.start();
    });
    btnStop.addEventListener("click", () => {
      video.pause();
      recorder.stop();
      // const url = window.URL.createObjectURL(new Blob(chunks, { type: "video/webm" }));
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
