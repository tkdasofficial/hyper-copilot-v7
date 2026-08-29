import { useState } from "react";
import {
  Bell,
  Search,
  Zap,
  ArrowLeft,
  Menu,
  X,
  Home,
  ImageIcon,
  Video,
  AudioLines,
  Layers,
  Tag,
} from "lucide-react";
import { useRouterState, useRouter, Link } from "@tanstack/react-router";
import { ProfileMenu } from "./ProfileMenu";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/settings": "Settings",
  "/pricing": "Pricing",
  "/terms": "Terms of Service",
  "/privacy": "Privacy Policy",
};

const drawerGenerate = [
  { label: "Image", icon: ImageIcon },
  { label: "Video", icon: Video },
  { label: "Audio", icon: AudioLines },
];

function DrawerLink({
  icon: Icon,
  label,
  to,
  onNavigate,
  disabled,
}: {
  icon: typeof Home;
  label: string;
  to?: string;
  onNavigate: () => void;
  disabled?: boolean;
}) {
  const cls = cn(
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
    disabled
      ? "cursor-default text-muted-foreground/60"
      : "text-muted-foreground hover:bg-surface hover:text-foreground",
  );
  if (!to || disabled) {
    return (
      <button type="button" className={cls}>
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
        {label}
      </button>
    );
  }
  return (
    <Link to={to} onClick={onNavigate} className={cls}>
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
      {label}
    </Link>
  );
}

export function TopBar() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = pageTitles[pathname.replace(/\/$/, "") || "/"];

  if (title) {
    return (
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Back"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
              else router.navigate({ to: "/" });
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>

          <h1 className="truncate text-[15px] font-bold tracking-[-0.02em]">{title}</h1>
        </div>

        <ProfileMenu />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl lg:px-8">
      <div className="lg:hidden">
        <Logo />
      </div>

      <div className="ml-auto hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-muted-foreground lg:flex lg:max-w-md">
        <Search className="h-4 w-4 shrink-0" strokeWidth={1.8} />
        <input
          aria-label="Search prompts, models and boards"
          placeholder="Search prompts, models and boards"
          className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <span className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-semibold sm:flex">
          <Zap className="h-3.5 w-3.5 text-spectral-1" strokeWidth={2.2} />
          1,280
          <span className="text-muted-foreground">credits</span>
        </span>
        <button
          type="button"
          aria-label="Notifications"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}
