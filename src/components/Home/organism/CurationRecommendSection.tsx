import AvatarWithText from "@/components/common/AvatarWithText";
import RecommendationSection from "@/components/Home/molecule/RecommendationSection";
import type { RecommendCuration } from "@/types/RecommendContentsResponse";

interface Props {
  curations: RecommendCuration[];
}

const CurationRecommendSection = ({ curations }: Props) => {
  const { userName, profileUrl, title } = curations[0];

  const customHeader = (
    <AvatarWithText
      avatarUrl={profileUrl}
      title={`${userName}님의 컬렉션`}
      subText={title}
    />
  );

  const contents = curations.map((curation) => ({
    contentId: curation.curationId,
    thumbnailUrl: curation.thumbnailUrl,
  }));

  return (
    <RecommendationSection customHeader={customHeader} contents={contents} />
  );
};

export default CurationRecommendSection;
