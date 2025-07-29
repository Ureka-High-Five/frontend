import { useParams } from "react-router-dom";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import ContentDetailLayout from "@/components/contentDetail/ContentDetailLayout";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useContentDetailQuery } from "@/hooks/queries/content/useContentDetailQuery";
import { useInfiniteContentReviewsQuery } from "@/hooks/queries/content/useInfiniteContentReviewsQuery";
import { useMyReviewQuery } from "@/hooks/queries/content/useMyReviewQuery";

const ContentDetailContainer = ({ contentId }: { contentId: string }) => {
  const { content } = useContentDetailQuery(contentId);
  const { reviews, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteContentReviewsQuery(contentId);
  const { myReview } = useMyReviewQuery(contentId);

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    threshold: 1,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (!content) {
    return null;
  }

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

const ContentDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <AsyncBoundary>
      <ContentDetailContainer contentId={id} />
    </AsyncBoundary>
  );
};

export default ContentDetailPage;
