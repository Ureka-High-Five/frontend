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
  ...rest
}: CommonButtonProps & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(
        "w-[90%] max-w-sm h-14 text-custom-black body-lg-dohyeon",
        variant === "default" && "bg-custom-point hover:bg-custom-point/90",
        className
      )}
      {...rest}>
      {emoji && <span className="mr-2">{emoji}</span>}
      {text}
    </Button>
  );
};

export default CommonButton;
