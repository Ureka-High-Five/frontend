import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MainRecommend } from "@/types/RecommendContentsResponse";

interface Props {
  content: MainRecommend;
}

const MainRecommendBanner = ({ content }: Props) => {
  return (
    <section className="flex flex-col items-center">
      <img
        src={content.posterUrl}
        alt="메인 추천"
        className="w-full rounded-md aspect-square object-cover"
      />
      <h2 className="heading-h2-pretendard font-bold mt-2">{content.description}</h2>
      <p className="body-sm-pretendard text-gray-300">{content.genre.join(" · ")}</p>
      <Button className="w-full bg-custom-point text-custom-black body-sm-pretendard mt-3">
        <Play />
        미리보기
      </Button>
    </section>
  );
};

export default MainRecommendBanner;
