"use client";

import type { Table } from "@tanstack/react-table";

interface UsersTableToolbarActionsProps {
  table: Table<User>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* <CreateUserSheet /> */}
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
