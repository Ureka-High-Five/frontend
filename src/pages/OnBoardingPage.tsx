import { useEffect, useState } from "react";
import OnBoardingLayout from "@/components/OnBoarding/OnBoardingLayout";
import useOnBoardingContentMutation from "@/hooks/queries/onboarding/useOnBoardingContentMutation";
import useOnBoardingContentQuery from "@/hooks/queries/onboarding/useOnBoardingContentQuery";
import useUserPreferenceMutation from "@/hooks/queries/onboarding/useUserPreferenceMutation";
import useUserStore from "@/stores/useUserStore";
import type { OnBoardingContent } from "@/types/content";

const OnBoardingPage = () => {
  const [step, setStep] = useState<"name" | "birthYear" | "gender" | "content">(
    "name"
  );
  const [contents, setContents] = useState<OnBoardingContent[]>([]);

  const selectedIds = useUserStore((state) => state.user.selectedContentIds);
  const addContentId = useUserStore((state) => state.addSelectedContentId);
  const removeContentId = useUserStore(
    (state) => state.removeSelectedContentId
  );
  const { user } = useUserStore.getState();

  const { onBoardingContent } = useOnBoardingContentQuery();
  const { mutatePostOnBoardingContent } = useOnBoardingContentMutation();
  const { mutateUserPreference } = useUserPreferenceMutation();

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

  const handleSubmitOnBoarding = () => {
    mutateUserPreference(user);
  };

  return (
    <OnBoardingLayout
      step={step}
      setStep={setStep}
      contents={contents}
      selectedIds={selectedIds}
      toggleSelect={toggleSelect}
      onSubmitOnBoarding={handleSubmitOnBoarding}
    />
  );
};

export default OnBoardingPage;
