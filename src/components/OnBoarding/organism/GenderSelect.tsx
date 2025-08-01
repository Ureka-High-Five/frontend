import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useUserStore from "@/stores/useUserStore";
import { cn } from "@/utils/cn";
import type { OnBoardingStep } from "@/types/onBoarding";

interface GenderSelectProps {
  setStep: (step: OnBoardingStep) => void;
}

const GenderSelect = ({ setStep }: GenderSelectProps) => {
  const gender = useUserStore((state) => state.user.gender);
  const setGender = useUserStore((state) => state.setGender);

  return (
    <section
      aria-labelledby="gender-select-heading"
      className="flex flex-col gap-9 w-[90%] max-w-sm">
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

      {!!gender && (
        <Button
          size="lg"
          className="w-full bg-custom-point text-custom-black body-lg-dohyeon hover:bg-custom-point/90 hover:text-custom-black"
          onClick={() => setStep("content")}>
          다음으로
        </Button>
      )}
    </section>
  );
};

export default GenderSelect;
