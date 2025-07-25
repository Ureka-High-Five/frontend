import useCurationDetailQuery from "@/hooks/queries/curation/useCurationDetailQuery";

interface CurationDetailListProps {
  curationId: number;
}

const CurationDetailList = ({ curationId }: CurationDetailListProps) => {
  const { curationDetail } = useCurationDetailQuery(curationId);

  return (
    <ul className="flex flex-col gap-8 px-4">
      {curationDetail?.contents.map((item) => (
        <li key={item.id} className="flex gap-4">
          <img
            src={item.thumbnailUrl}
            alt={item.thumbnailUrl}
            className="aspect-[3/2] w-[25%] min-w-[100px] rounded-md"
          />
          <span className="text-white body-md-pretendard py-2 whitespace-normal break-words flex-1">
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CurationDetailList;
