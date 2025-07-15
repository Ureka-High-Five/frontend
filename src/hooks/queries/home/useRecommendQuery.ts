import { useQuery } from "@tanstack/react-query";
import { getRecommendContents } from "@/apis/home/getRecommendContents";

export const useRecommendQuery = () => {
  return useQuery({
    queryKey: ["RecommendContents"],
    queryFn: getRecommendContents,
    retry: false,
  });
};