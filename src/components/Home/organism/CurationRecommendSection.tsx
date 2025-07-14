import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import type { RecommendCuration } from "@/types/RecommendContentsResponse";
import AvatarWithText from "@/components/common/AvatarWithText";

const CurationRecommendSection = ({ data }: { data: RecommendCuration }) => (
  <RecommendationSection
    customHeader={
      <AvatarWithText
        avatarUrl={data.userProfile}
        title={
          <>
            <span className="block body-sm-pretendard text-pink-400">{data.userName}의 추천</span>
            <span className="block body-md-pretendard font-semibold">{data.curationTitle}</span>
          </>
        }
      />
    }
    contents={data.contents}
  />
);

export default CurationRecommendSection;
