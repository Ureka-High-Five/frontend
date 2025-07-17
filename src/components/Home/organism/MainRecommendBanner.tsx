import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MainRecommend } from "@/types/RecommendContentsResponse";

interface Props {
  content: MainRecommend;
}

const MainRecommendBanner = ({ content }: Props) => {
  const navigate = useNavigate();

  const handlePreviewClick = () => {
    {/* TODO: 미리보기 이동 */}
  };

  return (
    <section className="relative w-full max-w-[600px] mx-auto">
      <img
        src={content.posterUrl}
        alt="메인 포스터"
        className="w-full rounded-xl aspect-square object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/70 to-transparent p-4 rounded-xl gap-3"> {/* ✅ 오버레이 배경 + 텍스트 영역 */}
      <h2 className="body-lg-pretendard">{content.description}</h2>
      <p className="body-sm-pretendard text-custom-gray">{content.genre.join(" · ")}</p>
      <Button
        onClick={handlePreviewClick}
        className="w-full bg-custom-point text-custom-black flex items-center justify-center gap-2 max-w-[350px] body-sm-pretendard"
      >
        <Play />
        미리보기
      </Button>
    </div>
    </section>
  );
};

export default MainRecommendBanner;
