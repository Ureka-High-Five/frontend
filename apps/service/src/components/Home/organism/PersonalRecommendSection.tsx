import useUserInformationQuery from "@lead-me/data-access/user/useUserInformationQuery";
import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import type { RecommendContent } from "@lead-me/types/RecommendContentsResponse";

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
