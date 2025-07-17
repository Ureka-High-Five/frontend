import { ThumbsUp, ThumbsDown } from "lucide-react";
import AvatarWithText from "@/components/common/AvatarWithText";
import type { Review } from "@/types/content";

type ReviewItemProps = Pick<
  Review,
  "userProfileUrl" | "userRating" | "userReview"
> & {
  isMyReview?: boolean;
};

const ReviewItem = ({
  userProfileUrl,
  userRating,
  userReview,
  isMyReview = false,
}: ReviewItemProps) => {
  const isGood = userRating >= 3;

  return (
    <article
      className={`flex items-center text-white px-3 mb-4 gap-3 ${
        isMyReview ? "bg-gray-500/20 rounded-xl py-3" : ""
      }`}>
      <AvatarWithText
        avatarUrl={userProfileUrl}
        title={
          <div className="flex items-center gap-1">
            {isGood ? (
              <ThumbsUp size={16} className="text-custom-point" />
            ) : (
              <ThumbsDown size={16} className="text-red-400" />
            )}
            <span className="text-custom-gray body-sm-pretendard">
              {userRating}.0
            </span>
          </div>
        }
        subText={<div className="text-white">{userReview}</div>}
        className="flex-1"
      />
    </article>
  );
};

export default ReviewItem;
