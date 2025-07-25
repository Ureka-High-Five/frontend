import type { CommentWithTime } from "@/types/shorts";

interface ReelProgressBarProps {
  duration: number;
  currentTime: number;
  onSeek: (value: number) => void;
  commentTimelineMap: Record<number, CommentWithTime[]>;
}

export default function ReelProgressBar({
  duration,
  currentTime,
  onSeek,
  commentTimelineMap,
}: ReelProgressBarProps) {
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  return (
    <div className="absolute bottom-3 left-4 right-4 z-10">
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
      />

      <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        {duration > 0 &&
          Array.from({ length: duration }).map((_, sec) => {
            const hasComment = commentTimelineMap[sec]?.length > 0;
            if (!hasComment) return null;
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`dot-${sec}`}
                className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-white -translate-y-1/2"
                style={{
                  left: `${(sec / duration) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
