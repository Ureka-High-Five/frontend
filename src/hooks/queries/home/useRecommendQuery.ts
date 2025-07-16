import { useQuery } from "@tanstack/react-query";
import { getRecommendContents } from "@/apis/home/getRecommendContents";
import type { RecommendContentsResponse } from "@/types/RecommendContentsResponse";

export const useRecommendQuery = () => {
  const { data: recommendContents, isLoading } = useQuery<RecommendContentsResponse>({
    queryKey: ["RecommendContents"],
    queryFn: getRecommendContents,
    retry: false,
  });
  
  return { recommendContents, isLoading };
};