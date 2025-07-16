import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <Avatar>
        <AvatarImage src={userProfileUrl} alt="프로필" />
        <AvatarFallback>cn</AvatarFallback>
      </Avatar>
      <div className="flex flex-col body-sm-pretendard gap-1">
        <div className="flex items-center gap-1">
          {isGood ? (
            <ThumbsUp size={16} className="text-custom-point" />
          ) : (
            <ThumbsDown size={16} className="text-red-400" />
          )}
          <span className="text-custom-gray">{userRating}.0</span>
        </div>
        <div className="text-white">{userReview}</div>
      </div>
    </article>
  );
};

export default ReviewItem;
