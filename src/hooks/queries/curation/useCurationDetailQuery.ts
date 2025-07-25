import { useQuery } from "@tanstack/react-query";
import getCurationDetail from "@/apis/my/curation/getCurationDetail";
import type { CurationDetailResponse } from "@/types/curation";

const useCurationDetailQuery = (curationId: number) => {
  const { data: curationDetail } = useQuery<CurationDetailResponse>({
    queryKey: ["curationDetail", curationId],
    queryFn: () => getCurationDetail(curationId),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: !!curationId,
  });

  return { curationDetail };
};

export default useCurationDetailQuery;
