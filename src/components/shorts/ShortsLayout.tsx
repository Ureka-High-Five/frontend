import type { MutableRefObject } from "react";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useScrollSnap } from "@/hooks/shorts/useScrollSnap";
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
    threshold: 0.1,
    delayMs: 300,
  });

  // 스크롤 스냅 훅 사용
  useScrollSnap({
    containerRef: rootRef,
    cardRefs,
  });

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen-mobile overflow-y-scroll">
      {shorts.map((reel, idx) => (
        <div
          key={reel.shortsId}
          ref={(el) => {
            // eslint-disable-next-line no-param-reassign
            cardRefs.current[idx] = el;
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
