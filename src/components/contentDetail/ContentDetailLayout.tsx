import { useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import type { Content, Review, MyReview } from "@/types/content";
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

  const handleClose = () => {
    navigate(PATH.HOME);
  };

  return (
    <div className="relative w-full h-screen justify-center flex flex-col items-center">
      <ContentVideo videoUrl={content.videoUrl} />
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          onClick={handleClose}
          className="text-white hover:bg-white/20">
          <X className="w-6 h-6" />
        </Button>
      </div>
      <div
        ref={rootRef}
        className="relative z-10 px-8 mt-60 flex flex-col gap-8 md:mt-96 max-w-[768px] w-full mx-auto overflow-y-auto hide-scrollbar">
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
    </div>
  );
};

export default ContentDetailLayout;
