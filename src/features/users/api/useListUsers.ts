import { useQuery } from "@tanstack/react-query";

import { authClient } from "~/lib/auth-client";

interface Input {
  limit: number;
  offset: number;
  filterField?: string;
  filterOperator?: "lt" | "gt" | "eq" | "ne" | "lte" | "gte";
  filterValue?: string;
  searchField?: "name" | "email";
  searchOperator?: "contains" | "starts_with" | "ends_with";
  searchValue?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export const useListUsers = (query: Input) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({ query });
      if (error) throw error;
      return data;
    },
  });
};
