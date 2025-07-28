import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasPlayedRef = useRef(false); // 중복 재생 방지
  const [isPlaying, setIsPlaying] = useState(false); // 설명 숨김 상태

  // HLS.js 초기화
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(content.videoUrl);
      hls.attachMedia(video);
      // eslint-disable-next-line consistent-return
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = content.videoUrl;
    }
  }, [content.videoUrl]);

  // IntersectionObserver로 자동 재생 (2초 후)
  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!video) return;

        if (entry.isIntersecting && !hasPlayedRef.current) {
          timeoutRef.current = setTimeout(() => {
            video
              .play()
              .then(() => {
                // hasPlayedRef.current = true; // 다시 뷰포트 진입 시에도 재생
                setIsPlaying(true); // 텍스트 숨김
              })
              .catch(() => {
                // 자동 재생 실패 무시
              });
          }, 2000);
        } else if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false); // 텍스트 다시 표시
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      },
      { threshold: 0.7 }
    );

    const container = containerRef.current;
    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-[600px] mx-auto">
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
      </div>
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/70 to-transparent p-4 rounded-xl gap-3">
          <h2 className="body-lg-pretendard whitespace-pre-line">
            {getFirstTwoSentences(content.description).map((sentence) => (
              <span key={sentence}>
                {sentence}
                <br />
              </span>
            ))}
          </h2>
          <p className="body-sm-pretendard text-custom-gray">
            {content.genre.join(" · ")}
          </p>
        </div>
      )}
    </section>
  );
};

export default MainRecommendBanner;
