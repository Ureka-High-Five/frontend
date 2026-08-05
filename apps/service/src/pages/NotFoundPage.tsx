import { useNavigate } from "react-router-dom";
import { Button } from "@lead-me/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center gap-4 px-6">
      <h1 className="text-3xl font-bold text-custom-point">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-custom-gray">
        요청하신 주소가 존재하지 않거나 변경되었습니다.
      </p>
      <Button
        onClick={() => navigate("/home")}
        className="bg-custom-point text-black font-bold px-6 py-2 mt-4">
        홈으로
      </Button>
    </div>
  );
};

export default NotFoundPage;
