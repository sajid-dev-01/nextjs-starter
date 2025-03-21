import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "~/lib/auth-client";
import { queryClient } from "~/lib/query-client";

interface Input {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (input: Input) => {
      const { data, error } = await authClient.admin.createUser(input);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
