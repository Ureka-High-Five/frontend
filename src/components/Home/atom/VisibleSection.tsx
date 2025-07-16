interface VisibleSectionProps<T> {
  contents?: T[];
  children: React.ReactNode;
}

const VisibleSection = <T,>({ contents, children }: VisibleSectionProps<T>) => {
  if (!Array.isArray(contents) || contents.length === 0) return null;
  return <>{children}</>;
};

export default VisibleSection;
