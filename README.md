# Trip Croquis

## 📌 프로젝트 소개

Trip Croquis는 여행 경로를 쉽게 기록하고, 공유할 수 있도록 도와주는 웹 애플리케이션입니다. 사용자는 방문한 장소를 입력하고, 이동 경로를 시각적으로 확인하며, 전체 여행 경로를 이미지로 저장할 수 있습니다.

## 🚀 주요 기능

- **장소 검색 및 추가**: Google Maps API를 이용해 원하는 장소를 검색하고 목록에 추가할 수 있습니다.
- **이동 거리 계산**: 추가된 장소 간 이동 거리를 자동으로 계산해 표시합니다.
- **여행 경로 시각화**: 지도 위에 선택한 장소들과 경로를 표시합니다.
- **이미지 저장 및 공유**: 여행 경로를 이미지로 캡처하여 저장할 수 있습니다.

## 🛠 기술 스택

- **Frontend**: React, Styled-Components
- **Maps & Geolocation**: Google Maps API, Places API, Geometry API
- **이미지 캡처**: html2canvas

## 📂 프로젝트 구조

TripCroquis/ │── public/ │── src/ │ ├── components/ │ │ ├── Travel.js │ │ ├── BottomNav.js │ │ ├── ShareCapture.js │ ├── App.js │ ├── index.js │── package.json │── README.md


## 📖 사용 방법

1. 의존성 설치:
    ```bash
    npm install
    # 또는
    yarn install
    ```

2. `.env` 파일을 만들고, `VITE_APP_API_KEY=YOUR_GOOGLE_MAPS_API_KEY`를 추가합니다.

3. 애플리케이션 실행:
    ```bash
    npm start
    # 또는
    yarn start
    ```

4. 장소를 검색하여 추가하고, 공유 버튼을 눌러 경로를 저장합니다.

## ✨ 앞으로의 개선 사항

- 사용자 로그인 및 여행 데이터 저장 기능 추가
- 모바일 UI 최적화
- 다크 모드 지원
