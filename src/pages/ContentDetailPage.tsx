import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentDetailLayout from "@/components/contentDetail/ContentDetailLayout";
import { useContentDetailQuery } from "@/hooks/queries/content/useContentDetailQuery";
import { useInfiniteContentReviewsQuery } from "@/hooks/queries/content/useInfiniteContentReviewsQuery";
import { useMyReviewQuery } from "@/hooks/queries/content/useMyReviewQuery";

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const contentId = id ?? "";

  const { data: content, isLoading, error } = useContentDetailQuery(contentId);
  const {
    data: reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteContentReviewsQuery(contentId);
  const { data: myReview } = useMyReviewQuery(contentId);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 모든 리뷰를 평탄화
  const reviews = reviewPages?.pages.flatMap((page) => page.items ?? []) ?? [];

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
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, reviews.length]);

  if (!id) return <div className="text-white">잘못된 접근입니다</div>;
  if (isLoading) return <div className="text-white">로딩중...</div>;
  if (error) return <div className="text-white">에러 발생!</div>;
  if (!content) return <div className="text-white">데이터 없음</div>;

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
