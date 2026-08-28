import logoDark from "@/assets/hyper-logo-dark.svg.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logoDark.url}
        alt="Hyper Copilot logo"
        width={28}
        height={28}
        className="h-7 w-7 rounded-md"
      />
      <span className="text-[15px] font-extrabold tracking-tight">Hyper Copilot</span>
    </span>
  );
}
