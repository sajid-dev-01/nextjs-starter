import { useQuery } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";

export const useListSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data, error } = await authClient.listSessions();
      if (error) throw error;
      return data;
    },
  });
};
