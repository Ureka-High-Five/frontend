import { Play } from "lucide-react";

export default function ReelTitle({ title }: { title: string }) {
  return (
    <p className="body-lg-pretendard flex items-center gap-2">
      <Play className="w-4 h-4" />
      {title}
    </p>
  );
}
