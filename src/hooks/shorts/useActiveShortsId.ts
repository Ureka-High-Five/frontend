import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ShortsItem } from "@/types/shorts";

export function useActiveShortsId({
  shortsToShow,
  cardRefs,
  currentShortsId,
}: {
  shortsToShow: ShortsItem[];
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  currentShortsId?: string;
}) {
  const navigate = useNavigate();
  const [activeShortsId, setActiveShortsId] = useState<string | undefined>(
    currentShortsId
  );

  // 최초 진입 시 해당 id로 스크롤
  useEffect(() => {
    if (!currentShortsId) return;
    const idx = shortsToShow.findIndex(
      (short) => String(short.shortsId) === currentShortsId
    );
    if (idx >= 0 && cardRefs.current[idx]) {
      cardRefs.current[idx]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentShortsId, shortsToShow.length]);

  // IntersectionObserver로 활성화된 카드 감지
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const shortsId = String(shortsToShow[idx]?.shortsId);
            setActiveShortsId(shortsId);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [shortsToShow]);

  // activeShortsId가 바뀔 때마다 URL 변경
  useEffect(() => {
    if (activeShortsId && activeShortsId !== currentShortsId) {
      navigate(`/shorts/${activeShortsId}`, { replace: true });
    }
  }, [activeShortsId, currentShortsId, navigate]);

  return activeShortsId;
}
