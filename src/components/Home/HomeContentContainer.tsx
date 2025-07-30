import CurationRecommendSection from "@/components/Home/organism/CurationRecommendSection";
import GenreRecommendSection from "@/components/Home/organism/GenreRecommendSection";
import MainRecommendBanner from "@/components/Home/organism/MainRecommendBanner";
import PersonalRecommendSection from "@/components/Home/organism/PersonalRecommendSection";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useRecommendQuery } from "@/hooks/queries/home/useRecommendQuery";

interface HomeContentContainerProps {
  onScrollChange: (v: boolean) => void;
}

const HomeContentContainer = ({
  onScrollChange,
}: HomeContentContainerProps) => {
  const { recommendContents } = useRecommendQuery();

  const { targetRef } = useIntersectionObserver({
    onIntersect: () => onScrollChange(true),
    threshold: 0.01,
  });

  return (
    <main className="flex flex-col flex-1 gap-8 py-12 px-8 md:px-10 overflow-y-auto no-scrollbar">
      <div ref={targetRef} className="h-1" />
      {recommendContents.mainRecommend && (
        <MainRecommendBanner content={recommendContents.mainRecommend} />
      )}
      {recommendContents.personalRecommends?.length > 0 && (
        <PersonalRecommendSection
          contents={recommendContents.personalRecommends}
        />
      )}
      {Object.entries(recommendContents.genre).map(([genre, contents]) => (
        <GenreRecommendSection key={genre} data={{ genre, contents }} />
      ))}
      {recommendContents.curation?.length > 0 && (
        <CurationRecommendSection curations={recommendContents.curation} />
      )}
    </main>
  );
};

export default HomeContentContainer;
