import { useState } from "react";
import type { OnBoardingContent } from "@/types/content";

const useContentSelector = () => {
  const [contentId, setContentId] = useState<number[]>([]);
  const [selectedMap, setSelectedMap] = useState<
    Record<number, OnBoardingContent>
  >({});

  const selectedContents = contentId.map((id) => selectedMap[id]);

  const toggleSelect = (content: OnBoardingContent) => {
    setContentId((prev) =>
      prev.includes(content.contentId)
        ? prev.filter((id) => id !== content.contentId)
        : [...prev, content.contentId]
    );

    setSelectedMap((prev) => {
      const newMap = { ...prev };

      if (newMap[content.contentId]) delete newMap[content.contentId];
      else newMap[content.contentId] = content;

      return newMap;
    });
  };

  return {
    contentId,
    selectedContents,
    toggleSelect,
  };
};

export default useContentSelector;
