import type { Table } from "@tanstack/react-table";
import { Download, Loader, X } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Kbd } from "~/components/ui-ext/kbd";
import { Portal } from "~/components/ui-ext/portal";
import { exportTableToCSV } from "~/lib/data-table/export";

interface UsersTableFloatingBarProps {
  table: Table<User>;
}

export function UsersTableFloatingBar({ table }: UsersTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;

  const [isPending, startTransition] = React.useTransition();
  const [action, setAction] = React.useState<"update-status" | "export">();

  // Clear selection on Escape key press
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  return (
    <Portal>
      <div className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit px-2.5">
        <div className="w-full overflow-x-auto">
          <div className="bg-background text-foreground mx-auto flex w-fit items-center gap-2 rounded-md border p-2 shadow-sm">
            <div className="flex h-7 items-center rounded-md border border-dashed pr-1 pl-2.5">
              <span className="text-xs whitespace-nowrap">
                {rows.length} selected
              </span>
              <Separator orientation="vertical" className="mr-1 ml-2" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 hover:border"
                    onClick={() => table.toggleAllRowsSelected(false)}
                  >
                    <X className="size-3.5 shrink-0" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-accent text-foreground flex items-center border px-2 py-1 font-semibold dark:bg-zinc-900">
                  <p className="mr-2">Clear selection</p>
                  <Kbd abbrTitle="Escape" variant="outline">
                    Esc
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <div className="flex items-center gap-1.5">
              {/* <Select */}
              {/*   onValueChange={(value: User["status"]) => { */}
              {/*     setAction("update-status"); */}
              {/**/}
              {/*     startTransition(async () => { */}
              {/*       const { error } = await updateUsers({ */}
              {/*         ids: rows.map((row) => row.original.id), */}
              {/*         status: value, */}
              {/*       }); */}
              {/**/}
              {/*       if (error) { */}
              {/*         toast.error(error); */}
              {/*         return; */}
              {/*       } */}
              {/**/}
              {/*       toast.success("Users updated"); */}
              {/*     }); */}
              {/*   }} */}
              {/* > */}
              {/*   <Tooltip> */}
              {/*     <SelectTrigger asChild> */}
              {/*       <TooltipTrigger asChild> */}
              {/*         <Button */}
              {/*           variant="secondary" */}
              {/*           size="icon" */}
              {/*           className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground" */}
              {/*           disabled={isPending} */}
              {/*         > */}
              {/*           {isPending && action === "update-status" ? ( */}
              {/*             <Loader */}
              {/*               className="size-3.5 animate-spin" */}
              {/*               aria-hidden="true" */}
              {/*             /> */}
              {/*           ) : ( */}
              {/*             <CheckCircle2 */}
              {/*               className="size-3.5" */}
              {/*               aria-hidden="true" */}
              {/*             /> */}
              {/*           )} */}
              {/*         </Button> */}
              {/*       </TooltipTrigger> */}
              {/*     </SelectTrigger> */}
              {/*     <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900"> */}
              {/*       <p>Update status</p> */}
              {/*     </TooltipContent> */}
              {/*   </Tooltip> */}
              {/*   <SelectContent align="center"> */}
              {/*     <SelectGroup> */}
              {/*       {users.status.enumValues.map((status) => ( */}
              {/*         <SelectItem */}
              {/*           key={status} */}
              {/*           value={status} */}
              {/*           className="capitalize" */}
              {/*         > */}
              {/*           {status} */}
              {/*         </SelectItem> */}
              {/*       ))} */}
              {/*     </SelectGroup> */}
              {/*   </SelectContent> */}
              {/* </Select> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => {
                      setAction("export");

                      startTransition(() => {
                        exportTableToCSV(table, {
                          excludeColumns: ["select", "actions"],
                          onlySelected: true,
                        });
                      });
                    }}
                    disabled={isPending}
                  >
                    {isPending && action === "export" ? (
                      <Loader
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Download className="size-3.5" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-accent text-foreground border font-semibold dark:bg-zinc-900">
                  <p>Export users</p>
                </TooltipContent>
              </Tooltip>
              {/* <Tooltip> */}
              {/*   <TooltipTrigger asChild> */}
              {/*     <Button */}
              {/*       variant="secondary" */}
              {/*       size="icon" */}
              {/*       className="size-7 border" */}
              {/*       onClick={() => { */}
              {/*         setAction("delete"); */}
              {/**/}
              {/*         startTransition(async () => { */}
              {/*           const { error } = await deleteUsers({ */}
              {/*             ids: rows.map((row) => row.original.id), */}
              {/*           }); */}
              {/**/}
              {/*           if (error) { */}
              {/*             toast.error(error); */}
              {/*             return; */}
              {/*           } */}
              {/**/}
              {/*           table.toggleAllRowsSelected(false); */}
              {/*         }); */}
              {/*       }} */}
              {/*       disabled={isPending} */}
              {/*     > */}
              {/*       {isPending && action === "delete" ? ( */}
              {/*         <Loader */}
              {/*           className="size-3.5 animate-spin" */}
              {/*           aria-hidden="true" */}
              {/*         /> */}
              {/*       ) : ( */}
              {/*         <Trash2 className="size-3.5" aria-hidden="true" /> */}
              {/*       )} */}
              {/*     </Button> */}
              {/*   </TooltipTrigger> */}
              {/*   <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900"> */}
              {/*     <p>Delete users</p> */}
              {/*   </TooltipContent> */}
              {/* </Tooltip> */}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
