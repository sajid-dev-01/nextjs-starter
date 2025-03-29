"use client";

import { DownloadIcon, ImportIcon } from "lucide-react";
import { use, useMemo, useState } from "react";

import { DataTable } from "~/components/data-table/data-table";
import { DataTableSortList } from "~/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "~/components/data-table/data-table-toolbar";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Heading } from "~/components/ui-ext/heading";
import { useDataTable } from "~/hooks/use-data-table";
import { exportTableToCSV } from "~/lib/data-table/export";
import { DataTableRowAction } from "~/lib/data-table/types";

import { getUserRoleCounts, getUsers } from "../server/repository";
import { CreateUserModal } from "./create-user-modal";
import { UpdateUserModal } from "./update-user-modal";
import { UsersTableActionBar } from "./users-table-action-bar";
import { getColumns } from "./users-table-column";

interface Props {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getUsers>>,
      Awaited<ReturnType<typeof getUserRoleCounts>>,
    ]
  >;
}

export function UsersTable({ promises }: Props) {
  const [{ data, pageCount }, roleCounts] = use(promises);

  const [rowAction, setRowAction] = useState<DataTableRowAction<User> | null>(
    null
  );

  const columns = useMemo(
    () => getColumns({ setRowAction, roleCounts }),
    [roleCounts]
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <ScrollArea className="overflow-x-auto pb-3 whitespace-nowrap">
        <div className="flex flex-nowrap items-center justify-between gap-2">
          <Heading tag="h4">Users ({data.length})</Heading>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportTableToCSV(table, {
                  filename: "users",
                  excludeColumns: ["select", "actions"],
                })
              }
            >
              <DownloadIcon className="size-4" aria-hidden="true" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ImportIcon className="size-4" aria-hidden="true" />
              Import
            </Button>
            <CreateUserModal />
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="mb-4" />
      <DataTable
        table={table}
        actionBar={<UsersTableActionBar table={table} />}
      >
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} align="end" />
        </DataTableToolbar>
      </DataTable>
      {rowAction?.row.original && (
        <UpdateUserModal
          open={rowAction?.variant === "update"}
          onOpenChange={() => setRowAction(null)}
          user={rowAction.row.original}
        />
      )}
    </>
  );
}
