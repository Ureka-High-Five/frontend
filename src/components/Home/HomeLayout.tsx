import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import NavigationBar from "@/components/common/Nav/NavigationBar";

const HomeLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = scrollRef.current;
    if (!target) {
      return undefined;
    }

    const handleScroll = () => {
      const { scrollTop } = target;
      setScrolled(scrollTop > 10);
    };

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white h-screen flex flex-col overflow-hidden">
      <Header scrolled={scrolled} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>

      <NavigationBar />
    </div>
  );
};

export default HomeLayout;
