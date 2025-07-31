import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useShortsRouteCache } from "@/hooks/common/useRouteBasedCacheReset";
import "./index.css";

function App() {
  // 쇼츠 페이지 캐시 관리
  useShortsRouteCache();

  return (
    <div className="flex flex-col min-h-screen-mobile w-full bg-gray-500">
      <main className="flex-1 w-full h-full max-w-[768px] mx-auto bg-custom-black overflow-hidden">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
