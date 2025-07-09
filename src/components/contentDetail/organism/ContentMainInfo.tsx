import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Content } from "@/types/content";

type ContentMainInfoProps = Pick<
  Content,
  "contentTitle" | "contentCountry" | "contentGenres" | "contentRunningTime"
>;

const ContentMainInfo = ({
  contentTitle,
  contentCountry,
  contentGenres,
  contentRunningTime,
}: ContentMainInfoProps) => {
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
      <Button className="w-full bg-custom-point text-custom-black flex items-center justify-center gap-2 max-w-[350px]">
        <Play className="w-5 h-5 text-black" />
        미리보기
      </Button>
    </section>
  );
};

export default ContentMainInfo;
