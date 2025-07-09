import type { Content } from "@/types/content";

type ContentPosterProps = Pick<Content, "posterUrl">;

const ContentPoster = ({ posterUrl }: ContentPosterProps) => {
  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[768px] w-full aspect-[16/9] bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${posterUrl})` }}>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-custom-black" />

      <div className="w-full max-w-[768px] aspect-[16/9] " />
    </div>
  );
};

export default ContentPoster;
