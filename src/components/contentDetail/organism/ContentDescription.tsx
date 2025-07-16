import type { Content } from "@/types/content";

type ContentDescriptionProps = Pick<
  Content,
  "contentDescription" | "actors" | "director" | "openYear"
>;

const ContentDescription = ({
  contentDescription,
  actors,
  director,
  openYear,
}: ContentDescriptionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-white body-md-pretendard">{contentDescription}</p>
      <ul className="text-custom-gray body-sm-pretendard">
        <li>감독: {director}</li>
        <li>배우: {actors.join(", ")}</li>
        <li>개봉: {openYear}</li>
      </ul>
    </section>
  );
};

export default ContentDescription;
