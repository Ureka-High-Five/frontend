import { useEffect, useState, useRef } from "react";
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
  const initialScrollCompleted = useRef(false);

  // 타입 안전한 ID 비교 함수
  const isSameShortsId = (shortsId: number, targetId: string) => {
    return String(shortsId) === targetId && targetId !== "";
  };

  // /shorts 경로로 접근했을 때 첫 번째 영상으로 자동 리다이렉트
  useEffect(() => {
    if (!currentShortsId && shortsToShow.length > 0) {
      const firstShortsId = String(shortsToShow[0].shortsId);
      navigate(`/shorts/${firstShortsId}`, { replace: true });
    }
  }, [currentShortsId, shortsToShow, navigate]);

  // 최초 진입 시 해당 id로 스크롤
  useEffect(() => {
    if (!currentShortsId || shortsToShow.length === 0) return;

    const idx = shortsToShow.findIndex((short) =>
      isSameShortsId(short.shortsId, currentShortsId)
    );

    if (idx >= 0 && cardRefs.current[idx]) {
      cardRefs.current[idx]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentShortsId, shortsToShow.length]);

  // 초기 스크롤 완료 표시
  useEffect(() => {
    if (shortsToShow.length === 0) return;

    // /shorts로 직접 접근했을 때는 즉시 플래그 설정
    if (!currentShortsId) {
      initialScrollCompleted.current = true;
      return;
    }

    // ID가 있을 때는 스크롤 애니메이션 완료 후 플래그 설정
    setTimeout(() => {
      initialScrollCompleted.current = true;
    }, 1000);
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

  // activeShortsId가 바뀔 때마다 URL 변경 (초기 스크롤 완료 후에만)
  useEffect(() => {
    if (
      activeShortsId &&
      activeShortsId !== currentShortsId &&
      initialScrollCompleted.current
    ) {
      navigate(`/shorts/${activeShortsId}`, { replace: true });
    }
  }, [activeShortsId, currentShortsId, navigate]);

  return activeShortsId;
}
