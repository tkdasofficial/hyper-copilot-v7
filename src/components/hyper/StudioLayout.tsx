import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

export type StudioFeature = { id: string; label: string; icon: LucideIcon };

export function StudioLayout({
  features,
  active,
  onSelect,
  children,
}: {
  features: StudioFeature[];
  active: string;
  onSelect: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      <Sidebar />
      <div className="lg:pl-[248px]">
        <TopBar />
        <main className="mx-auto max-w-4xl px-4 pb-32 pt-6 lg:px-8">{children}</main>
      </div>

      <nav
        aria-label="Studio features"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl lg:pl-[248px]"
      >
        <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-3 py-2 [&::-webkit-scrollbar]:hidden">
          {features.map((f) => {
            const Icon = f.icon;
            const on = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-current={on ? "true" : undefined}
                onClick={() => {
                  onSelect(f.id);
                  if (typeof document !== "undefined") {
                    document.getElementById(`sec-${f.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className={cn(
                  "flex min-w-[72px] shrink-0 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10.5px] font-bold transition-colors",
                  on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                {f.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
