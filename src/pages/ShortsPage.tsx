import ShortsLayout from "@/components/shorts/ShortsLayout";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

const ShortsPage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useShortsInfiniteQuery();

  const flattenedShorts =
    data?.pages.flatMap((page) => page?.items ?? []) ?? [];

  return (
    <ShortsLayout
      shorts={flattenedShorts}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
    />
  );
};

export default ShortsPage;
