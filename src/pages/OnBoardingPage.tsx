import { useState } from "react";
import OnBoardingLayout from "@/components/OnBoarding/OnBoardingLayout";

const OnBoardingPage = () => {
  const [step, setStep] = useState<"name" | "birthYear" | "gender" | "content">(
    "name"
  );

  return <OnBoardingLayout step={step} setStep={setStep} />;
};

export default OnBoardingPage;
