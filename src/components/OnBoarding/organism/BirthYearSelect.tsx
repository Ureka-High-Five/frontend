import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useUserStore from "@/stores/useUserStore";
import { cn } from "@/utils/cn";

interface BirthYearSelectProps {
  setStep: (step: "name" | "birthYear" | "gender" | "content") => void;
}

const BirthYearSelect = ({ setStep }: BirthYearSelectProps) => {
  const birthYear = useUserStore((state) => state.user.birthYear);
  const setBirthYear = useUserStore((state) => state.setBirthYear);
  const years = Array.from(
    { length: 101 },
    (_, i) => new Date().getFullYear() - 8 - i
  );

  const handleBirthYearChange = (value: string) => {
    setBirthYear(Number(value));
    setStep("gender");
  };

  return (
    <section className="flex flex-col gap-6 w-[90%] max-w-sm">
      <Select
        value={birthYear ? String(birthYear) : ""}
        onValueChange={handleBirthYearChange}>
        <SelectTrigger
          className={cn(
            "w-full bg-white text-custom-black rounded-md",
            birthYear ? "border-none" : "border-2 border-custom-point"
          )}>
          <SelectValue placeholder="태어난 연도를 선택해주세요" />
        </SelectTrigger>

        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}년생
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};

export default BirthYearSelect;
