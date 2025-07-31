import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCommentMutation } from "@/hooks/queries/shorts/useCommentMutation";
import type { CommentWithTime } from "@/types/shorts";

interface ReelCommentFormProps {
  shortsId: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onCommentSubmit?: (comment: CommentWithTime) => void;
}

export default function ReelCommentForm({
  shortsId,
  videoRef,
  onCommentSubmit,
}: ReelCommentFormProps) {
  const [text, setText] = useState("");
  const { mutatePostShortsComment, isPosting } = useCommentMutation();

  const handleSubmit = (
    e?: React.FormEvent | React.KeyboardEvent | React.MouseEvent
  ) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !videoRef.current) return;
    const time = Math.floor(videoRef.current.currentTime);

    mutatePostShortsComment(
      { shortsId, time, comment: trimmed },
      {
        onSuccess: (comment) => {
          if (onCommentSubmit) {
            onCommentSubmit({ ...comment, time });
          }
        },
      }
    );

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      aria-label="쇼츠 댓글 작성">
      <div className="relative">
        <Input
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPosting}
          inputMode="text"
          className="pr-10 bg-gray-500/30 px-3 py-2 rounded-xl border-none focus-visible:ring-0 focus:outline-none"
          aria-label="댓글 내용 입력"
          aria-describedby="comment-submit-button"
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!text.trim() || isPosting}
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-transparent body-sm-pretendard"
          aria-label="댓글 전송"
          id="comment-submit-button">
          <Send size={18} aria-hidden="true" />
        </Button>
      </div>
      {isPosting && (
        <div className="sr-only" aria-live="polite">
          댓글을 전송하는 중입니다.
        </div>
      )}
    </form>
  );
}
