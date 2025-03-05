import { type Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import React, { useEffect } from "react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface Props<TData> {
  table: Table<TData>;
  actions: {
    onClick: () => void;
    icon: React.ReactNode;
    tooltip: string;
  }[];
}

export function DataTableFloatingBar<TData>({ table, actions }: Props<TData>) {
  const rows = table.getFilteredSelectedRowModel().rows;

  // Clear selection on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
      <div className="w-full overflow-x-auto">
        <div className="bg-card mx-auto flex w-fit items-center gap-2 rounded-md border p-2 shadow-2xl">
          <div className="flex h-7 items-center rounded-md border border-dashed pr-1 pl-2.5">
            <span className="text-xs whitespace-nowrap">
              {rows.length} selected
            </span>
            <Separator orientation="vertical" className="mr-1 ml-2" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 hover:border"
                    onClick={() => table.toggleAllRowsSelected(false)}
                  >
                    <XIcon className="size-3.5 shrink-0" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-accent text-foreground flex items-center border px-2 py-1 font-semibold dark:bg-zinc-900">
                  <p className="mr-2">Clear selection</p>
                  {/* <Kbd abbrTitle="Escape" variant="outline"> */}
                  Esc
                  {/* </Kbd> */}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            {actions.map((action) => (
              <TooltipProvider key={action.tooltip}>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 border"
                      onClick={action.onClick}
                    >
                      {action.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-accent text-foreground border font-semibold dark:bg-zinc-900">
                    <p>{action.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
