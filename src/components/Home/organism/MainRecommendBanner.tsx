import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import { useAutoPlayVideo } from "@/hooks/common/useAutoPlayVideo";
import type { MainRecommend } from "@/types/RecommendContentsResponse";

interface Props {
  content: MainRecommend;
}

const getFirstTwoSentences = (text: string) => {
  const sentences = text.split(/(?<=\.)\s+/);
  return sentences.slice(0, 2);
};

const MainRecommendBanner = ({ content }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);

  const isPlaying = useAutoPlayVideo({
    videoRef,
    containerRef,
    videoUrl: content.videoUrl,
    delayMs: 1000,
  });

  const handleClick = () => {
    navigate(PATH.CONTENT_DETAIL.replace(":id", String(content.contentId)));
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="relative w-full mx-auto"
      style={{ maxWidth: "clamp(280px, 90vw, 600px)" }}>
      <div className="rounded-xl overflow-hidden aspect-video w-full">
        <video
          ref={videoRef}
          poster={content.posterUrl}
          muted={isMuted}
          playsInline
          controls={false}
          preload="metadata"
          className="w-full h-full object-fit">
          <track kind="captions" />
        </video>

        {/* {isPlaying && (
          <div className="absolute inset-0 z-10 flex items-end justify-center">
            <h1 className="text-white text-heading-h1 font-pretendard text-center">
              {content.title}
            </h1>
          </div>
        )} */}
        {isPlaying && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-2 text-center px-4">
            <h1 className="text-white text-heading-h1 font-pretendard">
              {content.title}
            </h1>
            <p className="text-body-xs md:text-body-sm text-custom-gray ">
              {content.genre.join(" · ")}
            </p>
          </div>
        )}

        <div className="absolute bottom-0 right-2 z-10">
          <Button
            variant="ghost"
            onClick={toggleMute}
            className="!text-white hover:bg-transparent bg-transparent">
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-custom-black" />
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/70 to-transparent p-4 rounded-xl gap-3">
          <h2 className="text-body-sm md:text-body-lg font-pretendard whitespace-pre-line leading-snug">
            {getFirstTwoSentences(content.description).map((sentence) => (
              <span key={sentence}>
                {sentence}
                <br />
              </span>
            ))}
          </h2>
        </div>
      )}
    </section>
  );
};

export default MainRecommendBanner;
