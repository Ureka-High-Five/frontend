# 🎬 ReadMe & LeadMe

**ReadMe & LeadMe**는 영화 및 콘텐츠 정보를 쉽고 빠르게 탐색하고,  
리뷰를 남기며 다양한 유저들과 소통할 수 있는 콘텐츠 큐레이션 서비스입니다.



## 🚀 주요 기능
### 콘텐츠 추천
  - 사용자의 취향, 시청 이력, 인기 순위 등을 기반으로 맞춤형 영화/콘텐츠 추천
  - 홈 화면에서 다양한 추천 섹션(오늘의 추천, 장르별 추천 등) 제공
### 쇼츠(Shorts)
  - 짧은 영상(쇼츠) 형태로 콘텐츠 하이라이트, 예고편 등 제공
  - 스와이프/스크롤 기반 UI로 빠르고 직관적인 탐색
  - 쇼츠별 좋아요, 공유, 댓글 등 인터랙션 지원
### 리뷰(평점/코멘트) 작성 및 조회
  - 내 리뷰 작성/수정/삭제 및 별도 스타일 강조
  - 모든 유저의 리뷰를 무한스크롤로 탐색
  - 리뷰 작성 시 상태 관리(작성 중, 완료, 에러 등) 및 에러 핸들링


## 🛠️ 기술 스택

| 분야                    | 기술 스택                                                                                                                                                                                                                                  |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend**          | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF4EAF?style=flat&logo=framer&logoColor=white) |
| **State Management**  | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=ReactQuery&logoColor=white)                                                                                                                               |
| **API 통신**           | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat) ![RESTful API](https://img.shields.io/badge/RESTful_API-000000?style=flat&logo=OpenAPI-Initiative&logoColor=white)                                                        |
| **인증**              | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![Kakao](https://img.shields.io/badge/Kakao_Login-FFCD00?style=flat&logo=KakaoTalk&logoColor=black)                                          |
| **Code Quality**      | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-000000?style=flat) |
| **기타**              | ![Lucide](https://img.shields.io/badge/Lucide_Icons-000000?style=flat)                                                                                                                                                                     |



## 📦 폴더 구조

```
src/
  apis/           # API 함수 모음
  components/     # UI 컴포넌트
  hooks/          # 커스텀 훅
  pages/          # 라우트별 페이지
  types/          # 타입 정의
  constants/      # 상수/엔드포인트
```

## 💡 아토믹 디자인 패턴


| 구조 적용 예시 | 구성 설명 |
|----------------|-----------|
| <img width="480" alt="atomic" src="https://github.com/user-attachments/assets/27764edc-e57d-425e-98df-b26d5b5871d4" />  | UI 컴포넌트를 Atom, Molecule, Organism 단위로 계층화하여 역할을 명확히 분리하고, 일관된 UI 설계를 구축 </br> Template 컴포넌트는 시각적 레이아웃과 구성에 집중하고, Page 컴포넌트는 데이터 주입과 비즈니스 로직을 담당하도록 구조화 |

## 💡 HLS 기반 영상 스트리밍 구조


| 구조 적용 예시 | 구성 설명 |
|----------------|-----------|
| <img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/74cfc404-14ac-42da-8bd7-745065226a9e" /> | 계층적 스트림 관리: 하나의 마스터 playlist(m3u8)가 여러 해상도별 playlist(m3u8)로 분기되며, 각 해상도 playlist는 초 단위로 분할된 세그먼트(ts) 파일로 구성<br>적응형 스트리밍(ABR): 클라이언트는 재생 중 네트워크 속도, 디바이스 성능 등의 환경 정보를 실시간으로 감지하여, 최적의 해상도 playlist와 segment 조각을 선택·다운로드<br>네트워크가 느려지면 더 낮은 해상도의 segment로, 빨라지면 고해상도 segment로 자동 전환되어 끊김 없는 재생 |
## 🖥️ 로컬 개발 환경

1. **의존성 설치**
   ```bash
   npm install
   ```
2. **환경변수 설정**
   - `.env` 파일에 API 서버 주소, 카카오 키 등 입력
3. **개발 서버 실행**
   ```bash
   npm run dev
   ```


## 👥 팀원 소개
|<img src="https://avatars.githubusercontent.com/u/108103346?v=4" width="150" height="150"/>|<img src="https://github.com/user-attachments/assets/faa045a0-4938-43d4-9d86-b046b49d8170" width="150" height="150"/>|<img src="https://github.com/user-attachments/assets/f60b865e-6dd8-4758-8393-e1174eb5c75f" width="150" height="150"/>|
|:-:|:-:|:-:|
|이은비<br/>[@silverain02](https://github.com/silverain02)|박재민<br/>[@0Jaemin0](https://github.com/0Jaemin0)|이예슬<br/>[@neungdong](https://github.com/neungdong)|
|- 팀장, 기획 및 디자인 총괄<br/>- 콘텐츠 상세 페이지<br/>- 쇼츠 영상 스트리밍 <br/>- 레이팅 로직 도입 |- FE 기술 담당<br/>- 사용자 인증<br/>- 온보딩 페이지<br/>- 마이페이지<br/>- 백오피스 |- 홈 페이지 개발<br/>- 쇼츠 인터랙션 <br/> - 프리패칭 적용 |



