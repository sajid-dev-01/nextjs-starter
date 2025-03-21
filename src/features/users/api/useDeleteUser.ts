import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";
import { queryClient } from "~/lib/query-client";

interface Input {
  userId: string;
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async ({ userId }: Input) => {
      const { data, error } = await authClient.admin.removeUser({ userId });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
