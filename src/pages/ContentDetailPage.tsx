import { useParams } from "react-router-dom";
import ContentDetailLayout from "@/components/contentDetail/ContentDetailLayout";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useContentDetailQuery } from "@/hooks/queries/content/useContentDetailQuery";
import { useInfiniteContentReviewsQuery } from "@/hooks/queries/content/useInfiniteContentReviewsQuery";
import { useMyReviewQuery } from "@/hooks/queries/content/useMyReviewQuery";

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const contentId = id ?? "";

  const { content, isLoading, error } = useContentDetailQuery(
    Number(contentId)
  );
  const { reviews, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteContentReviewsQuery(contentId);
  const myReview = useMyReviewQuery(contentId);

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    threshold: 1,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

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
      rootRef={rootRef}
      targetRef={targetRef}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default ContentDetailPage;
