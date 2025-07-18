import { Loader2 } from "lucide-react";
import OnBoardingContentCard from "@/components/OnBoarding/molecule/OnBoardingContentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REQUIRED_COUNT } from "@/constants/onBoarding";
import { useSearchContent } from "@/hooks/onboarding/useSearchContent";
import type { OnBoardingContent } from "@/types/content";

interface ContentSelectProps {
  contents: OnBoardingContent[];
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  onSubmitOnBoarding: () => void;
}

const ContentSelect = ({
  contents,
  selectedIds,
  toggleSelect,
  onSubmitOnBoarding,
}: ContentSelectProps) => {
  const {
    searchInput,
    setSearchInput,
    searchKeyword,
    searchContents,
    isFetchingNextPage,
    scrollContainerRef,
    rootRef,
    targetRef,
  } = useSearchContent(6);
  const displayContents = searchKeyword.length > 0 ? searchContents : contents;

  return (
    <>
      <Input
        type="text"
        placeholder="좋아하는 작품을 검색해보세요"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-[90%] max-w-sm text-white placeholder:text-gray-500 bg-white text-custom-black h-10"
      />
      <div
        ref={(el) => {
          rootRef.current = el;
          scrollContainerRef.current = el;
        }}
        className="w-[90%] max-w-sm overflow-y-auto no-scrollbar flex-1">
        <ul className="grid grid-cols-3 gap-10">
          {displayContents.map((content) => (
            <OnBoardingContentCard
              key={content.contentId}
              contentId={content.contentId}
              title={content.title}
              thumbnailUrl={content.thumbnailUrl}
              openYear={content.openYear}
              isSelected={selectedIds.includes(content.contentId)}
              toggleSelect={toggleSelect}
            />
          ))}
        </ul>

        {searchKeyword && <div ref={targetRef} className="h-6" />}
        {isFetchingNextPage && (
          <div className="flex items-center w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
          </div>
        )}
      </div>
      <Button
        size="lg"
        disabled={selectedIds.length < REQUIRED_COUNT}
        className="w-[90%] max-w-sm bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center"
        onClick={onSubmitOnBoarding}>
        시작하기
      </Button>
    </>
  );
};

export default ContentSelect;
