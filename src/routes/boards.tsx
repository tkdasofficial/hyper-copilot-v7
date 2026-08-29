import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Layers, Plus, ImageIcon, Video, AudioLines } from "lucide-react";
import { Sidebar } from "@/components/hyper/Sidebar";
import { TopBar } from "@/components/hyper/TopBar";

export const Route = createFileRoute("/boards")({
  head: () => ({
    meta: [
      { title: "Boards — Organize Your Creations | Hyper Copilot" },
      {
        name: "description",
        content: "Collect and organize generated images, videos and audio into boards in Hyper Copilot.",
      },
      { property: "og:title", content: "Boards — Organize Your Creations" },
      { property: "og:description", content: "Collect and organize generated media into boards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BoardsPage,
});

const suggestions = [
  { label: "Image renders", icon: ImageIcon, count: 0 },
  { label: "Video clips", icon: Video, count: 0 },
  { label: "Audio tracks", icon: AudioLines, count: 0 },
];

function BoardsPage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      <Sidebar />
      <div className="lg:pl-[248px]">
        <TopBar />
        <main className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-border-strong bg-surface/40 px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-2">
              <Layers className="h-6 w-6 text-muted-foreground" strokeWidth={1.6} />
            </span>
            <h2 className="mt-4 text-[17px] font-bold tracking-[-0.02em]">No boards yet</h2>
            <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
              Boards collect your generated images, videos and audio in one place. Create your
              first board to start organizing.
            </p>
            <button
              type="button"
              onClick={() => toast.info("Boards sync to your account once sign-in is enabled.")}
              className="mt-5 flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" strokeWidth={2.4} />
              New board
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {suggestions.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface/60 p-4"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2">
                  <s.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{s.label}</p>
                  <p className="text-[11px] text-muted-foreground">{s.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
