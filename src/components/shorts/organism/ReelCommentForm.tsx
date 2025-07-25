import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCommentMutation } from "@/hooks/queries/shorts/useCommentMutation";

interface ReelCommentFormProps {
  shortsId: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function ReelCommentForm({
  shortsId,
  videoRef,
}: ReelCommentFormProps) {
  const [text, setText] = useState("");
  const { mutatePostShortsComment, isPosting } = useCommentMutation();

  const handleSubmit = (
    e?: React.FormEvent | React.KeyboardEvent | React.MouseEvent
  ) => {
    e?.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || !videoRef.current) return;

    mutatePostShortsComment({
      shortsId: shortsId,
      time: Math.floor(videoRef.current.currentTime),
      comment: trimmed,
    });

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPosting}
          inputMode="text"
          className="pr-10 bg-gray-500/30 px-3 py-2 rounded-xl border-none focus-visible:ring-0 focus:outline-none"
        />
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim() || isPosting}
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-white hover:bg-transparent body-sm-pretendard"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
