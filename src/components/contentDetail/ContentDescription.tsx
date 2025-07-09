import type { Content } from "@/types/content";

type ContentDescriptionProps = Pick<
  Content,
  "contentDescription" | "actors" | "director" | "openDate"
>;

const ContentDescription = ({
  contentDescription,
  actors,
  director,
  openDate,
}: ContentDescriptionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-white body-md-pretendard">{contentDescription}</p>
      <ul className="text-custom-gray body-sm-pretendard">
        <li>감독: {director}</li>
        <li>배우: {actors.join(", ")}</li>
        <li>개봉일: {openDate}</li>
      </ul>
    </section>
  );
};

export default ContentDescription;
