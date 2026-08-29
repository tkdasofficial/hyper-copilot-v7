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
  Download,
  MoreHorizontal,
  Share2,
  CopyPlus,
  Flag,
} from "lucide-react";
import { useRouterState, useRouter, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProfileMenu } from "./ProfileMenu";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/image": "Image Studio",
  "/video": "Video Studio",
  "/audio": "Audio Studio",
  "/boards": "Boards",
  "/settings": "Settings",
  "/pricing": "Pricing",
  "/terms": "Terms of Service",
  "/privacy": "Privacy Policy",
};

const studioPages = new Set(["/image", "/video", "/audio"]);

const drawerGenerate = [
  { label: "Image", icon: ImageIcon, to: "/image" },
  { label: "Video", icon: Video, to: "/video" },
  { label: "Audio", icon: AudioLines, to: "/audio" },
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

function StudioActions() {
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: "Share",
      icon: Share2,
      action: () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          void navigator.clipboard.writeText(window.location.href);
        }
        toast.success("Link copied to clipboard");
      },
    },
    { label: "Duplicate session", icon: CopyPlus, action: () => toast.info("Session duplicated.") },
    { label: "Report an issue", icon: Flag, action: () => toast.info("Thanks — we'll take a look.") },
  ];
  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        aria-label="Download"
        onClick={() => toast.info("Nothing to download yet — generate first.")}
        className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90"
      >
        <Download className="h-4 w-4" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="More options"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-11 z-50 w-48 rounded-2xl border border-border bg-background p-1.5 shadow-2xl">
            {items.map((i) => (
              <button
                key={i.label}
                type="button"
                onClick={() => {
                  setOpen(false);
                  i.action();
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              >
                <i.icon className="h-4 w-4" strokeWidth={1.8} />
                {i.label}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function TopBar() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const key = pathname.replace(/\/$/, "") || "/";
  const title = pageTitles[key];
  const [menuOpen, setMenuOpen] = useState(false);

  const drawer = menuOpen ? (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={() => setMenuOpen(false)}
      />
      <div className="absolute inset-y-0 left-0 flex w-[280px] flex-col border-r border-border bg-background px-3 py-4 shadow-2xl">
        <div className="flex items-center justify-between px-2 pb-3">
          <span className="text-[15px] font-extrabold tracking-[-0.02em]">Hyper Copilot</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto pt-2">
          <DrawerLink icon={Home} label="Home" to="/" onNavigate={() => setMenuOpen(false)} />
          <p className="px-3 pb-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70">
            Generate
          </p>
          {drawerGenerate.map((i) => (
            <DrawerLink key={i.label} icon={i.icon} label={i.label} to={i.to} onNavigate={() => setMenuOpen(false)} />
          ))}
          <p className="px-3 pb-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70">
            Workspace
          </p>
          <DrawerLink icon={Layers} label="Boards" to="/boards" onNavigate={() => setMenuOpen(false)} />
          <p className="px-3 pb-1.5 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70">
            Company
          </p>
          <DrawerLink icon={Tag} label="Pricing" to="/pricing" onNavigate={() => setMenuOpen(false)} />
        </nav>
      </div>
    </div>
  ) : null;

  if (title) {
    return (
      <>
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

          <div className="flex items-center gap-2">
            {studioPages.has(key) ? <StudioActions /> : null}
            <ProfileMenu />
          </div>
        </header>
        {drawer}
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl lg:px-8">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2"
          >
            <Menu className="h-4.5 w-4.5" strokeWidth={2} />
          </button>
          <span className="text-[15px] font-extrabold tracking-[-0.02em]">Hyper Copilot</span>
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
      {drawer}
    </>
  );
}
