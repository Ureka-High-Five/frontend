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
    threshold: 0.1, // 10%만 보여도 트리거
    delayMs: 300, // 지연 시간 단축
    rootMargin: "100px", // 100px 전에 미리 트리거
  });

  const cardRef = cardRefs;

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
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
          {/* 마지막에서 세 번째 쇼츠에서 트리거 (더 빠른 로딩) */}
          {idx === shorts.length - 3 && <div ref={targetRef} className="h-1" />}
        </div>
      ))}

      {/* 마지막 쇼츠가 3개 이하로 남았을 때를 위한 fallback */}
      {shorts.length <= 3 && <div ref={targetRef} className="h-1" />}
    </div>
  );
}
