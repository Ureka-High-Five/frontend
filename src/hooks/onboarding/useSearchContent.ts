import { useEffect, useRef, useState } from "react";
import useDebouncedValue from "@/hooks/common/useDebouncedValue";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useSearchContentsInfiniteQuery } from "@/hooks/queries/home/useSearchContentsInfiniteQuery";

export const useSearchContent = (limit: number) => {
  const [searchInput, setSearchInput] = useState("");
  const searchKeyword = useDebouncedValue(searchInput.trim(), 500);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollTopRef = useRef<number>(0);

  const { searchContents, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchContentsInfiniteQuery(searchKeyword, limit);

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    rootMargin: "100px",
    delayMs: 300,
    enabled: !!hasNextPage,
  });

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    if (searchKeyword.length === 0 && searchInput.trim().length > 0) {
      prevScrollTopRef.current = container.scrollTop;
    }
  }, [searchInput]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    if (searchKeyword.length > 0) {
      container.scrollTo({ top: 0, behavior: "auto" });
    } else {
      container.scrollTo({ top: prevScrollTopRef.current, behavior: "auto" });
    }
  }, [searchKeyword]);

  return {
    searchInput,
    setSearchInput,
    searchKeyword,
    searchContents,
    isFetchingNextPage,
    scrollContainerRef,
    rootRef,
    targetRef,
  };
};
