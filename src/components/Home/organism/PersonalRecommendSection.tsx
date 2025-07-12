import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import type { RecommendContent } from "@/types/RecommendContentsResponse";

const PersonalRecommendSection = ({ contents }: { contents: RecommendContent[] }) => (
  <RecommendationSection
    title="이예슬님을 위한 추천"
    contents={contents}
  />
);

export default PersonalRecommendSection;
