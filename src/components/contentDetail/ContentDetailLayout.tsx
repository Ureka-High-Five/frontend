import type { Content, Review, MyReview } from "@/types/content";
import ContentDescription from "./organism/ContentDescription";
import ContentMainInfo from "./organism/ContentMainInfo";
import ContentPoster from "./organism/ContentPoster";
import ReviewForm from "./organism/ReviewForm";
import ReviewList from "./organism/ReviewList";

interface ContentDetailLayoutProps {
  content: Content;
  reviews: Review[];
  myReview?: MyReview;
}

const ContentDetailLayout = ({
  content,
  reviews,
  myReview,
}: ContentDetailLayoutProps) => {
  return (
    <div className="relative w-full h-screen justify-center flex flex-col items-center">
      <ContentPoster posterUrl={content.posterUrl} />
      {/* 오버레이 컨텐츠 */}
      <div className="relative z-10 px-8 mt-60 flex flex-col gap-6 md:mt-96 max-w-[768px] w-full mx-auto overflow-y-auto hide-scrollbar">
        <ContentMainInfo
          contentTitle={content.contentTitle}
          contentCountry={content.contentCountry}
          contentGenres={content.contentGenres}
          contentRunningTime={content.contentRunningTime}
        />
        {myReview == null && <ReviewForm />}
        <ContentDescription
          contentDescription={content.contentDescription}
          actors={content.actors}
          director={content.director}
          openDate={content.openDate}
        />
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ContentDetailLayout;
