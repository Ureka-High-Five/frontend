import type { MutableRefObject } from "react";
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
  cardRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function ShortsLayout({
  shorts,
  fetchNextPage,
  hasNextPage,
  isLoading,
  cardRefs,
}: ShortsLayoutProps) {
  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    enabled: !isLoading && !!hasNextPage,
  });

  const cardRef = cardRefs;

  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-2 z-10 text-white">
        <Button variant="ghost">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {shorts.map((reel, idx) => (
        <div
          key={reel.shortsId}
          ref={(el) => {
            cardRef.current[idx] = el;
          }}>
          <ReelCard reel={reel} />
        </div>
      ))}

      <div ref={targetRef} className="h-1" />
    </div>
  );
}
