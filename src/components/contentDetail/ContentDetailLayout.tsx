import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PATH } from "@/constants/path";
import type { Content, Review, MyReview } from "@/types/content";
import ContentDetailHeader from "./molecules/ContentDetailHeader";
import ContentDescription from "./organism/ContentDescription";
import ContentMainInfo from "./organism/ContentMainInfo";
import ContentVideo from "./organism/ContentVideo";
import ReviewForm from "./organism/ReviewForm";
import ReviewList from "./organism/ReviewList";

interface ContentDetailLayoutProps {
  contentId: string;
  content: Content;
  reviews: Review[];
  myReview?: MyReview;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  targetRef?: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}

const ContentDetailLayout = ({
  contentId,
  content,
  reviews,
  myReview,
  rootRef,
  targetRef,
  isFetchingNextPage,
}: ContentDetailLayoutProps) => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);

  const handleClose = () => {
    navigate(PATH.HOME);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <main
      className="relative w-full h-screen justify-center flex flex-col items-center"
      aria-label="콘텐츠 상세 정보">
      <ContentVideo
        videoUrl={content.videoUrl}
        posterUrl={content.posterUrl}
        isMuted={isMuted}
        contentTitle={content.contentTitle}
      />
      <ContentDetailHeader
        onClose={handleClose}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />
      <div
        ref={rootRef}
        className="relative z-10 px-8 mt-60 flex flex-col gap-8 md:mt-96 max-w-[768px] w-full mx-auto overflow-y-auto hide-scrollbar bg-gradient-to-b from-transparent via-custom-black/50 to-custom-black">
        <ContentMainInfo
          contentTitle={content.contentTitle}
          contentCountry={content.contentCountry}
          contentGenres={content.contentGenres}
          contentRunningTime={content.contentRunningTime}
          shortsId={content.shortsId}
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
        <div
          id="observer-target"
          ref={targetRef}
          className="h-16 w-full  min-h-[40px]"
        />
      </div>
    </main>
  );
};

export default ContentDetailLayout;
