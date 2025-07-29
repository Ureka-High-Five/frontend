import { useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  const isPlaying = useAutoPlayVideo({
    videoRef,
    containerRef,
    videoUrl: content.videoUrl,
    delayMs: 1000,
  });

  const handleClick = () => {
    navigate(PATH.CONTENT_DETAIL.replace(":id", String(content.contentId)));
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
          muted
          playsInline
          controls={false}
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {isPlaying && (
          <div className="absolute top-[2px] left-1 text-white text-body-lg md:text-heading-h1 font-bmDohyeon">
            {content.title}
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-custom-black" />
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
          <p className="text-body-xs md:text-body-sm text-custom-gray font-pretendard">
            {content.genre.join(" · ")}
          </p>
        </div>
      )}
    </section>
  );
};

export default MainRecommendBanner;
