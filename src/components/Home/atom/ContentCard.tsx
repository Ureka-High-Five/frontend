import LazyImage from "@/components/common/atom/LazyImage";

interface ContentCardProps {
  thumbnailUrl: string;
  width?: string;
}

const ContentCard = ({ thumbnailUrl, width = "w-full" }: ContentCardProps) => {
  return (
    <div
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
