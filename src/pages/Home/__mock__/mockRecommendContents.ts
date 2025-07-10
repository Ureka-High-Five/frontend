export const mockRecommendContentsData = {
  mainRecommend: {
    posterUrl: "/assets/poster.jpg",
    description: "범죄도시2",
    genre: ["액션", "범죄", "하이틴"],
  },
  // randomContent: {
  //   contentId: 1401,
  //   posterUrl: "/assets/poster.jpg",
  // },
  recommendContents: Array(5)
    .fill(null)
    .map((_, i) => ({
      contentId: 1000 + i,
      posterUrl: "/assets/poster.jpg",
    })),
  recommendGenreContents: {
    genre: "SF",
    contents: Array(5)
      .fill(null)
      .map((_, i) => ({
        contentId: 1100 + i,
        posterUrl: "/assets/poster.jpg",
      })),
  },
  recommendSecondGenreContents: {
    genre: "액션",
    contents: Array(5)
      .fill(null)
      .map((_, i) => ({
        contentId: 1200 + i,
        posterUrl: "/assets/poster.jpg",
      })),
  },
  recommendCuration: {
    userName: "큐레이터",
    userProfile: "",
    curationTitle: "마블 근본 작품집",
    contents: Array(5)
      .fill(null)
      .map((_, i) => ({
        contentId: 1300 + i,
        posterUrl: "/assets/poster.jpg",
      })),
  },
  recommendSecondCuration: {
    userName: "꿀꿀",
    userProfile: "",
    curationTitle: "기분이 꿀꿀할 때 보는 코미디 모음",
    contents: Array(5)
      .fill(null)
      .map((_, i) => ({
        contentId: 1400 + i,
        posterUrl: "/assets/poster.jpg",
      })),
  },
};
