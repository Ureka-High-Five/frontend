import type { MutableRefObject } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
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
  const navigate = useNavigate();

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    enabled: !isLoading && !!hasNextPage,
    threshold: 0.1,
    delayMs: 300,
  });

  const cardRef = cardRefs;

  // shorts 나가기 (홈으로 이동)
  const handleExitShorts = () => {
    navigate(PATH.HOME);
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen-mobile overflow-y-scroll snap-y snap-mandatory">
      <div className="absolute top-4 left-2 z-10 text-white">
        <Button variant="ghost" onClick={handleExitShorts}>
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
          {/* 마지막에서 세 번째 쇼츠에서 트리거 (더 빠른 로딩) */}
          {idx === shorts.length - 3 && <div ref={targetRef} className="h-1" />}
        </div>
      ))}

      {/* 마지막 쇼츠가 3개 이하로 남았을 때를 위한 fallback */}
      {shorts.length <= 3 && <div ref={targetRef} className="h-1" />}
    </div>
  );
}
