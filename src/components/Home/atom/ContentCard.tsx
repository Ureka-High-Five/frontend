interface ContentCardProps {
  posterUrl: string;
  width?: string; 
}

const ContentCard = ({
  posterUrl,
  width = "w-full",
}: ContentCardProps) => {
  return (
    <div className={`overflow-hidden rounded-lg aspect-[2/3] ${width}`}>
      <img
        src={posterUrl}
        alt="콘텐츠 포스터"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ContentCard;
