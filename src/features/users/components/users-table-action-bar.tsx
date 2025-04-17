"use client";

import type { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";
import * as React from "react";

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "~/components/data-table/data-table-action-bar";
import { Separator } from "~/components/ui/separator";
import { exportTableToCSV } from "~/lib/data-table/export";

const actions = ["update-status", "export", "delete"] as const;

type Action = (typeof actions)[number];

interface UsersTableActionBarProps {
  table: Table<User>;
}

export function UsersTableActionBar({ table }: UsersTableActionBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;
  const [isPending, startTransition] = React.useTransition();
  const [currentAction, setCurrentAction] = React.useState<Action | null>(null);

  const getIsActionPending = React.useCallback(
    (action: Action) => isPending && currentAction === action,
    [isPending, currentAction]
  );

  // const onUserUpdate = React.useCallback(
  //   ({
  //     field,
  //     value,
  //   }: {
  //     field: "status" | "priority";
  //     value: User["status"] | User["priority"];
  //   }) => {
  //     setCurrentAction(
  //       field === "status" ? "update-status" : "update-priority"
  //     );
  //     startTransition(async () => {
  //       const { error } = await updateUsers({
  //         ids: rows.map((row) => row.original.id),
  //         [field]: value,
  //       });
  //
  //       if (error) {
  //         toast.error(error);
  //         return;
  //       }
  //       toast.success("Users updated");
  //     });
  //   },
  //   [rows]
  // );

  const onUserExport = React.useCallback(() => {
    setCurrentAction("export");
    startTransition(() => {
      exportTableToCSV(table, {
        excludeColumns: ["select", "actions"],
        onlySelected: true,
      });
    });
  }, [table]);

  // const onUserDelete = React.useCallback(() => {
  //   setCurrentAction("delete");
  //   startTransition(async () => {
  //     const { error } = await deleteUsers({
  //       ids: rows.map((row) => row.original.id),
  //     });
  //
  //     if (error) {
  //       toast.error(error);
  //       return;
  //     }
  //     table.toggleAllRowsSelected(false);
  //   });
  // }, [rows, table]);

  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5">
        {/* <Select */}
        {/*   onValueChange={(value: User["status"]) => */}
        {/*     onUserUpdate({ field: "status", value }) */}
        {/*   } */}
        {/* > */}
        {/*   <SelectTrigger asChild> */}
        {/*     <DataTableActionBarAction */}
        {/*       size="icon" */}
        {/*       tooltip="Update status" */}
        {/*       isPending={getIsActionPending("update-status")} */}
        {/*     > */}
        {/*       <CheckCircle2 /> */}
        {/*     </DataTableActionBarAction> */}
        {/*   </SelectTrigger> */}
        {/*   <SelectContent align="center"> */}
        {/*     <SelectGroup> */}
        {/*       {users.status.enumValues.map((status) => ( */}
        {/*         <SelectItem key={status} value={status} className="capitalize"> */}
        {/*           {status} */}
        {/*         </SelectItem> */}
        {/*       ))} */}
        {/*     </SelectGroup> */}
        {/*   </SelectContent> */}
        {/* </Select> */}
        {/* <Select */}
        {/*   onValueChange={(value: User["priority"]) => */}
        {/*     onUserUpdate({ field: "priority", value }) */}
        {/*   } */}
        {/* > */}
        {/*   <SelectTrigger asChild> */}
        {/*     <DataTableActionBarAction */}
        {/*       size="icon" */}
        {/*       tooltip="Update priority" */}
        {/*       isPending={getIsActionPending("update-priority")} */}
        {/*     > */}
        {/*       <ArrowUp /> */}
        {/*     </DataTableActionBarAction> */}
        {/*   </SelectTrigger> */}
        {/*   <SelectContent align="center"> */}
        {/*     <SelectGroup> */}
        {/*       {users.priority.enumValues.map((priority) => ( */}
        {/*         <SelectItem */}
        {/*           key={priority} */}
        {/*           value={priority} */}
        {/*           className="capitalize" */}
        {/*         > */}
        {/*           {priority} */}
        {/*         </SelectItem> */}
        {/*       ))} */}
        {/*     </SelectGroup> */}
        {/*   </SelectContent> */}
        {/* </Select> */}
        <DataTableActionBarAction
          size="icon"
          tooltip="Export users"
          isPending={getIsActionPending("export")}
          onClick={onUserExport}
        >
          <Download />
        </DataTableActionBarAction>
        {/* <DataTableActionBarAction */}
        {/*   size="icon" */}
        {/*   tooltip="Delete users" */}
        {/*   isPending={getIsActionPending("delete")} */}
        {/*   onClick={onUserDelete} */}
        {/* > */}
        {/*   <Trash2 /> */}
        {/* </DataTableActionBarAction> */}
      </div>
    </DataTableActionBar>
  );
}
