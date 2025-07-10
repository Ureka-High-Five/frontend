import ShortsLayout from "@/components/shorts/ShortsLayout";

const shorts = [
  {
    contentId: "001",
    contentTitle: "센과 치히로의 행방불명",
    shortsUrl:
      "https://highfive-stream-demo.s3.ap-northeast-2.amazonaws.com/WICKED.mp4",
    shortThumbnail: "/images/poster1.webp",
  },
  {
    contentId: "002",
    contentTitle: "바람이 분다",
    shortsUrl:
      "https://highfive-stream-demo.s3.ap-northeast-2.amazonaws.com/WICKED.mp4",
    shortThumbnail: "/images/poster2.webp",
  },
  {
    contentId: "003",
    contentTitle: "이웃집 토토로",
    shortsUrl: "/videos/reel3.m3u8",
    shortThumbnail: "/images/poster3.webp",
  },
  {
    contentId: "004",
    contentTitle: "모노노케 히메",
    shortsUrl: "/videos/reel4.m3u8",
    shortThumbnail: "/images/poster4.webp",
  },
  {
    contentId: "005",
    contentTitle: "하울의 움직이는 성",
    shortsUrl: "/videos/reel5.m3u8",
    shortThumbnail: "/images/poster5.webp",
  },
];

const ShortsPage = () => {
  return <ShortsLayout shorts={shorts} />;
};

export default ShortsPage;
