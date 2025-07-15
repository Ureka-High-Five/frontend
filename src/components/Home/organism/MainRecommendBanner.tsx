import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MainRecommend } from "@/types/RecommendContentsResponse";
import { usePreviewVideoQuery } from "@/hooks/queries/usePreviewVideoQuery";
import { useState } from "react";

interface Props {
  content: MainRecommend;
}

const MainRecommendBanner = ({ content }: Props) => {
  const [clicked, setClicked] = useState(false);
  const { refetch } = usePreviewVideoQuery(content.contentId, clicked);

  const handlePreview = () => {
    setClicked(true);
    refetch(); 
  };

  return (
    <section className="flex flex-col items-center">
      <img
        src={content.posterUrl}
        alt="메인 포스터"
        className="w-full rounded-md aspect-square object-cover"
      />
      <h2 className="heading-h2-pretendard font-bold mt-2">{content.description}</h2>
      <p className="body-sm-pretendard text-gray-300">{content.genre.join(" · ")}</p>
      <Button
        onClick={handlePreview}
        className="w-full bg-custom-point text-custom-black body-sm-pretendard mt-3"
      >
        <Play />
        미리보기
      </Button>
    </section>
  );
};

export default MainRecommendBanner;
