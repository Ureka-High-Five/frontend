interface ContentCardProps {
  posterUrl: string;
  width?: string;
  height?: string;
}

const ContentCard = ({
  posterUrl,
  width = "w-full",
  height = "h-auto",
}: ContentCardProps) => {
  return (
    <div className={`overflow-hidden rounded-lg ${width} ${height}`}>
      <img
        src={posterUrl}
        alt="콘텐츠 포스터"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ContentCard;

