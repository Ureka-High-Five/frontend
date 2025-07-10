import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReelCard from "./organism/ReelCard";

interface ShortItem {
  contentId: string;
  contentTitle: string;
  shortsUrl: string;
  shortThumbnail: string;
}

interface ShortsLayoutProps {
  shorts: ShortItem[];
}

export default function ShortsLayout({ shorts }: ShortsLayoutProps) {
  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-2 z-10 text-white ">
        <Button variant="ghost">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* 각 릴스 카드 */}
      {shorts.map((reel) => (
        <ReelCard key={reel.contentId} reel={reel} />
      ))}
    </div>
  );
}
