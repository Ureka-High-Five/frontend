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

interface GenderSelectProps {
  setStep: (step: "name" | "birthYear" | "gender" | "content") => void;
}

const GenderSelect = ({ setStep }: GenderSelectProps) => {
  const gender = useUserStore((state) => state.user.gender);
  const setGender = useUserStore((state) => state.setGender);

  return (
    <section className="flex flex-col gap-6 w-[90%] max-w-sm">
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
          className="w-full bg-custom-point text-custom-black body-lg-dohyeon"
          onClick={() => setStep("content")}>
          다음으로
        </Button>
      )}
    </section>
  );
};

export default GenderSelect;
