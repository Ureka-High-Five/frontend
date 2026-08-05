import LazyImage from "@/components/common/atom/LazyImage";
import { usePrefetchContentOnView } from "@/hooks/common/usePrefetchContentOnView";

interface ContentCardProps {
  thumbnailUrl: string;
  contentId: string;
  width?: string;
}

const ContentCard = ({
  thumbnailUrl,
  contentId,
  width = "w-full",
}: ContentCardProps) => {
  const { ref } = usePrefetchContentOnView(contentId);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl aspect-[2/3] ${width} md:w-[10rem]`}>
      <LazyImage
        src={thumbnailUrl}
        alt="콘텐츠 썸네일"
        className="w-full h-full object-cover rounded-xl"
        skeletonClassName="rounded-xl"
      />
    </div>
  );
};

export default ContentCard;
