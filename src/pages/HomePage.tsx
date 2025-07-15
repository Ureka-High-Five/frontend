import { useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import MainRecommendBanner from "@/components/Home/organism/MainRecommendBanner";
import PersonalRecommendSection from "@/components/Home/organism/PersonalRecommendSection";
import GenreRecommendSection from "@/components/Home/organism/GenreRecommendSection";
import CurationRecommendSection from "@/components/Home/organism/CurationRecommendSection";
import { useRecommendQuery } from "@/hooks/queries/home/useRecommendQuery";
import VisibleSection from "@/components/Home/atom/VisibleSection";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { recommendContents, isLoading } = useRecommendQuery();

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;

    const handleScroll = () => {
      setIsScrolled(target.scrollTop > 10);
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading || !recommendContents) return null;

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={isScrolled} />

      <main
        ref={scrollRef}
        className="flex flex-col gap-8 py-6 px-6 md:px-10 overflow-y-auto no-scrollbar"
      >
        {recommendContents.mainRecommend && (
          <MainRecommendBanner content={recommendContents.mainRecommend} />
        )}

        <VisibleSection contents={recommendContents.personalRecommends}>
          <PersonalRecommendSection contents={recommendContents.personalRecommends} />
        </VisibleSection>

        <VisibleSection contents={recommendContents.recommendGenreContents?.contents}>
          <GenreRecommendSection data={recommendContents.recommendGenreContents} />
        </VisibleSection>

        <VisibleSection contents={recommendContents.recommendSecondGenreContents?.contents}>
          <GenreRecommendSection data={recommendContents.recommendSecondGenreContents} />
        </VisibleSection>

        <VisibleSection contents={recommendContents.recommendCuration?.contents}>
          <CurationRecommendSection data={recommendContents.recommendCuration} />
        </VisibleSection>

        <VisibleSection contents={recommendContents.recommendSecondCuration?.contents}>
          <CurationRecommendSection data={recommendContents.recommendSecondCuration} />
        </VisibleSection>
      </main>

      <NavigationBar />
    </div>
  );
};

export default HomePage;
