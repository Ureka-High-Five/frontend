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
            className="w-[100px] h-[150px] rounded-md"
          />
          <div className="flex flex-col flex-1 text-white py-1 gap-2 text-left">
            <p className="body-lg-pretendard break-words">{item.title}</p>
            <p className="body-md-pretendard break-words">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurationDetailList;
