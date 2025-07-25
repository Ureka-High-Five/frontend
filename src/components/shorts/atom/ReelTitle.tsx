import type { MouseEventHandler } from "react";
import { Play } from "lucide-react";

interface ReelTitleProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ReelTitle({
  title,
  onClick,
  className,
}: ReelTitleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`body-lg-pretendard flex items-center gap-2 text-left ${className ?? ""}`}>
      <Play className="w-4 h-4" />
      {title}
    </button>
  );
}
