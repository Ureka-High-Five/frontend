import ContentDetailLayout from "@/components/contentDetail/ContentDetailLayout";

// UI 구성용 임시 데이터
const mockContentData = {
  contentTitle: "범죄도시2",
  contentDescription:
    "새로운 참가자들이 상금에 도전한다. 이렇게 시놉시스를 쓰고 룰루랄라 영화가 흥미진진하다 범죄도시 재미없다 오겜도 재미없다. 마지막 표를 던질 참가자가 그들 모두의 운명의 잡는다 야호.",
  contentCountry: "한국",
  contentGenres: ["스릴러", "범죄", "드라마"],
  contentRunningTime: 180,
  contentGrade: 15,
  posterUrl:
    "https://dev-leadme.s3.ap-northeast-2.amazonaws.com/poster/1010581_movie.jpg",
  actors: ["차은우", "송강", "이도현"],
  director: "봉준호",
  openDate: "2025-04-05",
};

// const mockMyReviewData = {
//   rating: 5,
//   review: "작품 꿀잼",
// };

// API 응답 형식에 맞는 mock 리뷰 데이터
const mockReviewsData = {
  contentReviews: [
    {
      reviewId: 123,
      userProfileUrl: "https://cdn.example.com/profiles/user1.png",
      userRating: 5,
      userReview: "범죄도시 제 인생영화 너무 웃기고 마지막에는 감동까지",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 4,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 1,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 2,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 3,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 4,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 4,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 4,
      userReview: "여기까지만 보임 왜",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 2,
      userReview: "여기까지만 보임 왜?",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 3,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 3,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 2,
      userReview: "스토리 전개가 빠르고 시원시원해서 좋았어요!",
    },
    {
      reviewId: 456,
      userProfileUrl: "https://cdn.example.com/profiles/user2.png",
      userRating: 1,
      userReview: "꺼져라",
    },
  ],
  nextCursor: "103",
};

const ContentDetailPage = () => {
  return (
    <ContentDetailLayout
      content={mockContentData}
      reviews={mockReviewsData.contentReviews}
      // myReview={mockMyReviewData}
    />
  );
};

export default ContentDetailPage;
