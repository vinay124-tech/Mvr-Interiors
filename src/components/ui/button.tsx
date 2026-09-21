import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export function Button({ className, variant = "solid", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-6 text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}