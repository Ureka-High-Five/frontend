import { X } from "lucide-react";
import type { OnBoardingContent } from "@/types/content";

interface SelectedContentListProps {
  selectedContents: OnBoardingContent[];
  onRemove: (content: OnBoardingContent) => void;
}

const SelectedContentList = ({
  selectedContents,
  onRemove,
}: SelectedContentListProps) => {
  return (
    <section
      aria-label="선택한 콘텐츠 목록"
      className="h-[100px] md:h-[120px] flex items-center overflow-x-auto no-scrollbar">
      {selectedContents.length > 0 ? (
        <ul className="flex items-center">
          {selectedContents.map((content) => (
            <li
              key={content.contentId}
              className="relative flex-shrink-0 w-16 md:w-20 aspect-[2/3] rounded-md overflow-hidden mr-2 list-none">
              <img
                src={content.thumbnailUrl}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(content)}
                className="absolute top-0 right-0 text-white bg-black/50"
                aria-label={`${content.title} 제거`}>
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div role="note" className="body-md-pretendard text-white/70 mx-auto">
          선택한 콘텐츠가 여기에 표시됩니다.
        </div>
      )}
    </section>
  );
};

export default SelectedContentList;
