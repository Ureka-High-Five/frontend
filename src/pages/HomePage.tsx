import { useState } from "react";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import HomeContentContainer from "@/components/Home/HomeContentContainer";
import HomeErrorFallback from "@/components/Home/HomeErrorFallback";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="relative bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={isScrolled} />
      <AsyncBoundary ErrorFallbackComponent={HomeErrorFallback}>
        <HomeContentContainer onScrollChange={setIsScrolled} />
      </AsyncBoundary>
      <NavigationBar />
    </div>
  );
};

export default HomePage;
