import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import type { RecommendGenreContent } from "@/types/RecommendContentsResponse";

const GenreRecommendSection = ({ data }: { data: RecommendGenreContent }) => (
  <RecommendationSection
    title={`${data.genre} 장르에 빠졌다면`}
    contents={data.contents}
  />
);

export default GenreRecommendSection;
