import { ONBOARDING_STEP_TEXTS, REQUIRED_COUNT } from "@/constants/onBoarding";
import type { OnBoardingContent } from "@/types/content";
import BirthYearSelect from "./organism/BirthYearSelect";
import ContentSelect from "./organism/ContentSelect";
import GenderSelect from "./organism/GenderSelect";
import Name from "./organism/Name";

interface OnBoardingLayoutProps {
  step: "name" | "birthYear" | "gender" | "content";
  setStep: (step: "name" | "birthYear" | "gender" | "content") => void;
  contents: OnBoardingContent[];
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  onSubmitOnBoarding: () => void;
}

const OnBoardingLayout = ({
  step,
  setStep,
  contents,
  selectedIds,
  toggleSelect,
  onSubmitOnBoarding,
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
    <section className="flex flex-col items-center h-full gap-9 py-16">
      <h1 className="heading-h1-dohyeon text-white w-[90%] max-w-sm">
        {stepTexts[step][0]} <br /> {stepTexts[step][1]}
      </h1>
      {step === "content" ? (
        <ContentSelect
          contents={contents}
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          onSubmitOnBoarding={onSubmitOnBoarding}
        />
      ) : (
        <>
          <Name setStep={setStep} isActive={step === "name"} />
          {(step === "birthYear" || step === "gender") && (
            <BirthYearSelect setStep={setStep} />
          )}
          {step === "gender" && <GenderSelect setStep={setStep} />}
        </>
      )}
    </section>
  );
};

export default OnBoardingLayout;
