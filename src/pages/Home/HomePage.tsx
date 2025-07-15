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

  const { data, isLoading } = useRecommendQuery();

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;

    const handleScroll = () => {
      setIsScrolled(target.scrollTop > 10);
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading || !data) return null;

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={isScrolled} />

      <main
        ref={scrollRef}
        className="flex flex-col gap-8 py-6 px-6 md:px-10 overflow-y-auto no-scrollbar"
      >
        {data.mainRecommend && (
          <MainRecommendBanner content={data.mainRecommend} />
        )}

        <VisibleSection contents={data.personalRecommends}>
          <PersonalRecommendSection contents={data.personalRecommends} />
        </VisibleSection>

        <VisibleSection contents={data.recommendGenreContents?.contents}>
          <GenreRecommendSection data={data.recommendGenreContents} />
        </VisibleSection>

        <VisibleSection contents={data.recommendSecondGenreContents?.contents}>
          <GenreRecommendSection data={data.recommendSecondGenreContents} />
        </VisibleSection>

        <VisibleSection contents={data.recommendCuration?.contents}>
          <CurationRecommendSection data={data.recommendCuration} />
        </VisibleSection>

        <VisibleSection contents={data.recommendSecondCuration?.contents}>
          <CurationRecommendSection data={data.recommendSecondCuration} />
        </VisibleSection>
      </main>

      <NavigationBar />
    </div>
  );
};

export default HomePage;
