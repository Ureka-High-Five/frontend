import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentDetailLayout from "@/components/contentDetail/ContentDetailLayout";
import { useContentDetail } from "@/hooks/queries/content/useContentDetail";
import { useInfiniteContentReviews } from "@/hooks/queries/content/useInfiniteContentReviews";
import { useMyReview } from "@/hooks/queries/content/useMyReview";

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const contentId = id ?? "";
  const { data: content, isLoading, error } = useContentDetail(contentId);
  const {
    data: reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteContentReviews(contentId);
  const { data: myReview } = useMyReview(contentId);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 모든 리뷰를 평탄화
  const reviews =
    reviewPages?.pages.flatMap((page) => page.content?.items ?? []) ?? [];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const target = scrollElement?.querySelector("#observer-target");

    if (!scrollElement || !target || !hasNextPage || isFetchingNextPage) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: scrollElement,
        threshold: 1,
      }
    );
    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, reviews.length]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!content) return <div>데이터 없음</div>;

  return (
    <ContentDetailLayout
      contentId={contentId}
      content={content}
      reviews={reviews}
      myReview={myReview}
      scrollRef={scrollRef}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default ContentDetailPage;
