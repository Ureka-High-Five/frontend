import type { OnBoardingContent } from "@/types/content";

const mergeUniqueContents = (
  base: OnBoardingContent[],
  add: OnBoardingContent[]
): OnBoardingContent[] => {
  const existingIds = new Set(base.map((item) => item.contentId));
  const filtered = add.filter((item) => !existingIds.has(item.contentId));

  return [...base, ...filtered];
};

export default mergeUniqueContents;
