"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  CalendarIcon,
  CircleDashedIcon,
  EllipsisIcon,
  TextIcon,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useConfirm } from "~/components/ui-ext/alert";
import { ROLES } from "~/constants";
import { authClient } from "~/lib/auth-client";
import { type DataTableRowAction } from "~/lib/data-table/types";
import { formatDate } from "~/lib/helpers";
import { api } from "~/trpc/react";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<User> | null>
  >;
  roleCounts?: Record<"admin" | "user", number>;
}

export function getColumns({
  setRowAction,
  roleCounts,
}: GetColumnsProps): ColumnDef<User>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      meta: {
        label: "Name",
        placeholder: "Search names...",
        variant: "text",
        icon: TextIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
      meta: {
        label: "Role",
        variant: "multiSelect",
        options: ROLES.map((role) => ({
          label: role.charAt(0).toUpperCase() + role.slice(1),
          value: role,
          count: roleCounts?.[role],
        })),
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <Badge variant={row.original.banned ? "destructive" : "secondary"}>
          {row.original.banned ? "Banned" : "Active"}
        </Badge>
      ),
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value === row.getValue(id);
      },
      meta: {
        label: "Status",
        variant: "multiSelect",
        options: ["banned", "active"].map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
        })),
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: "Created At",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const confirm = useConfirm();
        const utils = api.useUtils();
        const { mutateAsync: banUser } = api.user.ban.useMutation({
          onSuccess: () => {
            utils.user.list.invalidate();
          },
        });
        const { mutateAsync: unbanUser } = api.user.unban.useMutation({
          onSuccess: () => {
            utils.user.list.invalidate();
          },
        });
        const { mutateAsync: removeUser } = api.user.remove.useMutation({
          onSuccess: () => {
            utils.user.list.invalidate();
          },
        });

        async function handleDelete() {
          const ok = await confirm({
            title: "Are you sure to delete?",
            actionButtonVariant: "destructive",
          });
          if (!ok) return;
          toast.promise(removeUser({ userId: row.original.id }), {
            loading: "Removing...",
            success: "User removed",
            error: (err) => err.message,
          });
        }

        async function handleRoleUpdate(value: string) {
          if (value === row.original.role) return;
          toast.promise(
            authClient.admin.setRole({
              role: value,
              userId: row.original.id,
            }),
            {
              loading: "Updating...",
              success: "Role updated",
              error: (err) => err,
            }
          );
        }

        async function handleBanUser() {
          const ok = await confirm({
            title: "Are you sure to ban?",
            actionButtonVariant: "destructive",
          });
          if (!ok) return;
          toast.promise(banUser({ userId: row.original.id }), {
            loading: "Updating...",
            success: "User banned",
            error: (err) => err.message,
          });
        }

        async function handleUnbanUser() {
          const ok = await confirm({
            title: "Are you sure to unban?",
            actionButtonVariant: "destructive",
          });
          if (!ok) return;
          toast.promise(unbanUser({ userId: row.original.id }), {
            loading: "Updating...",
            success: "User unbanned",
            error: (err) => err.message,
          });
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="data-[state=open]:bg-muted flex size-8 p-0"
              >
                <EllipsisIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, variant: "update" })}
              >
                Edit
              </DropdownMenuItem>
              {row.original.banned ? (
                <DropdownMenuItem onSelect={handleUnbanUser}>
                  Unban
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onSelect={handleBanUser}>
                  Ban
                </DropdownMenuItem>
              )}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Roles</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={row.original.role || "user"}
                    onValueChange={handleRoleUpdate}
                  >
                    {ROLES.map((label) => (
                      <DropdownMenuRadioItem
                        key={label}
                        value={label}
                        className="capitalize"
                      >
                        {label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleDelete}>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
