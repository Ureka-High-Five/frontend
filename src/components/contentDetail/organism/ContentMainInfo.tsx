import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { END_POINTS } from "@/constants/api";
import type { Content } from "@/types/content";

type ContentMainInfoProps = Pick<
  Content,
  | "contentTitle"
  | "contentCountry"
  | "contentGenres"
  | "contentRunningTime"
  | "shortsId"
>;

const ContentMainInfo = ({
  contentTitle,
  contentCountry,
  contentGenres,
  contentRunningTime,
  shortsId,
}: ContentMainInfoProps) => {
  const navigate = useNavigate();

  const handlePreviewClick = () => {
    if (shortsId) {
      navigate(`${END_POINTS.SHORTS}/${shortsId}`);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-2">
      <header className="inline-block">
        <h1 className="heading-h1-dohyeon text-white">{contentTitle}</h1>
      </header>
      <ul className="flex gap-3 body-sm-pretendard w-max text-custom-gray">
        <li>{contentCountry}</li>
        <li>{contentGenres.join(", ")}</li>
        <li>{contentRunningTime}분</li>
      </ul>
      <Button
        onClick={handlePreviewClick}
        disabled={!shortsId}
        className="w-full bg-custom-point text-custom-black flex items-center justify-center gap-2 max-w-[350px] disabled:opacity-50">
        <Play className="w-5 h-5 text-black" />
        미리보기
      </Button>
    </section>
  );
};

export default ContentMainInfo;
