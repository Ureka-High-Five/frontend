import type { MutableRefObject } from "react";
import { useMemo } from "react";
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
  const triggerIndex = Math.max(0, shorts.length - 2); // 더 빠른 트리거를 위해 -2로 변경

  // 각 쇼츠에 고유한 렌더링 ID 생성 (중복 구분용)
  const shortsWithRenderingId = useMemo(() => {
    return shorts.map((reel) => ({
      ...reel,
      renderingId: `shorts-${reel.shortsId}-${crypto.randomUUID()}`,
    }));
  }, [shorts]);

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
    threshold: 0.1, // 더 민감하게 트리거 (10%만 보여도 트리거)
    rootMargin: "100px", // 100px 먼저 트리거
  });

  return (
    <section
      ref={rootRef}
      className="relative w-full h-screen-mobile overflow-y-scroll"
      style={{
        scrollSnapType: isLoading ? "none" : "y mandatory", // 로딩 중에는 스냅 비활성화
        overscrollBehavior: "contain",
      }}
      aria-label="쇼츠 비디오 목록"
      role="main">
      <h1 className="sr-only">쇼츠 비디오</h1>
      <ul
        className="list-none p-0 m-0"
        aria-live="polite"
        aria-label={`총 ${shorts.length}개의 쇼츠 비디오`}>
        {shortsWithRenderingId.map((reel, idx) => (
          <li
            key={reel.renderingId}
            className="snap-start"
            aria-setsize={shortsWithRenderingId.length}
            aria-posinset={idx + 1}
            aria-label={`${idx + 1}번째 쇼츠: ${reel.contentTitle}`}>
            <div
              ref={(el) => {
                // eslint-disable-next-line no-param-reassign
                cardRefs.current[idx] = el;
              }}>
              <ReelCard reel={reel} />
              {/* 마지막에서 세 번째 쇼츠에서 트리거 (더 빠른 로딩) */}
              {idx === triggerIndex && (
                <div ref={targetRef} className="h-1" aria-hidden="true" />
              )}
            </div>
          </li>
        ))}
      </ul>
      {isLoading && (
        <div className="sr-only" aria-live="polite">
          새로운 쇼츠를 불러오는 중입니다.
        </div>
      )}
    </section>
  );
}
