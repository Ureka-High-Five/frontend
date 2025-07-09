import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface CommonButtonProps {
  text: string;
  emoji?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  className?: string;
}

const CommonButton = ({
  text,
  emoji,
  onClick,
  variant = "default",
  size = "default",
  disabled = false,
  className,
}: CommonButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        "h-12 w-80 text-base font-medium",
        variant === "default" &&
          "bg-custom-point text-custom-black hover:bg-custom-point/90",
        className
      )}>
      {emoji && <span className="mr-2">{emoji}</span>}
      {text}
    </Button>
  );
};

export default CommonButton;
