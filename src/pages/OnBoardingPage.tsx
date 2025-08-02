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
  const [selectedContents, setSelectedContents] = useState<OnBoardingContent[]>(
    []
  );

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

  const toggleSelect = async (content: OnBoardingContent) => {
    const isSelected = selectedIds.includes(content.contentId);

    if (isSelected) {
      removeContentId(content.contentId);
      setSelectedContents((prev) =>
        prev.filter((c) => c.contentId !== content.contentId)
      );
    } else {
      addContentId(content.contentId);
      setSelectedContents((prev) => [...prev, content]);

      const recommendedIds = contents.map((c) => c.contentId);
      const newContents = await mutatePostOnBoardingContent({
        selectedContentIds: [...selectedIds, content.contentId],
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
      selectedContents={selectedContents}
      toggleSelect={toggleSelect}
      onSubmitOnBoarding={handleSubmitOnBoarding}
    />
  );
};

export default OnBoardingPage;
