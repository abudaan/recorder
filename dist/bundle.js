/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './styles/index.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const s = yield navigator.mediaDevices.getUserMedia({
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
    const btnStop = document.createElement("BUTTON");
    btnStop.innerHTML = "stop";
    const btnPlay = document.createElement("BUTTON");
    btnPlay.innerHTML = "play";
    const video = document.createElement("VIDEO");
    video.id = "video";
    video.style.width = "800px";
    video.style.height = "500px";
    div.appendChild(video);
    div.appendChild(btnStop);
    div.appendChild(btnPlay);
    const chunks = [];
    // console.log(recording.mediaStream.getTracks());
    video.addEventListener("canplay", () => __awaiter(void 0, void 0, void 0, function* () {
        // listen to backing
        const backing = audioContext.createMediaElementSource(video);
        backing.connect(audioContext.destination);
        // record play along
        const dest = audioContext.createMediaStreamDestination();
        recording.connect(dest);
        let recorder;
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
            recorder.ondataavailable = (event) => __awaiter(void 0, void 0, void 0, function* () {
                const blob = new Blob([event.data], { type: "video/webm" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("A");
                a.href = url;
                a.download = url;
                a.click();
                window.URL.revokeObjectURL(url);
                // if (typeof event.data === "undefined") return;
                // // if (event.data.size === 0) return;
                // chunks.push(event.data);
            });
            recorder.start();
        });
        btnStop.addEventListener("click", () => {
            video.pause();
            recorder.stop();
            // const url = window.URL.createObjectURL(new Blob(chunks, { type: "video/webm" }));
        });
    }));
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
});
document.addEventListener("DOMContentLoaded", init);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxtS0FBNkI7QUFFN0IsTUFBTSxJQUFJLEdBQUcsR0FBd0IsRUFBRTtJQUNyQyxNQUFNLENBQUMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQ2xELEtBQUssRUFBRTtZQUNMLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRTtZQUMzQixVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1NBQ3hCO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxZQUFZLEdB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Q1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLGlEQUFpRDtnQkFDakQsd0NBQXdDO2dCQUN4QywyQkFBMkI7WUFDN0IsQ0FBQyxFQUFDO1lBQ0YsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDckMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLG9GQUFvRjtRQUN0RixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsRUFBQyxDQUFDO0lBRUgsS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUM7SUFDMUIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIsbUNBQW1DO0lBQ25DLGtDQUFrQztJQUNsQyw0Q0FBNEM7SUFDNUMsbUNBQW1DO0lBQ25DLHFDQUFxQztJQUNyQyxNQUFNO0lBQ04sTUFBTTtJQUVOLHdDQUF3QztBQUMxQyxDQUFDLEVBQUM7QUFFRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5cbmNvbnN0IGluaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IHMgPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XG4gICAgYXVkaW86IHtcbiAgICAgIGVjaG9DYW5jZWxsYXRpb246IHRydWUsXG4gICAgICBub2lzZVN1cHByZXNzaW9uOiBmYWxzZSxcbiAgICAgIGxhdGVuY3k6IHsgbWF4OiAxMCAvIDEwMDAgfSxcbiAgICAgIHNhbXBsZVNpemU6IHsgbWF4OiA2NCB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgY29uc3QgcmVjb3JkaW5nID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHMpO1xuICAvLyBjb25zdCBhdWRpb0J1ZmZlciA9IGF3YWl0IGF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYWIpO1xuXG4gIC8vIGxldCB2aWRlb1dpZHRoID0gMDtcbiAgLy8gbGV0IHZpZGVvSGVpZ2h0ID0gMDtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG4gIGNvbnN0IGJ0blN0b3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQlVUVE9OXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBidG5TdG9wLmlubmVySFRNTCA9IFwic3RvcFwiO1xuICBjb25zdCBidG5QbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkJVVFRPTlwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgYnRuUGxheS5pbm5lckhUTUwgPSBcInBsYXlcIjtcbiAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVklERU9cIikgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgdmlkZW8uaWQgPSBcInZpZGVvXCI7XG4gIHZpZGVvLnN0eWxlLndpZHRoID0gXCI4MDBweFwiO1xuICB2aWRlby5zdHlsZS5oZWlnaHQgPSBcIjUwMHB4XCI7XG4gIGRpdi5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gIGRpdi5hcHBlbmRDaGlsZChidG5TdG9wKTtcbiAgZGl2LmFwcGVuZENoaWxkKGJ0blBsYXkpO1xuXG4gIGNvbnN0IGNodW5rcyA9IFtdO1xuXG4gIC8vIGNvbnNvbGUubG9nKHJlY29yZGluZy5tZWRpYVN0cmVhbS5nZXRUcmFja3MoKSk7XG5cbiAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwgYXN5bmMgKCkgPT4ge1xuICAgIC8vIGxpc3RlbiB0byBiYWNraW5nXG4gICAgY29uc3QgYmFja2luZyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UodmlkZW8pO1xuICAgIGJhY2tpbmcuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgLy8gcmVjb3JkIHBsYXkgYWxvbmdcbiAgICBjb25zdCBkZXN0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtRGVzdGluYXRpb24oKTtcbiAgICByZWNvcmRpbmcuY29ubmVjdChkZXN0KTtcbiAgICBsZXQgcmVjb3JkZXI6IE1lZGlhUmVjb3JkZXI7XG4gICAgLy8gYmFja2luZy5jb25uZWN0KGRlc3QpO1xuICAgIC8vIGNvbnNvbGUubG9nKHMuZ2V0QXVkaW9UcmFja3MoKVswXS5nZXRDb25zdHJhaW50cygpKTtcbiAgICAvLyByZWNvcmRpbmcuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIGJ0blBsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgIC8vIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGVsZW0pO1xuICAgICAgLy8gbGV0IGNvbWJpbmVkID0gbmV3IE1lZGlhU3RyZWFtKFtcbiAgICAgIC8vICAgLi4ucy5nZXRBdWRpb1RyYWNrcygpLFxuICAgICAgLy8gICAuLi5kZXN0LnN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLFxuICAgICAgLy8gICAvLyAuLi5yZWNvcmRpbmcubWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCksXG4gICAgICAvLyBdKTtcblxuICAgICAgY29uc3QgY29tYmluZWQgPSBuZXcgTWVkaWFTdHJlYW0oZGVzdC5zdHJlYW0pO1xuICAgICAgLy8gY29tYmluZWQuYWRkVHJhY2soZGVzdC5zdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXSk7XG4gICAgICAvLyBjb21iaW5lZC5hZGRUcmFjayhzLmdldEF1ZGlvVHJhY2tzKClbMF0pO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhjb21iaW5lZC5nZXRBdWRpb1RyYWNrcygpLCBkZXN0LnN0cmVhbS5nZXRBdWRpb1RyYWNrcygpKTtcbiAgICAgIC8vIGxldCBjb21iaW5lZCA9IG5ldyBNZWRpYVN0cmVhbShiYWNraW5nKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGRlc3Quc3RyZWFtLmdldFRyYWNrcygpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKChlbGVtIGFzIGFueSkuYXVkaW9UcmFja3MpO1xuICAgICAgcmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcihuZXcgTWVkaWFTdHJlYW0oY29tYmluZWQpKTtcbiAgICAgIHJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGFzeW5jIChldmVudDogeyBkYXRhOiBCbG9iUGFydCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZXZlbnQuZGF0YV0sIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSk7XG4gICAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkFcIikgYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgICAgYS5kb3dubG9hZCA9IHVybDtcbiAgICAgICAgYS5jbGljaygpO1xuICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICAvLyBpZiAodHlwZW9mIGV2ZW50LmRhdGEgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICAgICAgLy8gLy8gaWYgKGV2ZW50LmRhdGEuc2l6ZSA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAvLyBjaHVua3MucHVzaChldmVudC5kYXRhKTtcbiAgICAgIH07XG4gICAgICByZWNvcmRlci5zdGFydCgpO1xuICAgIH0pO1xuICAgIGJ0blN0b3AuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICByZWNvcmRlci5zdG9wKCk7XG4gICAgICAvLyBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihjaHVua3MsIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSkpO1xuICAgIH0pO1xuICB9KTtcblxuICB2aWRlby5zcmMgPSBcIi4vOTVCUE0ubXA0XCI7XG4gIC8vIHZpZGVvLnNyY09iamVjdCA9IHM7XG4gIC8vIHZpZGVvLnBsYXkoKTtcbiAgLy8gdmlkZW8ubXV0ZWQgPSB0cnVlO1xuICAvLyBzLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xuICAvLyAgIGlmICh0cmFjay5raW5kID09PSBcInZpZGVvXCIpIHtcbiAgLy8gICAgIGNvbnN0IHNldHRpbmdzID0gdHJhY2suZ2V0U2V0dGluZ3MoKTtcbiAgLy8gICAgIHZpZGVvV2lkdGggPSBzZXR0aW5ncy53aWR0aDtcbiAgLy8gICAgIHZpZGVvSGVpZ2h0ID0gc2V0dGluZ3MuaGVpZ2h0O1xuICAvLyAgIH1cbiAgLy8gfSk7XG5cbiAgLy8gc291cmNlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG4iXSwic291cmNlUm9vdCI6IiJ9