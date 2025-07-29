import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RecommendCuration } from "@/types/RecommendContentsResponse";

interface Props {
  curations: RecommendCuration[];
}

const CurationRecommendSection = ({ curations }: Props) => {
  return (
    <>
      {curations.map((curation) => {
        const { userName, profileUrl, title, contents } = curation;

        const customHeader = (
          <section className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={profileUrl}
                alt="프로필 이미지"
                className="rounded-full object-cover"
              />
              <AvatarFallback>{userName.at(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="body-sm-pretendard text-custom-gray">
                {userName}님의 컬렉션
              </span>
              <span className="heading-h2-pretendard text-white">{title}</span>
            </div>
          </section>
        );

        return (
          <RecommendationSection
            key={curation.curationId}
            customHeader={customHeader}
            contents={contents}
          />
        );
      })}
    </>
  );
};

export default CurationRecommendSection;
