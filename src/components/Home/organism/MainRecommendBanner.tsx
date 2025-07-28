import type { MainRecommend } from "@/types/RecommendContentsResponse";

interface Props {
  content: MainRecommend;
}

const getFirstTwoSentences = (text: string) => {
  const sentences = text.split(/(?<=\.)\s+/);
  return sentences.slice(0, 2);
};

const MainRecommendBanner = ({ content }: Props) => {
  return (
    <section className="relative w-full max-w-[600px] mx-auto ">
      <img
        src={content.posterUrl}
        alt="메인 포스터"
        className="w-full rounded-xl aspect-square object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/70 to-transparent p-4 rounded-xl gap-3">
        <h2 className="md:body-lg-pretendard whitespace-pre-line body-sm-pretendard text-custom-gray">
          {getFirstTwoSentences(content.description).map((sentence) => (
            <span key={sentence}>
              {sentence}
              <br />
            </span>
          ))}
        </h2>

        <p className="body-sm-pretendard text-custom-gray">
          {content.genre.join(",")}
        </p>
      </div>
    </section>
  );
};

export default MainRecommendBanner;
