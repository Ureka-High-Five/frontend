import ContentCard from "@/components/Home/atom/ContentCard";
import type { RecommendContent } from "@/types/RecommendContentsResponse";

interface RecommendationSectionProps {
  title?: string;
  customHeader?: React.ReactNode;
  contents: RecommendContent[];
}

const RecommendationSection = ({
  title,
  customHeader,
  contents,
}: RecommendationSectionProps) => {
  return (
    <section className="mt-6">
      {customHeader ? (
        <div className="flex items-center gap-2 heading-h2-pretendard mb-2">
          {customHeader}
        </div>
      ) : (
        <h2 className="heading-h2-pretendard mb-2">{title}</h2>
      )}

      <ul className="flex overflow-x-auto gap-2 no-scrollbar">
        {contents.map((content) => (
          <li key={content.contentId} className="flex-shrink-0 w-[100px]">
            <ContentCard thumbnailUrl={content.thumbnailUrl} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecommendationSection;
