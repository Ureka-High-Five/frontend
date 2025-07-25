interface SearchContentItemProps {
  contentId: number;
  title: string;
  openYear: number;
  thumbnailUrl: string;
  onClick: (contentId: number) => void;
}

const SearchContentItem = ({
  contentId,
  title,
  openYear,
  thumbnailUrl,
  onClick,
}: SearchContentItemProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => onClick(contentId)}
        className="flex items-center gap-4 w-full p-2 rounded-lg hover:bg-white/5 transition relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-14 h-20 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex flex-col items-start justify-center text-left">
          <span className="text-white text-sm font-semibold">{title}</span>
          <span className="text-gray-400 text-xs">영화 · {openYear}</span>
        </div>
      </button>
    </li>
  );
};

export default SearchContentItem;
