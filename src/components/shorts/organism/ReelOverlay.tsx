import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import AvatarWithText from "@/components/common/AvatarWithText";
import ReelTitle from "@/components/shorts/atom/ReelTitle";
import { useDislikeMutation } from "@/hooks/queries/shorts/useDislikeMutation";
import { useLikeMutation } from "@/hooks/queries/shorts/useLikeMutation";
import type { CommentWithTime } from "@/types/shorts";
import ReelCommentForm from "./ReelCommentForm";

interface ReelOverlayProps {
  title: string;
  comment?: CommentWithTime | null;
  isLikeVisible: boolean;
  totalLikeCount: number;
  isUserLiked: boolean;
  shortsId: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  currentTime: number;
}

export default function ReelOverlay({
  title,
  comment,
  isLikeVisible,
  totalLikeCount,
  isUserLiked,
  shortsId,
  videoRef,
  currentTime,
}: ReelOverlayProps) {
  const { mutatePostShortsLike, isPosting: isLiking } = useLikeMutation({
    shortsId,
    time: currentTime,
  });
  const { mutatePostShortsDislike, isPosting: isDisliking } =
    useDislikeMutation(shortsId);
  const handleHeartClick = () => {
    if (isUserLiked) {
      mutatePostShortsDislike();
    } else {
      mutatePostShortsLike();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full px-4 pb-8 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2">
      <div className="relative h-14">
        <AnimatePresence mode="wait">
          {comment && (
            <motion.div
              key={`${comment.userId}-${comment.time}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-block">
              <AvatarWithText
                avatarUrl={comment.profileUrl}
                subText={comment.comment}
                className="bg-gray-500/30 px-3 py-2 rounded-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pt-2">
        <ReelTitle title={title} />
        <div className="flex items-center gap-1 relative">
          <button
            type="button"
            onClick={handleHeartClick}
            className="relative"
            aria-label="좋아요 토글"
            disabled={isLiking || isDisliking}>
            <Heart
              className={`w-5 h-5 ${
                isUserLiked ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </button>
          <span className="text-sm ml-1">{totalLikeCount}</span>

          <AnimatePresence>
            {isLikeVisible && (
              <motion.div
                key="heart-pop"
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.3, y: -10 }}
                exit={{ opacity: 0, scale: 0.5, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -top-5 right-4 text-red-500 text-sm font-bold pointer-events-none">
                ❤️
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ReelCommentForm shortsId={shortsId} videoRef={videoRef} />
    </div>
  );
}
