import { useMutation } from "@tanstack/react-query";
import patchUserRole from "@/apis/admin/patchUserRole";

const usePatchUserRoleMutation = () => {
  const patchUserRoleMutation = useMutation({
    mutationFn: patchUserRole,
  });

  return {
    mutateUserRole: patchUserRoleMutation.mutate,
  };
};

export default usePatchUserRoleMutation;
