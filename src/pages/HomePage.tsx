import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import VisibleSection from "@/components/Home/atom/VisibleSection";
import CurationRecommendSection from "@/components/Home/organism/CurationRecommendSection";
import GenreRecommendSection from "@/components/Home/organism/GenreRecommendSection";
import MainRecommendBanner from "@/components/Home/organism/MainRecommendBanner";
import PersonalRecommendSection from "@/components/Home/organism/PersonalRecommendSection";
import { useScrollPositionDetector } from "@/hooks/common/useScrollPositionDetector";
import { useRecommendQuery } from "@/hooks/queries/home/useRecommendQuery";

const HomePage = () => {
  const { isScrolled, sentinelRef } = useScrollPositionDetector();
  const { recommendContents, isLoading } = useRecommendQuery();

  if (isLoading || !recommendContents) return null;

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={isScrolled} />

      <main className="flex flex-col flex-1 gap-8 py-16 px-8 md:px-10 overflow-y-auto no-scrollbar">
        <div ref={sentinelRef} className="h-1" />

        {recommendContents.mainRecommend && (
          <MainRecommendBanner content={recommendContents.mainRecommend} />
        )}

        <VisibleSection contents={recommendContents.personalRecommends}>
          <PersonalRecommendSection
            contents={recommendContents.personalRecommends}
          />
        </VisibleSection>

        {Object.entries(recommendContents.genre).map(([genre, contents]) => (
          <VisibleSection key={genre} contents={contents}>
            <GenreRecommendSection data={{ genre, contents }} />
          </VisibleSection>
        ))}

        <VisibleSection
          contents={recommendContents.recommendCuration?.contents}>
          <CurationRecommendSection
            data={recommendContents.recommendCuration}
          />
        </VisibleSection>

        <VisibleSection
          contents={recommendContents.recommendSecondCuration?.contents}>
          <CurationRecommendSection
            data={recommendContents.recommendSecondCuration}
          />
        </VisibleSection>
      </main>

      <NavigationBar />
    </div>
  );
};

export default HomePage;
