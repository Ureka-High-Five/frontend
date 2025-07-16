import OnBoardingContentCard from "@/components/OnBoarding/molecule/OnBoardingContentCard";
import { Button } from "@/components/ui/button";
import { REQUIRED_COUNT } from "@/constants/onBoarding";
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
  return (
    <>
      <div className="w-[90%] max-w-sm overflow-y-auto no-scrollbar max-h-[calc(100dvh-312px)]">
        <ul className="grid grid-cols-3 gap-10">
          {contents.map((content) => (
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
