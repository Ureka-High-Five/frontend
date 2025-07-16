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

- **Frontend:** React 18, TypeScript, Vite, React Query, TailwindCSS, Framer Motion
- **State Management:** React Query
- **API 통신:** Axios, RESTful API
- **인증:** JWT, Social Login (Kakao)
- **기타:** ESLint, Prettier, Husky, Lucide Icons


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

