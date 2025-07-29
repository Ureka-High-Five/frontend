import { useEffect, useRef } from "react";

interface UseScrollSnapProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function useScrollSnap({ containerRef, cardRefs }: UseScrollSnapProps) {
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // 이전 타이머 클리어
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      // 스크롤이 끝난 후 50ms 후에 스냅 실행
      scrollTimeoutRef.current = window.setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const containerHeight = containerRect.height;

        // 현재 가장 많이 보이는 쇼츠 찾기
        let maxVisibleRatio = 0;
        let targetIndex = 0;

        cardRefs.current.forEach((cardRef, index) => {
          if (cardRef) {
            const cardRect = cardRef.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;

            // 카드가 컨테이너와 겹치는 부분 계산
            const visibleTop = Math.max(cardRect.top, containerTop);
            const visibleBottom = Math.min(cardRect.bottom, containerBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // 보이는 비율 계산 (전체 화면 기준)
            const visibleRatio = visibleHeight / containerHeight;

            if (visibleRatio > maxVisibleRatio) {
              maxVisibleRatio = visibleRatio;
              targetIndex = index;
            }
          }
        });

        // 가장 많이 보이는 쇼츠로 스냅
        const targetCard = cardRefs.current[targetIndex];
        if (targetCard) {
          targetCard.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 50);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [containerRef, cardRefs]);
}
