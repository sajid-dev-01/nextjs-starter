import { SearchParams } from "nuqs";
import { Suspense } from "react";

import { DataTableSkeleton } from "~/components/data-table/data-table-skeleton";
import { UsersTable } from "~/features/users/components/users-table";
import { searchParamsCache } from "~/features/users/schemas";
import {
  getUserRoleCounts,
  getUsers,
} from "~/features/users/server/repository";
import { getValidFilters } from "~/lib/data-table";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function UsersPage(props: Props) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getUsers({ ...search, filters: validFilters }),
    getUserRoleCounts(),
  ]);

  return (
    <div className="grid">
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["4rem", "10rem", "12rem", "12rem", "8rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <UsersTable promises={promises} />
      </Suspense>
    </div>
  );
}
