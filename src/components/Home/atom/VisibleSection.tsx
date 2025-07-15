import { ReactNode } from "react";

interface VisibleSectionProps<T> {
  contents?: T[];
  children: ReactNode;
}

const VisibleSection = <T,>({ contents, children }: VisibleSectionProps<T>) => {
  if (!Array.isArray(contents) || contents.length === 0) return null;
  return <>{children}</>;
};

export default VisibleSection;
