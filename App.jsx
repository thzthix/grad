import React, {useEffect, useRef, useState} from 'react';
import GaugeComponent from './Components/GaugeComponent';
import Webcam from "react-webcam";
import {Camera} from "@mediapipe/camera_utils";
import {FACEMESH_TESSELATION, HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS, Results} from '@mediapipe/holistic';
import './App.css';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'

const App=()=> {


  const [counter, setCounter]=useState(0)
 
  let hasCounted = false;
  //운동 단계를 추적하는 변수 (예제 코드에서는 사용하지 않지만, 상태 관리를 위해 유지)
  let exercisePhase = "none"
  
   //팔이 완전히 굽혀져 있는지 여부를 추적하는 변수
  let fullyBent = false
  //초기 direction 값을 "up"으로 설정
  let direction = "down"  
  //정규화된 각도를 기반으로 판단, 팔이 굽혀지고 있는 상태

  const  calculateAngle=(a, b, c)=> {
    const aPoint = {x: a.x, y: a.y}
    const bPoint = {x: b.x, y: b.y}
    const cPoint = {x: c.x, y: c.y}

    const radians = Math.atan2(cPoint.y - bPoint.y, cPoint.x - bPoint.x) - Math.atan2(aPoint.y - bPoint.y, aPoint.x - bPoint.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }

    return angle;}


  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const onResults = (results) => {
   
    
  const videoWidth = webcamRef.current.video.videoWidth;
  const videoHeight = webcamRef.current.video.videoHeight;
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;

  const canvasElement = canvasRef.current;
  const canvasCtx = canvasElement.getContext("2d");
  if (canvasCtx == null) throw new Error('Could not get context');
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = 'source-in';
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
  //   {color: '#00FF00', lineWidth: 4});
  // drawLandmarks(canvasCtx, results.poseLandmarks,
  //   {color: '#FF0000', lineWidth: 2});
  
 
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
    {color: '#CC0000', lineWidth: 5});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
    {color: '#00FF00', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
    {color: '#00CC00', lineWidth: 5});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
    {color: '#FF0000', lineWidth: 2});


  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      {color: '#00CC00', lineWidth: 5});
 

  drawLandmarks(canvasCtx, results.poseLandmarks,
    {color: '#FF0000', lineWidth: 2});


  canvasCtx.restore();


    // onResults 함수 내에서 각도 계산 예시
  if (results.poseLandmarks) {
    // 예를 들어, 오른쪽 어깨, 팔꿈치, 손목의 랜드마크 인덱스는 각각 11, 13, 15입니다.

    const rightShoulder=results.poseLandmarks[11]
    const rightElbow=results.poseLandmarks[13]
    const rightWrist=results.poseLandmarks[15]

    const leftShoulder=results.poseLandmarks[12]
    const leftElbow=results.poseLandmarks[14]
    const leftWrist=results.poseLandmarks[16]
    let rightAngle = calculateAngle(
      rightShoulder,rightElbow,rightWrist
    );
    let leftAngle = calculateAngle(
      leftShoulder,leftElbow,leftWrist
    );
    

    // 선형 보간 함수
function linearInterpolate(x, x0, x1, y0, y1) {
  return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
}
// 게이지바 그리기 함수
// function drawGaugeBar(canvasCtx, angle, isLeft) {
//   // const baseX = isLeft ? 952 : 8;
//   // const colorNormal = '#00FF00'; // 정상 상태 색상 (녹색)
//   // const colorWarning = '#FF0000'; // 경고 상태 색상 (빨간색)
//   // let gaugeValue = linearInterpolate(angle, 0, 100, 400, 200);

//   // if (angle < 80) {
//   //   canvasCtx.fillStyle = colorWarning;
//   // } else {
//   //   canvasCtx.fillStyle = colorNormal;
//   // }

//   // canvasCtx.fillRect(baseX, gaugeValue, 43, 200 - gaugeValue);

//   const baseX = isLeft ? 952 : 8;
//   const colorNormal = '#FF0000'; // 정상 상태 색상 (빨간색)
//   const colorWarning = '#00FF00'; // 경고 상태 색상 (녹색)
//   let gaugeValue = linearInterpolate(angle, 0, 100, 400, 200);

//   // 각도에 따라 색상 변경
//   canvasCtx.fillStyle = angle >= 70 ? colorWarning : colorNormal;

//   // 게이지가 채워지는 방식 수정
//   // 새로운 채워지는 부분 계산
//   let fillHeight = 200 - gaugeValue;
//   canvasCtx.fillRect(baseX, 200 - fillHeight + 200, 43, fillHeight);
// }
// function drawGaugeBar(canvasCtx, angle, isLeft) {
//   const baseX = isLeft ? 600 : 8;
//   const gaugeWidth = 43;
//   const gaugeHeight = 200;
//   const gaugeX = baseX;
//   const gaugeY = 200; // 게이지 시작 위치 조정 필요 시 변경
//   const colorNormal = '#FF0000'; // 정상 상태 색상 (빨간색)
//   const colorWarning = '#00FF00'; // 경고 상태 색상 (녹색)
//   let gaugeValue = linearInterpolate(angle, 0, 100, gaugeY + gaugeHeight, gaugeY);

//   // 게이지 테두리 그리기
//   canvasCtx.strokeStyle = 'black'; // 테두리 색상
//   canvasCtx.lineWidth = 4; // 테두리 두께
//   canvasCtx.strokeRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);

//   // 각도에 따라 색상 변경
//   canvasCtx.fillStyle = angle >= 80 ? colorWarning : colorNormal;

//   // 게이지 채우기
//   canvasCtx.fillRect(gaugeX + 2, gaugeValue, gaugeWidth - 4, gaugeY + gaugeHeight - gaugeValue);

//   // 테두리 내부만 채우기 위해
// }

function drawGaugeBar(canvasCtx, angle, isLeft) {
  const baseX = isLeft ? 550 : 8;
  const gaugeWidth = 43;
  const gaugeHeight = 200;
  const gaugeX = baseX;
  const gaugeY = 200; // 게이지 시작 위치 조정 필요 시 변경
  const colorNormal = '#FF0000'; // 정상 상태 색상 (빨간색)
  const colorWarning = '#00FF00'; // 경고 상태 색상 (녹색)
  
  // 각도에 따른 게이지의 높이 계산
  let gaugeValue = linearInterpolate(angle, 0, 100, gaugeY + gaugeHeight, gaugeY);
  
  // 게이지가 테두리 내부에만 채워지도록 gaugeValue의 범위를 제한
  gaugeValue = Math.max(gaugeValue, gaugeY);
  gaugeValue = Math.min(gaugeValue, gaugeY + gaugeHeight);

  // 게이지 테두리 그리기
  canvasCtx.strokeStyle = 'black'; // 테두리 색상
  canvasCtx.lineWidth = 4; // 테두리 두께
  canvasCtx.strokeRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);

  // 각도에 따라 색상 변경
  canvasCtx.fillStyle = angle >= 80 ? colorWarning : colorNormal;

  // 게이지 채우기 (테두리를 고려하여 채움)
  // 테두리 두께를 고려하여 fillRect의 x값 시작점과 너비를 조정
  const fillX = gaugeX + canvasCtx.lineWidth/2;
  const fillWidth = gaugeWidth - canvasCtx.lineWidth;
  const fillHeight = gaugeY + gaugeHeight - gaugeValue - canvasCtx.lineWidth/2;
  canvasCtx.fillRect(fillX, gaugeValue, fillWidth, fillHeight);
}


function drawLabels(canvasCtx) {
  // 텍스트 스타일 설정
  canvasCtx.fillStyle = 'black'; // 텍스트 색상
  canvasCtx.font = '20px Arial'; // 텍스트 폰트 및 크기
  canvasCtx.textAlign = 'center'; // 텍스트 정렬

  // 왼쪽 상태바 위에 "L" 표시
  canvasCtx.fillText('L', 800 + 21.5, 195); // 952는 왼쪽 상태바의 X 위치, 21.5는 상태바 너비의 절반

  // 오른쪽 상태바 위에 "R" 표시
  canvasCtx.fillText('R', 8 + 21, 195); // 8은 오른쪽 상태바의 X 위치, 21은 상태바 너비의 절반

  
}
// console.log(rightAngle,leftAngle)

    leftAngle = Math.round(linearInterpolate(leftAngle, 34, 180, 100, 0));
    rightAngle = Math.round(linearInterpolate(rightAngle, 34, 173, 100, 0));

    


    //정규화된 각도를 기반으로 판단, 팔이 굽혀지고 있는 상태

    // 운동 단계 로직
// 운동 단계 로직
// 운동 단계 로직
// 초기 상태 설정

function updateCounterIfNeeded() {
  // 운동의 상태와 각도 조건을 확인하여 카운터를 업데이트할지 결정
  if (exercisePhase === "down" && !fullyBent && leftAngle >= 80 && rightAngle >= 80) {
    setCounter(prev => prev + 1);
    fullyBent = true;  // 완전히 굽혔음을 표시
  } else if ((leftAngle <= 70 || rightAngle <= 70) && fullyBent) {
    // 팔이 충분히 펴졌고, 이전에 완전히 굽혔던 상태였다면, 다음 굽힘 준비
    fullyBent = false;
  }
}

// 운동 상태를 업데이트하는 로직
if (leftAngle >= 10 && rightAngle >= 10) {
  exercisePhase = "down";
  updateCounterIfNeeded();  // 카운터 업데이트 여부 검사 및 업데이트
} else if (leftAngle <= 70 || rightAngle <= 70) {
  exercisePhase = "up";
  updateCounterIfNeeded();  // 카운터 업데이트 여부 검사 및 업데이트
}



    


 // 왼쪽 및 오른쪽 게이지바 그리기
 drawGaugeBar(canvasCtx, leftAngle, true); // 왼쪽 게이지바
 drawGaugeBar(canvasCtx, rightAngle, false); // 오른쪽 게이지바

 drawLabels(canvasCtx)
  

  
  }}

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });
    holistic.setOptions({
      selfieMode: true,
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    holistic.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      if (!webcamRef.current?.video) return
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (!webcamRef.current?.video) return
          await holistic.send({image: webcamRef.current.video});
        },
        width: 1200,
        height: 800,
      });
      camera.start();
    }
  }, [])
  return (
    <div className="App">
       <div>  <button onClick={()=>{
        setCounter(0)
        exercisePhase="none"
        fullyBent=false
      }}>Start</button></div>
      <div>{`counter:${counter}`}</div>
   
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 1200,
          height: 800,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 1200,
          height: 800,
        }}
      />
    </div>
  );

}
export default App
