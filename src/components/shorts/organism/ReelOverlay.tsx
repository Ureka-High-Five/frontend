import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX } from "lucide-react";
import AvatarWithText from "@/components/common/AvatarWithText";
import ReelTitle from "@/components/shorts/atom/ReelTitle";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { END_POINTS } from "@/constants/api";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useCommentInfiniteQuery } from "@/hooks/queries/shorts/useCommentInfiniteQuery";
import { useDislikeMutation } from "@/hooks/queries/shorts/useDislikeMutation";
import { useLikeMutation } from "@/hooks/queries/shorts/useLikeMutation";
import { useTemporaryUserComment } from "@/hooks/shorts/useTemporaryUserComment";
import { useAudioStore } from "@/stores/useAudioStore";
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
  contentId: number;
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
  contentId,
}: ReelOverlayProps) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComment, setActiveComment] = useState<CommentWithTime | null>(
    null
  );
  const { isMuted, setMuted } = useAudioStore();

  const { visibleComment, setLocalComment } = useTemporaryUserComment(comment);

  useEffect(() => {
    if (!isDrawerOpen && comment) {
      setActiveComment(comment);
    }
  }, [isDrawerOpen, comment]);

  const handleMuteToggle = () => {
    setMuted(!isMuted);
  };

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
    useDislikeMutation({ shortsId, time: currentTime });
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
    threshold: 0.1,
    delayMs: 100,
  });

  const handleTitleClick = () => {
    navigate(END_POINTS.CONTENT_DETAIL(contentId));
  };

  return (
    <div className="absolute bottom-0 left-0 w-full px-4 pb-8 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2 z-20">
      <div className="relative h-14">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <motion.button
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-block text-left w-full">
              <AnimatePresence mode="wait">
                {visibleComment && (
                  <motion.div
                    key={visibleComment.commentId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}>
                    <AvatarWithText
                      avatarUrl={visibleComment.profileUrl}
                      subText={visibleComment.comment}
                      className="bg-gray-500/30 px-3 py-2 rounded-full max-w-fit inline-flex"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
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
                className={`h-20 transition-opacity duration-300 ${
                  hasNextPage ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex items-center justify-between">
        <ReelTitle title={title} onClick={handleTitleClick} />
        <div className="flex items-center gap-1 relative">
          <button
            type="button"
            onClick={handleMuteToggle}
            className="relative"
            aria-label="소리 토글"
            disabled={isLiking || isDisliking}>
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
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
      <ReelCommentForm
        shortsId={shortsId}
        videoRef={videoRef}
        onCommentSubmit={setLocalComment}
      />
    </div>
  );
}
