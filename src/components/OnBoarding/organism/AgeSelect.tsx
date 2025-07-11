import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useUserStore from "@/stores/useUserStore";
import { cn } from "@/utils/cn";

interface AgeSelectProps {
  setStep: (step: "name" | "age" | "gender" | "content") => void;
}

const AgeSelect = ({ setStep }: AgeSelectProps) => {
  const year = useUserStore((state) => state.user.year);
  const setYear = useUserStore((state) => state.setYear);
  const years = Array.from({ length: 101 }, (_, i) => 2025 - i);

  const handleAgeChange = (val: string) => {
    setYear(Number(val));
    setStep("gender");
  };

  return (
    <section className="flex flex-col gap-6 w-[90%] max-w-sm">
      <Select value={year ? String(year) : ""} onValueChange={handleAgeChange}>
        <SelectTrigger
          className={cn(
            "w-full bg-white text-custom-black rounded-md",
            year ? "border-none" : "border-2 border-custom-point"
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

export default AgeSelect;
