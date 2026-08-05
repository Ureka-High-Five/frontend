import patchUserRole from "@lead-me/api/admin/patchUserRole";
import { useMutation } from "@tanstack/react-query";

const usePatchUserRoleMutation = () => {
  const { mutate: mutateUserRole } = useMutation({
    mutationFn: patchUserRole,
  });

  return {
    mutateUserRole,
  };
};

export default usePatchUserRoleMutation;
