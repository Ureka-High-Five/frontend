import { useEffect, useRef, useState } from "react";
import { useCommentTimelineQuery } from "@/hooks/queries/shorts/useCommentTimelineQuery";
import {
  addVideoEventListener,
  removeVideoEventListener,
} from "@/hooks/shorts/videoEventBus";
import type { CommentWithTime } from "@/types/shorts";

export function useCommentTimeline(
  shortsId: number,
  currentTime: number,
  isActive: boolean = false
) {
  const { commentTimelineMap } = useCommentTimelineQuery({
    shortsId,
    currentTime,
    enabled: isActive,
  });

  const [activeComment, setActiveComment] = useState<CommentWithTime | null>(
    null
  );
  const lastCommentRef = useRef<CommentWithTime | null>(null);

  useEffect(() => {
    const flooredTime = Math.floor(currentTime);
    const next = commentTimelineMap[flooredTime]?.[0] ?? null;

    if (next) {
      lastCommentRef.current = next;
      setActiveComment(next);
    }
  }, [currentTime, commentTimelineMap]);

  useEffect(() => {
    const handleSeeking = () => {
      setActiveComment(null);
      lastCommentRef.current = null;
    };

    addVideoEventListener("seeking", handleSeeking);
    return () => {
      removeVideoEventListener("seeking", handleSeeking);
    };
  }, []);

  return {
    commentTimelineMap,
    activeComment,
  };
}
