import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";
import type { OnBoardingStep } from "@/types/onBoarding";

interface NameProps {
  setStep: (step: OnBoardingStep) => void;
  isActive: boolean;
}

const Name = ({ setStep, isActive }: NameProps) => {
  const name = useUserStore((state) => state.user.name);

  return (
    <section
      aria-labelledby="name-heading"
      className="flex flex-col gap-9 w-[90%] max-w-sm">
      <h2 id="name-heading" className="sr-only">
        이름 확인
      </h2>
      <p
        className={`flex h-14 items-center justify-center bg-white heading-h1-pretendard px-4 rounded-md ${
          isActive ? "border-2 border-custom-point" : "border-none"
        }`}>
        {name}
      </p>

      {isActive && (
        <Button
          size="lg"
          className="w-full bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center hover:bg-custom-point/90 hover:text-custom-black"
          onClick={() => setStep("birthYear")}>
          다음으로
        </Button>
      )}
    </section>
  );
};

export default Name;
