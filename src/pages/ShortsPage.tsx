import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ShortsLayout from "@/components/shorts/ShortsLayout";
import { useActiveShortsId } from "@/hooks/shorts/useActiveShortsId";
import { useShortsToShow } from "@/hooks/shorts/useShortsToShow";
import { useShortsWatchTimeTracker } from "@/hooks/shorts/useShortsWatchTimeTracker";

const ShortsPage = () => {
  const { id: currentShortsId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { shortsToShow, fetchNextPage, hasNextPage, isLoading } =
    useShortsToShow(currentShortsId);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 쇼츠 페이지를 벗어날 때 무한스크롤 캐시 리셋
  useEffect(() => {
    return () => {
      // cleanup 함수: 컴포넌트가 언마운트될 때 실행
      queryClient.resetQueries({ queryKey: ["shorts"] });
    };
  }, [queryClient]);

  useActiveShortsId({
    shortsToShow,
    cardRefs,
    currentShortsId,
  });

  useShortsWatchTimeTracker({ activeShortsId: currentShortsId });

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
