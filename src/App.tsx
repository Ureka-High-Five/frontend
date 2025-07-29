import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-500">
      <main className="flex-1 w-full max-w-[768px] mx-auto bg-custom-black overflow-hidden">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
