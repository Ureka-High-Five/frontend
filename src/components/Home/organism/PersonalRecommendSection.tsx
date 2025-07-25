import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";
import type { RecommendContent } from "@/types/RecommendContentsResponse";

const PersonalRecommendSection = ({
  contents,
}: {
  contents: RecommendContent[];
}) => {
  const { userInformation } = useUserInformationQuery();

  return (
    <RecommendationSection
      title={`${userInformation?.userName}님을 위한 추천`}
      contents={contents}
    />
  );
};

export default PersonalRecommendSection;
