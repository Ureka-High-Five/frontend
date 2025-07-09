import { useLocation } from "react-router-dom";

const ContentDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto no-scrollbar">
      <div className="text-white">디테일페이지입니다.</div>
      <div className="text-white">콘텐츠 ID: {id}</div>
    </div>
  );
};

export default ContentDetailPage;
