import { useRef } from "react";
import { useParams } from "react-router-dom";
import ShortsLayout from "@/components/shorts/ShortsLayout";
import { useActiveShortsId } from "@/hooks/shorts/useActiveShortsId";
import { useShortsToShow } from "@/hooks/shorts/useShortsToShow";
import { useShortsWatchTimeTracker } from "@/hooks/shorts/useShortsWatchTimeTracker";

const ShortsPage = () => {
  const { id: currentShortsId } = useParams<{ id: string }>();
  const { shortsToShow, fetchNextPage, hasNextPage, isLoading } =
    useShortsToShow(currentShortsId);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
