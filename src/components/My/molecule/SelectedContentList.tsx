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
    <div className="h-[120px] flex items-center overflow-x-auto no-scrollbar">
      {selectedContents.length > 0 ? (
        selectedContents.map((content) => (
          <div
            key={content.contentId}
            className="relative flex-shrink-0 w-20 aspect-[2/3] rounded-md overflow-hidden mr-2">
            <img
              src={content.thumbnailUrl}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(content)}
              className="absolute top-0 right-0 text-white bg-black/50">
              <X size={16} />
            </button>
          </div>
        ))
      ) : (
        <p className="body-md-pretendard text-white/70 mx-auto">
          선택한 콘텐츠가 여기에 표시됩니다.
        </p>
      )}
    </div>
  );
};

export default SelectedContentList;
