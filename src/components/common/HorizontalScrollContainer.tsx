import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScrollContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        scrollSnapType: "x mandatory"
        "flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x",
        className
      )}>
      {children}
    </div>
  );
};

export default HorizontalScrollContainer;
