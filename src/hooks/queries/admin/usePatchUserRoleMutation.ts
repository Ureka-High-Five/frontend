import { useMutation } from "@tanstack/react-query";
import patchUserRole from "@/apis/admin/patchUserRole";

const usePatchUserRoleMutation = () => {
  const { mutate: mutateUserRole } = useMutation({
    mutationFn: patchUserRole,
  });

  return {
    mutateUserRole,
  };
};

export default usePatchUserRoleMutation;
