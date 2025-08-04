import { useSuspenseQuery } from "@tanstack/react-query";
import getUserInformation from "@/apis/user/getUserInformation";
import type { UserInformation } from "@/types/user";

const useUserInformationQuery = () => {
  const { data: userInformation } = useSuspenseQuery<UserInformation>({
    queryKey: ["userInformation"],
    queryFn: () => getUserInformation(),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return { userInformation };
};

export default useUserInformationQuery;
