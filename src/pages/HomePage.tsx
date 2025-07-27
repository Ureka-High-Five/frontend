import { useState } from "react";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import VisibleSection from "@/components/Home/atom/VisibleSection";
import HomeErrorFallback from "@/components/Home/HomeErrorFallback";
import CurationRecommendSection from "@/components/Home/organism/CurationRecommendSection";
import GenreRecommendSection from "@/components/Home/organism/GenreRecommendSection";
import MainRecommendBanner from "@/components/Home/organism/MainRecommendBanner";
import PersonalRecommendSection from "@/components/Home/organism/PersonalRecommendSection";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import { useRecommendQuery } from "@/hooks/queries/home/useRecommendQuery";

const HomeContent = ({
  onScrollChange,
}: {
  onScrollChange: (v: boolean) => void;
}) => {
  const { recommendContents } = useRecommendQuery();

  const { targetRef } = useIntersectionObserver({
    onIntersect: () => onScrollChange(true),
    threshold: 0.01,
  });

  return (
    <main className="flex flex-col gap-8 py-24 px-8 md:px-10 overflow-y-auto no-scrollbar">
      <div ref={targetRef} className="h-1" />
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
      <VisibleSection contents={recommendContents.recommendCuration?.contents}>
        <CurationRecommendSection data={recommendContents.recommendCuration} />
      </VisibleSection>
      <VisibleSection
        contents={recommendContents.recommendSecondCuration?.contents}>
        <CurationRecommendSection
          data={recommendContents.recommendSecondCuration}
        />
      </VisibleSection>
    </main>
  );
};

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={isScrolled} />
      <AsyncBoundary ErrorFallbackComponent={HomeErrorFallback}>
        <HomeContent onScrollChange={setIsScrolled} />
      </AsyncBoundary>
      <NavigationBar />
    </div>
  );
};

export default HomePage;
