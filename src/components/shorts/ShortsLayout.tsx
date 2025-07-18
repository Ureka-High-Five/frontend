import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import type { ShortsItem } from "@/types/shorts";
import ReelCard from "./organism/ReelCard";

interface ShortsLayoutProps {
  shorts: ShortsItem[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
}

export default function ShortsLayout({
  shorts,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: ShortsLayoutProps) {
  const loaderRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    enabled: !isLoading,
  });

  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-2 z-10 text-white">
        <Button variant="ghost">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {shorts.map((reel) => (
        <ReelCard key={reel.shortsId} reel={reel} />
      ))}

      <div ref={loaderRef} className="h-1" />
    </div>
  );
}
