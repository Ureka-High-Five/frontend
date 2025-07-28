import { useEffect, useState } from "react";
import OnBoardingLayout from "@/components/OnBoarding/OnBoardingLayout";
import useOnBoardingContentMutation from "@/hooks/queries/onboarding/useOnBoardingContentMutation";
import useOnBoardingContentQuery from "@/hooks/queries/onboarding/useOnBoardingContentQuery";
import useUserPreferenceMutation from "@/hooks/queries/onboarding/useUserPreferenceMutation";
import useUserStore from "@/stores/useUserStore";
import type { OnBoardingContent } from "@/types/content";
import type { OnBoardingStep } from "@/types/onBoarding";

const OnBoardingPage = () => {
  const [step, setStep] = useState<OnBoardingStep>("name");
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

  const toggleSelect = async (id: number) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      removeContentId(id);
    } else {
      addContentId(id);

      const recommendedIds = contents.map((content) => content.contentId);
      const newContents = await mutatePostOnBoardingContent({
        selectedContentIds: [...selectedIds, id],
        recommendedContentIds: recommendedIds,
      });

      setContents((prev) => [...prev, ...newContents]);
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
