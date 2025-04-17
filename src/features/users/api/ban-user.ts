import { useMutation } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";
import { api } from "~/trpc/react";

interface Input {
  userId: string;
  banReason?: string;
  banExpiresIn?: number;
}

export const useBanUser = () => {
  const utils = api.useUtils();
  return useMutation({
    mutationFn: async (input: Input) => {
      const { data, error } = await authClient.admin.banUser({
        userId: input.userId,
        banReason: input.banReason,
        banExpiresIn: input.banExpiresIn,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      utils.user.list.invalidate();
    },
  });
};
