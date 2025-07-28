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
  const contentId = id ?? "";

  return (
    <AsyncBoundary>
      <ContentDetailContainer contentId={contentId} />
    </AsyncBoundary>
  );
};

export default ContentDetailPage;
