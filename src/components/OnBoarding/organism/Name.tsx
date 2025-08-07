import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/stores/useUserStore";
import type { OnBoardingStep } from "@/types/onBoarding";

interface NameProps {
  setStep: (step: OnBoardingStep) => void;
  isActive: boolean;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  hasNameError: boolean;
}

const Name = ({ setStep, isActive, nameInputRef, hasNameError }: NameProps) => {
  const name = useUserStore((state) => state.user.name);
  const setName = useUserStore((state) => state.setName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.replace(/\s/g, ""));
  };

  return (
    <section
      aria-labelledby="name-heading"
      className="flex flex-col gap-9 w-[90%] max-w-sm">
      <h2 id="name-heading" className="sr-only">
        이름 확인
      </h2>
      <div className="flex flex-col gap-2">
        <Input
          ref={nameInputRef}
          className={`h-14 bg-white !text-heading-h1 font-pretendard text-center leading-[5rem] px-4 rounded-md 
          focus:border-2 focus:border-custom-point focus:border-2 focus:border-custom-point ${
            isActive
              ? "border-2 border-custom-point"
              : "border border-transparent"
          }`}
          placeholder="이름을 작성해주세요"
          value={name}
          onChange={handleNameChange}
        />
        {hasNameError && (
          <p
            className="text-body-md text-red-500"
            role="alert"
            aria-live="polite">
            이름에 사용할 수 없는 단어가 있어요.
          </p>
        )}
      </div>

      {isActive && (
        <Button
          size="lg"
          className="w-full bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center hover:bg-custom-point/90 hover:text-custom-black"
          onClick={() => setStep("birthYear")}
          disabled={name.length === 0}>
          다음으로
        </Button>
      )}
    </section>
  );
};

export default Name;
