import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import ShortsLayout from "@/components/shorts/ShortsLayout";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";
import { useActiveShortsId } from "@/hooks/shorts/useActiveShortsId";
import { useShortsToShow } from "@/hooks/shorts/useShortsToShow";

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
