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
  const triggerIndex = Math.max(0, shorts.length - 3);

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: () => {
      // DOM 업데이트를 보장하기 위한 setTimeout
      setTimeout(() => {
        if (hasNextPage && !isLoading) {
          fetchNextPage();
        }
      }, 0);
    },
    hasNextPage,
    enabled: !isLoading && !!hasNextPage,
    threshold: 0.1,
    delayMs: 100,
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
          key={`${reel.shortsId}-${shorts.length}`} // 더 안정적인 key
          ref={(el) => {
            // eslint-disable-next-line no-param-reassign
            cardRefs.current[idx] = el;
          }}>
          <ReelCard reel={reel} />
          {/* 마지막에서 세 번째 쇼츠에서 트리거 (더 빠른 로딩) */}
          {idx === triggerIndex && <div ref={targetRef} className="h-1" />}
        </div>
      ))}
    </div>
  );
}
