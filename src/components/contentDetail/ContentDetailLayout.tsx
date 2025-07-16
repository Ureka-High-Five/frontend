import { Loader2 } from "lucide-react";
import type { Content, Review, MyReview } from "@/types/content";
import ContentDescription from "./organism/ContentDescription";
import ContentMainInfo from "./organism/ContentMainInfo";
import ContentPoster from "./organism/ContentPoster";
import ReviewForm from "./organism/ReviewForm";
import ReviewList from "./organism/ReviewList";

interface ContentDetailLayoutProps {
  contentId: string;
  content: Content;
  reviews: Review[];
  myReview?: MyReview;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

const ContentDetailLayout = ({
  contentId,
  content,
  reviews,
  myReview,
  scrollRef,
  isFetchingNextPage,
}: ContentDetailLayoutProps) => {
  return (
    <div className="relative w-full h-screen justify-center flex flex-col items-center">
      <ContentPoster posterUrl={content.posterUrl} />
      {/* 오버레이 컨텐츠 */}
      <div
        ref={scrollRef}
        className="relative z-10 px-8 mt-60 flex flex-col gap-6 md:mt-96 max-w-[768px] w-full mx-auto overflow-y-auto hide-scrollbar">
        <ContentMainInfo
          contentTitle={content.contentTitle}
          contentCountry={content.contentCountry}
          contentGenres={content.contentGenres}
          contentRunningTime={content.contentRunningTime}
        />
        {myReview == null && <ReviewForm contentId={contentId} />}
        <ContentDescription
          contentDescription={content.contentDescription}
          actors={content.actors}
          director={content.director}
          openYear={content.openYear}
        />
        <ReviewList reviews={reviews} myReview={myReview} />
        {isFetchingNextPage && (
          <div className="flex items-center w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
          </div>
        )}
        {/* 무한스크롤 트리거 */}
        <div id="observer-target" className="h-1" />
      </div>
    </div>
  );
};

export default ContentDetailLayout;
