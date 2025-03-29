import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";
import { queryClient } from "~/lib/query-client";

interface Input {
  userId: string;
  banReason?: string;
  banExpiresIn?: number;
}

export const useUnbanUser = () => {
  return useMutation({
    mutationFn: async (input: Input) => {
      const { data, error } = await authClient.admin.unbanUser(input);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
