import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScrollContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory",
        className
      )}>
      {children}
    </div>
  );
};

export default HorizontalScrollContainer;
