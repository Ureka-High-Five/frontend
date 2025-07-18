import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShortsLayout from "@/components/shorts/ShortsLayout";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";

const ShortsPage = () => {
  const { id: currentShortsId } = useParams<{ id: string }>();
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useShortsInfiniteQuery();
  const navigate = useNavigate();
  const singleShorts = useShortsByIdQuery(currentShortsId ?? "");

  const flattenedShorts = useMemo(
    () => data?.pages.flatMap((page) => page?.items ?? []) ?? [],
    [data]
  );

  // 리스트에 없는 id로 접근한 경우 단건 데이터로 대체
  const shortsToShow = useMemo(() => {
    if (
      currentShortsId &&
      !flattenedShorts.some((s) => String(s.shortsId) === currentShortsId)
    ) {
      return singleShorts ? [singleShorts] : [];
    }
    return flattenedShorts;
  }, [currentShortsId, flattenedShorts, singleShorts]);

  // refs 배열로 각 카드에 ref 연결
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 현재 보이는 shortsId 상태
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
      cardRefs.current[idx]?.scrollIntoView({ behavior: "auto" });
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
        { threshold: 0.7 }
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

  return (
    <ShortsLayout
      shorts={shortsToShow}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      cardRefs={cardRefs}
    />
  );
};

export default ShortsPage;
