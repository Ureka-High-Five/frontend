import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import AvatarWithText from "@/components/common/AvatarWithText";
import ReelTitle from "@/components/shorts/atom/ReelTitle";
import ReelActionBar from "@/components/shorts/molecules/ReelActionBar";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useCommentInfiniteQuery } from "@/hooks/queries/shorts/useCommentInfiniteQuery";
import { useDislikeMutation } from "@/hooks/queries/shorts/useDislikeMutation";
import { useLikeMutation } from "@/hooks/queries/shorts/useLikeMutation";
import type { CommentWithTime } from "@/types/shorts";

interface ReelOverlayProps {
  title: string;
  comment?: CommentWithTime | null;
  isLikeVisible: boolean;
  totalLikeCount: number;
  isUserLiked: boolean;
  shortsId: string;
  currentTime: number;
  contentId: number;
}

export default function ReelOverlay({
  title,
  comment,
  isLikeVisible,
  totalLikeCount,
  isUserLiked,
  shortsId,
  currentTime,
  contentId,
}: ReelOverlayProps) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComment, setActiveComment] = useState<CommentWithTime | null>(
    null
  );

  useEffect(() => {
    if (!isDrawerOpen && comment) {
      setActiveComment(comment);
    }
  }, [isDrawerOpen, comment]);

  const {
    allComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCommentInfiniteQuery(
    shortsId,
    activeComment?.commentId ?? 0,
    isDrawerOpen
  );
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

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: () => {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage,
    enabled: isDrawerOpen,
    threshold: 1,
  });

  const handleTitleClick = () => {
    navigate(`/content/${contentId}`);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full px-4 pb-8 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2">
      <div className="relative h-14">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            {comment && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-left w-full">
                <AvatarWithText
                  avatarUrl={comment.profileUrl}
                  subText={comment.comment}
                  className="bg-gray-500/30 px-3 py-2 rounded-xl w-full"
                />
              </motion.button>
            )}
          </DrawerTrigger>

          <DrawerContent className="h-[50vh] rounded-t-xl px-4 py-2 bg-[#1E1E1E] text-white border-none">
            <DrawerHeader>
              <DrawerTitle>댓글 전체 보기</DrawerTitle>
            </DrawerHeader>
            <div
              ref={rootRef}
              className="overflow-y-auto h-[calc(50vh-64px)] space-y-3 pr-1">
              {allComments?.pages
                .flatMap((page) => page.items)
                .map((commentItem) => (
                  <AvatarWithText
                    key={commentItem.commentId}
                    avatarUrl={commentItem.profileUrl}
                    title={commentItem.userName}
                    subText={commentItem.comment}
                    className="bg-gray-500/30 px-3 py-2 rounded-xl"
                    variant="compact"
                  />
                ))}
              {isLoading && (
                <p className="text-sm text-muted-foreground">
                  댓글을 불러오는 중...
                </p>
              )}
              {!isLoading && allComments?.pages[0]?.items?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  아직 댓글이 없습니다.
                </p>
              )}
              <div
                ref={targetRef}
                className={`h-72  transition-opacity duration-300 ${
                  hasNextPage ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex items-center justify-between pt-2">
        <ReelTitle title={title} onClick={handleTitleClick} />
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

      <ReelActionBar />
    </div>
  );
}
