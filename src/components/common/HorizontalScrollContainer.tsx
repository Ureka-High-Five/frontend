import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScrollContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x",
        className
      )}
      style={{
        scrollSnapType: "x mandatory",
      }}>
      {children}
    </div>
  );
};

export default HorizontalScrollContainer;
