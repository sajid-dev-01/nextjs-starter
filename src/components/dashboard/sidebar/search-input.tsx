"use client";

import { useKBar } from "kbar";
import { Search } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function SearchInput() {
  const { query } = useKBar();
  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        className="bg-background text-muted-foreground relative h-9 w-full justify-start rounded-lg text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={query?.toggle}
      >
        <Search className="mr-2 size-4" />
        Search...
        <kbd className="bg-muted xs:hidden pointer-events-none absolute top-[0.3rem] right-[0.3rem] h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    </div>
  );
}
