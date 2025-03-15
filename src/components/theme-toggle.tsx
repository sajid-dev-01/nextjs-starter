"use client";

import { VariantProps } from "class-variance-authority";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "~/lib/utils";

import { Button, buttonVariants } from "./ui/button";

export const ThemeToggle = ({
  className,
  size = "icon",
  variant = "secondary",
  ...rest
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      size={size}
      variant={variant}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn("rounded-full", className)}
      {...rest}
    >
      <Moon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Sun className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
};
