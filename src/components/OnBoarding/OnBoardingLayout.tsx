import { ONBOARDING_STEP_TEXTS, REQUIRED_COUNT } from "@/constants/onBoarding";
import type { OnBoardingContent } from "@/types/content";
import type { OnBoardingStep } from "@/types/onBoarding";
import BirthYearSelect from "./organism/BirthYearSelect";
import ContentSelect from "./organism/ContentSelect";
import GenderSelect from "./organism/GenderSelect";
import Name from "./organism/Name";

interface OnBoardingLayoutProps {
  step: OnBoardingStep;
  setStep: (step: OnBoardingStep) => void;
  contents: OnBoardingContent[];
  selectedIds: number[];
  selectedContents: OnBoardingContent[];
  toggleSelect: (content: OnBoardingContent) => void;
  onSubmitOnBoarding: () => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  hasNameError: boolean;
  setHasNameError: (hasError: boolean) => void;
}

const OnBoardingLayout = ({
  step,
  setStep,
  contents,
  selectedIds,
  selectedContents,
  toggleSelect,
  onSubmitOnBoarding,
  nameInputRef,
  hasNameError,
  setHasNameError,
}: OnBoardingLayoutProps) => {
  const selectedCount = selectedIds.length;

  const stepTexts = {
    ...ONBOARDING_STEP_TEXTS,
    content:
      selectedCount < REQUIRED_COUNT
        ? [
            ONBOARDING_STEP_TEXTS.content.default[0],
            `${REQUIRED_COUNT - selectedCount}${ONBOARDING_STEP_TEXTS.content.default[1]}`,
          ]
        : ONBOARDING_STEP_TEXTS.content.completed,
  };

  return (
    <section className="flex flex-col items-center h-full gap-6 py-8">
      <h1 className="heading-h1-dohyeon text-white w-[90%] max-w-sm">
        {stepTexts[step][0]} <br /> {stepTexts[step][1]}
      </h1>
      {step === "content" ? (
        <ContentSelect
          contents={contents}
          selectedIds={selectedIds}
          selectedContents={selectedContents}
          toggleSelect={toggleSelect}
          onSubmitOnBoarding={onSubmitOnBoarding}
        />
      ) : (
        <>
          <Name
            setStep={setStep}
            isActive={step === "name"}
            nameInputRef={nameInputRef}
            hasNameError={hasNameError}
          />
          {(step === "birthYear" || step === "gender") && (
            <BirthYearSelect setStep={setStep} />
          )}
          {step === "gender" && (
            <GenderSelect
              setStep={setStep}
              nameInputRef={nameInputRef}
              setHasNameError={setHasNameError}
            />
          )}
        </>
      )}
    </section>
  );
};

export default OnBoardingLayout;
