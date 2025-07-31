import { Loader2 } from "lucide-react";
import OnBoardingContentCard from "@/components/OnBoarding/molecule/OnBoardingContentCard";
import type { OnBoardingContent } from "@/types/content";

interface SearchContentListProps {
  searchContents: OnBoardingContent[];
  contentId: number[];
  toggleSelect: (content: OnBoardingContent) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  searchKeyword: string;
}

const SearchContentList = ({
  searchContents,
  contentId,
  toggleSelect,
  rootRef,
  targetRef,
  isFetchingNextPage,
  searchKeyword,
}: SearchContentListProps) => {
  return (
    <section
      ref={rootRef}
      aria-label="검색된 콘텐츠 목록"
      className="w-full h-60 overflow-y-auto no-scrollbar rounded-md">
      <ul className="grid grid-cols-3 gap-4">
        {searchContents.map((content) => (
          <li key={content.contentId}>
            <OnBoardingContentCard
              contentId={content.contentId}
              title={content.title}
              thumbnailUrl={content.thumbnailUrl}
              openYear={content.openYear}
              isSelected={contentId.includes(content.contentId)}
              toggleSelect={() => toggleSelect(content)}
            />
          </li>
        ))}
      </ul>

      {searchKeyword && <div ref={targetRef} className="h-6" />}
      {isFetchingNextPage && (
        <div role="status" className="flex items-center w-full justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
        </div>
      )}
    </section>
  );
};

export default SearchContentList;
