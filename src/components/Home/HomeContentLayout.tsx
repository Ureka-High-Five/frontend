import type { RecommendContentsResponse } from "@/types/RecommendContentsResponse";
import MainRecommendBanner from "./MainRecommendBanner";
import RecommendationSection from "./RecommendationSection";

interface Props {
  data: RecommendContentsResponse;
}
const HomeContentLayout = ({ data }: Props) => {
  return (
    <main className="flex flex-col gap-8 py-6">
      <div className="w-full max-w-screen-md mx-auto px-4 md:px-10">
        {/* <RandomPickBanner content={data.randomContent} /> */}
        <MainRecommendBanner content={data.mainRecommend} />
        <RecommendationSection
          title="이예슬님을 위한 추천"
          contents={data.recommendContents}
        />

        <RecommendationSection
          title={`어두운 ${data.recommendGenreContents.genre} 장르에 빠졌다면`}
          contents={data.recommendGenreContents.contents}
        />

        <RecommendationSection
          customHeader={
            <>
              <img
                src={data.recommendCuration.userProfile}
                alt="프로필"
                className="w-4 h-4 rounded-full"
              />
              <span className="text-pink-400">
                {data.recommendCuration.userName}의 추천
              </span>
              <span className="font-semibold">
                {data.recommendCuration.curationTitle}
              </span>
            </>
          }
          contents={data.recommendCuration.contents}
        />
      </div>
    </main>
  );
};
export default HomeContentLayout;
