/* eslint-disable no-use-before-define */
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import ShortsLayout from "@/components/shorts/ShortsLayout";
import { useActiveShortsId } from "@/hooks/shorts/useActiveShortsId";
import { useShortsToShow } from "@/hooks/shorts/useShortsToShow";
import { useShortsWatchTimeTracker } from "@/hooks/shorts/useShortsWatchTimeTracker";

const ShortsPage = () => {
  const { id: currentShortsId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: ["shorts"] });
    };
  }, [queryClient]);

  useShortsWatchTimeTracker({ activeShortsId: currentShortsId });

  return (
    <AsyncBoundary>
      <ShortsContent cardRefs={cardRefs} currentShortsId={currentShortsId} />
    </AsyncBoundary>
  );
};

function ShortsContent({
  cardRefs,
  currentShortsId,
}: {
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  currentShortsId?: string;
}) {
  const { shortsToShow, fetchNextPage, hasNextPage } =
    useShortsToShow(currentShortsId);

  useActiveShortsId({
    shortsToShow,
    cardRefs,
    currentShortsId,
  });

  return (
    <ShortsLayout
      shorts={shortsToShow}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={false}
      cardRefs={cardRefs}
    />
  );
}

export default ShortsPage;
