import { useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { Camera } from "@mediapipe/camera_utils/camera_utils.js"
import {  Holistic } from "@mediapipe/holistic/holistic"
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'

const WebcamPage=()=> {
  const inputVideoRef = useRef()
  const canvasRef = useRef()
  let ctx = null

  const init = () => {
    // Check data is available
    
    const holistic = new Holistic({
     
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });

    ctx = canvasRef.current.getContext("2d")

    const constraints = {
        video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 }
          }
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      inputVideoRef.current.srcObject = stream
      // sendToMediaPipe();
    });

    holistic.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    holistic.onResults(onResults);

    const camera = new Camera(inputVideoRef.current, {
      onFrame: async () => {
        await holistic.send({ image: inputVideoRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start()
  };
  const drawLandmarks = (landmarks, ctx, color = "aqua", size = 5) => {
    for (const landmark of landmarks) {
      ctx.beginPath()
      ctx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, size, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
    }
  };
  useEffect(() => {
    if (inputVideoRef.current) {
      init();
    }
  }, [inputVideoRef.current])

  const onResults = (results) => {
    ctx.save();
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // Only overwrite existing pixels.
    // ctx.globalCompositeOperation = "source-out";
    // ctx.fillStyle = "#00FF00";
    // ctx.fillRect(
    //   0,
    //   0,
    //   canvasRef.current.width,
    //   canvasRef.current.height
    // );

    // Only overwrite missing pixels.
    // ctx.globalCompositeOperation = "destination-atop";
    ctx.globalCompositeOperation = "source-in"
    ctx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
     // 포즈 랜드마크 그리기

      // 랜드마크 그리기 추가
  if (results.poseLandmarks) {
    drawLandmarks(results.poseLandmarks, ctx);
  }
  if (results.faceLandmarks) {
    drawLandmarks(results.faceLandmarks, ctx);
  }
  if (results.leftHandLandmarks) {
    drawLandmarks(results.leftHandLandmarks, ctx);
  }
  if (results.rightHandLandmarks) {
    drawLandmarks(results.rightHandLandmarks, ctx);
  }
 


    ctx.restore()
  };


  return (
    <div className="App">
      <Webcam


        style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 1200,
        height: 720,
        }}
        ref={inputVideoRef}
/>
      <canvas ref={canvasRef}   style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 1200,
        height: 720,
        }} />
    </div>
  );
}

export default WebcamPage;
