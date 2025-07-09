import type { Content, Review } from "@/types/content";
import ContentDescription from "./ContentDescription";
import ContentMainInfo from "./ContentMainInfo";
import ContentPoster from "./ContentPoster";
import ReviewList from "./ReviewList";

interface ContentDetailLayoutProps {
  content: Content;
  reviews: Review[];
}

const ContentDetailLayout = ({
  content,
  reviews,
}: ContentDetailLayoutProps) => {
  return (
    <div className="relative w-full min-h-screen justify-center flex flex-col items-center">
      <ContentPoster posterUrl={content.posterUrl} />
      {/* 오버레이 컨텐츠 */}
      <div className="relative z-10 px-8 mt-60 flex flex-col gap-6 md:mt-80 max-w-[768px] w-full mx-auto overflow-y-auto max-h-screen hide-scrollbar">
        <ContentMainInfo
          contentTitle={content.contentTitle}
          contentCountry={content.contentCountry}
          contentGenres={content.contentGenres}
          contentRunningTime={content.contentRunningTime}
        />
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
