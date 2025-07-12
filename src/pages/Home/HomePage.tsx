import { useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import MainRecommendBanner from "@/components/Home/organism/MainRecommendBanner";
import PersonalRecommendSection from "@/components/Home/organism/PersonalRecommendSection";
import GenreRecommendSection from "@/components/Home/organism/GenreRecommendSection";
import CurationRecommendSection from "@/components/Home/organism/CurationRecommendSection";
import { mockRecommendContentsData } from "./__mock__/mockRecommendContents";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) return;

    const handleScroll = () => {
      setScrolled(target.scrollTop > 10);
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  const data = mockRecommendContentsData;

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={scrolled} />

      <main ref={scrollRef} className="flex flex-col gap-8 py-6 px-6 md:px-10 overflow-y-auto no-scrollbar">
        <MainRecommendBanner content={data.mainRecommend} />
        
        <PersonalRecommendSection contents={data.recommendContents} />
        <GenreRecommendSection data={data.recommendGenreContents} />
        <GenreRecommendSection data={data.recommendSecondGenreContents} />
        
        <CurationRecommendSection data={data.recommendCuration} />
        <CurationRecommendSection data={data.recommendSecondCuration} />
      </main>

      <NavigationBar />
    </div>
  );
};

export default HomePage;
