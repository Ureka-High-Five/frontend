import { Button } from "@lead-me/ui/button";
import { cn } from "@lead-me/ui/cn";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@lead-me/ui/select";
import useSlangCheckMutation from "@/hooks/queries/onboarding/useSlangCheckMutation";
import useUserStore from "@/stores/useUserStore";
import { makeToast } from "@/utils/makeToast";
import type { OnBoardingStep } from "@lead-me/types/onBoarding";

interface GenderSelectProps {
  setStep: (step: OnBoardingStep) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  setHasNameError: (hasError: boolean) => void;
}

const GenderSelect = ({
  setStep,
  nameInputRef,
  setHasNameError,
}: GenderSelectProps) => {
  const gender = useUserStore((state) => state.user.gender);
  const name = useUserStore((state) => state.user.name);
  const birthYear = useUserStore((state) => state.user.birthYear);
  const setGender = useUserStore((state) => state.setGender);

  const { mutateSlangCheck } = useSlangCheckMutation();

  const handleNextClick = async () => {
    try {
      const result = await mutateSlangCheck(name);

      if (result.slangFlag) {
        setHasNameError(true);
        nameInputRef.current?.focus();

        return;
      }

      setStep("content");
    } catch (error) {
      makeToast(
        "이름 확인 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
        "warning"
      );
    }
  };

  return (
    <section
      aria-labelledby="gender-select-heading"
      className="flex flex-col gap-4 w-[90%] max-w-sm">
      <h2 id="gender-select-heading" className="sr-only">
        성별 선택
      </h2>
      <Select
        value={gender}
        onValueChange={(value: "MALE" | "FEMALE") => setGender(value)}>
        <SelectTrigger
          className={cn(
            "w-full bg-white text-custom-black rounded-md",
            gender ? "border-none" : "border-2 border-custom-point"
          )}>
          <SelectValue placeholder="성별을 선택해주세요" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="MALE">남성</SelectItem>
          <SelectItem value="FEMALE">여성</SelectItem>
        </SelectContent>
      </Select>

      <Button
        size="lg"
        className="w-full bg-custom-point text-custom-black body-lg-dohyeon hover:bg-custom-point/90 hover:text-custom-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNextClick}
        disabled={!(gender && name && birthYear)}>
        다음으로
      </Button>
    </section>
  );
};

export default GenderSelect;
