import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Review } from "@/types/content";

type ReviewItemProps = Pick<
  Review,
  "userProfileUrl" | "userRating" | "userReview"
>;

const ReviewItem = ({
  userProfileUrl,
  userRating,
  userReview,
}: ReviewItemProps) => (
  <article className="flex items-center text-white pb-3 gap-3">
    <Avatar>
      <AvatarImage src={userProfileUrl} alt="프로필" />
      <AvatarFallback>cn</AvatarFallback>
    </Avatar>
    <div className="flex flex-col body-sm-pretendard">
      <div className="text-custom-gray">{userRating}/5</div>
      <div className="text-white">{userReview}</div>
    </div>
  </article>
);

export default ReviewItem;
