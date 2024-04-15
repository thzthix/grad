import pandas as pd
import numpy as np
import mediapipe as mp

# Mediapipe 설정
mp_pose = mp.solutions.pose

# CSV 파일 읽기
df = pd.read_csv('./data/imagePoses.csv')  # 'your_dataset.csv'를 실제 파일 경로로 변경하세요.

def parse_pose_landmarks(pose_landmarks_str):
    landmarks_list = pose_landmarks_str.strip("[]").split(", ")
    parsed_landmarks = []
    for landmark in landmarks_list:
        values = landmark.split(",")
        x = float(values[0].split(": ")[1])
        y = float(values[1].split(": ")[1])
        z = float(values[2].split(": ")[1])
        visibility = float(values[3].split(": ")[1].rstrip("',"))
        parsed_landmarks.append([x, y, z, visibility])
    return parsed_landmarks

# 'poseLandmarks' 열에 대해 파싱 함수 적용
df = df.dropna(subset=['poseLandmarks'])
df['parsed_landmarks'] = df['poseLandmarks'].apply(parse_pose_landmarks)

def calculate_angle(landmark1, landmark2, landmark3):
    a = np.array(landmark1[:2])  # z 좌표는 무시
    b = np.array(landmark2[:2])
    c = np.array(landmark3[:2])

    ba = a - b
    bc = c - b

    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.arccos(np.clip(cosine_angle, -1.0, 1.0))
    return np.degrees(angle)

# 'exercise' 열이 'pushup'인 데이터만 필터링
pushup_df = df[df['excercise'].str.lower() == 'pushup']

left_angles = []
right_angles = []

for _, row in pushup_df.iterrows():
    landmarks = row['parsed_landmarks']
    if landmarks:
        # 인덱스는 Mediapipe의 PoseLandmark에 해당하는 인덱스를 사용합니다.
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
        left_elbow = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value]
        left_wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
        right_elbow = landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value]
        right_wrist = landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value]

        left_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
        right_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)
        left_angles.append(left_angle)
        right_angles.append(right_angle)
    else:
        left_angles.append(None)
        right_angles.append(None)

# 계산된 각도를 pushup_df에 추가
pushup_df['left_arm_angle'] = left_angles
pushup_df['right_arm_angle'] = right_angles

# 이제 필터링된 데이터프레임을 저장
# 'left_arm_angle'과 'right_arm_angle' 열만 포함하는 새로운 데이터프레임 생성
df_angles = pushup_df[['left_arm_angle', 'right_arm_angle']]

# 새로운 데이터프레임을 CSV 파일로 저장
df_angles.to_csv('pushup_angles.csv', index=False)

print('각도 계산이 완료되어 "pushup_angles.csv" 파일로 저장되었습니다.')


print('각도 계산이 완료되어 "pushup_processed_dataset.csv" 파일로')
