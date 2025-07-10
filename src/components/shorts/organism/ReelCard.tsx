import { Heart } from "lucide-react";
import ReelTitle from "../atom/ReelTitle";
import ReelActionBar from "../molecules/ReelActionBar";

interface ReelCardProps {
  reel: {
    contentId: string;
    contentTitle: string;
    shortsUrl: string;
    shortThumbnail: string;
  };
}

export default function ReelCard({ reel }: ReelCardProps) {
  return (
    <div className="w-full h-screen snap-start relative bg-black">
      <video
        src={reel.shortsUrl}
        poster={reel.shortThumbnail}
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      />

      {/* 오버레이: 제목 + 액션바 */}
      <div className="absolute bottom-0 left-0 w-full px-4 pb-5 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2">
          <ReelTitle title={reel.contentTitle} />
          <Heart className="w-5 h-5 text-white" />
        </div>
        <ReelActionBar />
      </div>
    </div>
  );
}
