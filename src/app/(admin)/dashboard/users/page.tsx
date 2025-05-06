import { type SearchParams } from "nuqs";

import { UsersTable } from "~/features/users/components/users-table";
import { userSearchParamsCache } from "~/features/users/schemas";
import { getValidFilters } from "~/lib/data-table";

export const metadata = {
  title: "Users | Dashboard",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function UsersPage(props: Props) {
  const searchParams = await props.searchParams;
  const search = userSearchParamsCache.parse(searchParams);
  const validFilters = getValidFilters(search.filters);

  return (
    <div className="grid">
      <UsersTable query={{ ...search, filters: validFilters }} />
    </div>
  );
}
