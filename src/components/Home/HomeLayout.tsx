import { Outlet } from "react-router-dom";
import NavigationBar from "@/components/Nav/NavigationBar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-custom-gray">
      <main className="flex-1 w-full max-w-[360px] mx-auto overflow-hidden">
        <Outlet />
      </main>
      <NavigationBar />
    </div>
  );
};

export default HomeLayout;
