import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/useUserStore";

interface NameProps {
  setStep: (step: "name" | "birthYear" | "gender" | "content") => void;
  isActive: boolean;
}

const Name = ({ setStep, isActive }: NameProps) => {
  const name = useUserStore((state) => state.user.name);

  return (
    <div className="flex flex-col gap-9 w-[90%] max-w-sm">
      <span
        className={`flex h-14 items-center justify-center bg-white heading-h1-pretendard px-4 rounded-md ${
          isActive ? "border-2 border-custom-point" : "border-none"
        }`}>
        {name}
      </span>

      {isActive && (
        <Button
          size="lg"
          className="w-full bg-custom-point text-custom-black body-lg-dohyeon flex items-center justify-center"
          onClick={() => setStep("birthYear")}>
          다음으로
        </Button>
      )}
    </div>
  );
};

export default Name;
