import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { REQUIRED_COUNT } from "@/constants/onBoarding";
import useOnBoardingContentMutation from "@/hooks/queries/onboarding/useOnBoardingContentMutation";
import useOnBoardingContentQuery from "@/hooks/queries/onboarding/useOnBoardingContentQuery";
import useUserPreferenceMutation from "@/hooks/queries/onboarding/useUserPreferenceMutation";
import useUserStore from "@/stores/useUserStore";
import type { OnBoardingContent } from "@/types/content";
import OnBoardingContentCard from "../molecule/OnBoardingContentCard";

const ContentSelect = () => {
  const [contents, setContents] = useState<OnBoardingContent[]>([]);
  const selectedIds = useUserStore((state) => state.user.selectedContentIds);
  const addContentId = useUserStore((state) => state.addSelectedContentId);
  const removeContentId = useUserStore(
    (state) => state.removeSelectedContentId
  );
  const { user } = useUserStore.getState();

  const { onBoardingContent } = useOnBoardingContentQuery();
  const { mutatePostOnBoardingContent } = useOnBoardingContentMutation();
  const { mutateUserPrefernce } = useUserPreferenceMutation();

  useEffect(() => {
    if (onBoardingContent) {
      setContents(onBoardingContent);
    }
  }, [onBoardingContent]);

  const mergeUniqueContents = (
    base: OnBoardingContent[],
    add: OnBoardingContent[]
  ): OnBoardingContent[] => {
    const existingIds = new Set(base.map((item) => item.contentId));
    const filtered = add.filter((item) => !existingIds.has(item.contentId));

    return [...base, ...filtered];
  };

  const toggleSelect = async (id: number) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      removeContentId(id);
    } else {
      addContentId(id);

      const newContents = await mutatePostOnBoardingContent([
        ...selectedIds,
        id,
      ]);
      setContents((prev) => mergeUniqueContents(prev, newContents));
    }
  };

  const handleStartButtonClick = () => {
    mutateUserPrefernce(user);
  };

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
        onClick={handleStartButtonClick}>
        시작하기
      </Button>
    </>
  );
};

export default ContentSelect;
