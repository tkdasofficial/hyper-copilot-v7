import type { ReactNode } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function Section({
  title,
  desc,
  children,
  id,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-h`}
      className="scroll-mt-24 rounded-3xl border border-border bg-surface/60 p-4 sm:p-5"
    >
      <h2 id={`${title.replace(/\s+/g, "-").toLowerCase()}-h`} className="text-[14.5px] font-bold">
        {title}
      </h2>
      {desc ? <p className="mt-1 text-[12px] text-muted-foreground">{desc}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function Segment<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      {label ? <p className="mb-2 text-[12px] font-semibold text-muted-foreground">{label}</p> : null}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border bg-background p-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-xl px-3 py-1.5 text-[12.5px] font-semibold transition-colors",
              value === o
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Chips({
  label,
  options,
  values,
  onToggle,
}: {
  label?: string;
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      {label ? <p className="mb-2 text-[12px] font-semibold text-muted-foreground">{label}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = values.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors",
                on
                  ? "border-transparent bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SliderRow({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[12px] font-semibold text-muted-foreground">{label}</p>
        <span className="text-[12px] font-bold tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0] ?? value)}
        aria-label={label}
      />
    </div>
  );
}

export function SwitchRow({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string;
  desc?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-3.5 py-3">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold">{label}</p>
        {desc ? <p className="mt-0.5 text-[11.5px] text-muted-foreground">{desc}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
    </div>
  );
}

export function TextRow({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-semibold text-muted-foreground">{label}</p>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-2xl border border-border bg-background px-3.5 py-3 text-[13px] outline-none placeholder:text-muted-foreground focus-visible:border-border-strong"
      />
    </div>
  );
}
