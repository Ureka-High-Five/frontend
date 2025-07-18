import { useQuery } from "@tanstack/react-query";
import { getShortsById } from "@/apis/shorts/getShortsById";

export const useShortsByIdQuery = (shortsId: string) => {
  const { data: shorts } = useQuery({
    queryKey: ["shortsById", shortsId],
    queryFn: () => getShortsById(shortsId),
    enabled: !!shortsId,
  });

  return shorts;
};
