import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-500">
      <main className="flex-1 w-full max-w-[700px] mx-auto overflow-hidden bg-custom-black">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
