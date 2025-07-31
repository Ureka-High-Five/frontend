import { useQuery } from "@tanstack/react-query";
import { getShortsById } from "@/apis/shorts/getShortsById";

export const useShortsByIdQuery = (
  shortsId: string,
  options?: { enabled?: boolean }
) => {
  const {
    data: shorts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shortsById", shortsId],
    queryFn: () => getShortsById(shortsId),
    enabled: options?.enabled ?? !!shortsId,
  });

  return { shorts, isLoading, error };
};
