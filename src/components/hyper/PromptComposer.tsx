import { useState } from "react";
import {
  ArrowUp,
  AudioLines,
  ChevronDown,
  ImageIcon,
  Layers,
  PenTool,
  Plus,
  Ratio,
  Shuffle,
  Sparkles,
  Video,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modalities = [
  { label: "Image", icon: ImageIcon },
  { label: "Video", icon: Video },
  { label: "Audio", icon: AudioLines },
  { label: "Vector", icon: PenTool },
  { label: "Board", icon: Layers },
];

const suggestions = [
  "a chrome jellyfish drifting through a neon canyon",
  "editorial product shot of a matte black perfume bottle",
  "isometric cyberpunk apartment, warm rim light",
  "hand-drawn botanical vector set, single line",
];

function Chip({
  icon: Icon,
  children,
  caret = true,
}: {
  icon: typeof Ratio;
  children: React.ReactNode;
  caret?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-2/70 px-2.5 py-1.5 text-[12px] font-semibold text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
    >
      <Icon className="h-[15px] w-[15px]" strokeWidth={1.9} />
      <span className="whitespace-nowrap">{children}</span>
      {caret ? <ChevronDown className="h-3.5 w-3.5 opacity-70" strokeWidth={2.2} /> : null}
    </button>
  );
}

export function PromptComposer() {
  const [active, setActive] = useState("Image");
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      {/* Modality switcher */}
      <div className="mx-auto mb-4 flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-surface/70 p-1 backdrop-blur-xl sm:w-fit [&::-webkit-scrollbar]:hidden">
        {modalities.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.label;
          return (
            <button
              key={m.label}
              type="button"
              onClick={() => setActive(m.label)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.9} />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Composer */}
      <div className="ring-spectral shadow-glow rounded-3xl">
        <div className="glass rounded-3xl p-2.5 sm:p-3">
          <div className="flex items-start gap-2.5 px-1.5 pt-1.5">
            <Sparkles className="mt-0.5 h-[18px] w-[18px] shrink-0 text-spectral-2" strokeWidth={2} />
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={2}
              placeholder="Describe the image you want to generate…"
              className="min-h-[52px] w-full resize-none bg-transparent text-[15px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
            />
          </div>

          <div className="mt-2 flex items-end gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                aria-label="Add reference"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface-2/70 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Plus className="h-4 w-4" strokeWidth={2.2} />
              </button>
              <Chip icon={Wand2}>Hyper Image 4</Chip>
              <Chip icon={Ratio}>1:1</Chip>
              <Chip icon={ImageIcon}>Reference</Chip>
              <Chip icon={Shuffle} caret={false}>
                Surprise me
              </Chip>
            </div>

            <button
              type="button"
              aria-label="Generate"
              className="bg-spectral grid h-11 w-11 shrink-0 place-items-center rounded-full text-primary-foreground transition-transform hover:scale-[1.04] active:scale-95"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setValue(s)}
            className="truncate rounded-full border border-border bg-surface/60 px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
