import { ONBOARDING_STEP_TEXTS, REQUIRED_COUNT } from "@/constants/onBoarding";
import useUserStore from "@/stores/useUserStore";
import BirthYearSelect from "./organism/BirthYearSelect";
import ContentSelect from "./organism/ContentSelect";
import GenderSelect from "./organism/GenderSelect";
import Name from "./organism/Name";

interface OnBoardingLayoutProps {
  step: "name" | "birthYear" | "gender" | "content";
  setStep: (step: "name" | "birthYear" | "gender" | "content") => void;
}

const OnBoardingLayout = ({ step, setStep }: OnBoardingLayoutProps) => {
  const selectedCount = useUserStore(
    (state) => state.user.selectedContentIds.length
  );

  const stepTexts = {
    ...ONBOARDING_STEP_TEXTS,
    content: [
      ONBOARDING_STEP_TEXTS.content[0],
      `${REQUIRED_COUNT - selectedCount}${ONBOARDING_STEP_TEXTS.content[1]}`,
    ],
  };

  return (
    <main className="flex flex-col items-center h-full gap-9 py-16">
      <p className="heading-h1-dohyeon text-white w-[90%] max-w-sm">
        {stepTexts[step][0]} <br /> {stepTexts[step][1]}
      </p>
      {step !== "content" && (
        <>
          <Name setStep={setStep} isActive={step === "name"} />
          {(step === "birthYear" || step === "gender") && (
            <BirthYearSelect setStep={setStep} />
          )}
          {step === "gender" && <GenderSelect setStep={setStep} />}
        </>
      )}
      {step === "content" && <ContentSelect />}
    </main>
  );
};

export default OnBoardingLayout;
