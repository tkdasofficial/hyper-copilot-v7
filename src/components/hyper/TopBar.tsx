import { Bell, Search, Zap } from "lucide-react";
import { Logo } from "./Logo";
import { ProfileMenu } from "./ProfileMenu";


export function TopBar() {
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
