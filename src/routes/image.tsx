import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ImageIcon, Layers, Palette, Ratio, Settings2, Sparkles, Wand2 } from "lucide-react";
import { StudioLayout, type StudioFeature } from "@/components/hyper/StudioLayout";
import { Chips, Section, Segment, SliderRow, SwitchRow, TextRow } from "@/components/hyper/StudioControls";

export const Route = createFileRoute("/image")({
  head: () => ({
    meta: [
      { title: "Image Studio — Advanced AI Image Generation | Hyper Copilot" },
      {
        name: "description",
        content:
          "Generate photoreal images with full control: models, aspect ratios, HEAVEN style, references, palette locks, sampling and upscaling in Hyper Copilot's Image Studio.",
      },
      { property: "og:title", content: "Image Studio — Advanced AI Image Generation" },
      {
        property: "og:description",
        content: "Model, ratio, style, reference and sampling controls for production-grade AI images.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImageStudio,
});

const features: StudioFeature[] = [
  { id: "prompt", label: "Prompt", icon: Wand2 },
  { id: "model", label: "Model", icon: Sparkles },
  { id: "canvas", label: "Canvas", icon: Ratio },
  { id: "style", label: "Style", icon: Palette },
  { id: "reference", label: "Reference", icon: Layers },
  { id: "sampling", label: "Sampling", icon: Settings2 },
  { id: "output", label: "Output", icon: ImageIcon },
];

const models = ["Hyper Image 4", "Hyper Image 4 Turbo", "Hyper Realism", "Hyper Vector"] as const;
const ratios = ["1:1", "4:5", "3:2", "16:9", "9:16", "21:9", "2:3", "3:4", "5:4"] as const;
const resolutions = ["1K", "2K", "4K", "8K"] as const;
const styles = ["HEAVEN", "Photoreal", "Cinematic", "Anime", "3D Render", "Line Art", "Neon Noir"] as const;
const refModes = ["Reference", "Transform", "Composition", "Palette", "Character", "Inpaint", "Depth", "Pose"];
const samplers = ["Balanced", "Creative", "Precise"] as const;

function ImageStudio() {
  const [active, setActive] = useState("prompt");
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [model, setModel] = useState<(typeof models)[number]>(models[0]);
  const [ratio, setRatio] = useState<(typeof ratios)[number]>(ratios[0]);
  const [res, setRes] = useState<(typeof resolutions)[number]>(resolutions[1]);
  const [style, setStyle] = useState<(typeof styles)[number]>(styles[0]);
  const [strength, setStrength] = useState(65);
  const [modes, setModes] = useState<string[]>(["Reference"]);
  const [refWeight, setRefWeight] = useState(50);
  const [sampler, setSampler] = useState<(typeof samplers)[number]>(samplers[0]);
  const [steps, setSteps] = useState(32);
  const [guidance, setGuidance] = useState(7);
  const [count, setCount] = useState(4);
  const [seedLock, setSeedLock] = useState(false);
  const [upscale, setUpscale] = useState(true);
  const [transparent, setTransparent] = useState(false);

  return (
    <StudioLayout features={features} active={active} onSelect={setActive}>
      <div className="space-y-4">
        <div id="sec-prompt">
          <Section title="Prompt" desc="Describe the frame, then refine with the controls below.">
            <TextRow
              label="Prompt"
              value={prompt}
              onChange={setPrompt}
              rows={4}
              placeholder="A chrome heron standing in a flooded cathedral, volumetric light…"
            />
            <TextRow
              label="Negative prompt"
              value={negative}
              onChange={setNegative}
              rows={2}
              placeholder="text, watermark, extra fingers"
            />
            <button
              type="button"
              onClick={() =>
                prompt.trim()
                  ? toast.success(`Queued ${count} render${count === 1 ? "" : "s"}`, {
                      description: `${model} · ${ratio} · ${res} · ${style}`,
                    })
                  : toast.error("Describe what you want to create first.")
              }
              className="w-full rounded-full bg-primary py-3 text-[13.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Generate
            </button>
          </Section>
        </div>

        <div id="sec-model">
          <Section title="Model" desc="Generative models you connect appear here.">
            <Segment options={models} value={model} onChange={setModel} />
          </Section>
        </div>

        <div id="sec-canvas">
          <Section title="Canvas" desc="Aspect ratio and output resolution.">
            <Segment label="Aspect ratio" options={ratios} value={ratio} onChange={setRatio} />
            <Segment label="Resolution" options={resolutions} value={res} onChange={setRes} />
          </Section>
        </div>

        <div id="sec-style">
          <Section title="Style" desc="HEAVEN is Hyper Copilot's signature spinal style.">
            <Segment options={styles} value={style} onChange={setStyle} />
            <SliderRow label="Style strength" value={strength} onChange={setStrength} suffix="%" />
          </Section>
        </div>

        <div id="sec-reference">
          <Section title="Reference & advanced" desc="Combine any number of guidance modes.">
            <Chips
              options={refModes}
              values={modes}
              onToggle={(v) =>
                setModes((m) => (m.includes(v) ? m.filter((x) => x !== v) : [...m, v]))
              }
            />
            <SliderRow label="Reference influence" value={refWeight} onChange={setRefWeight} suffix="%" />
          </Section>
        </div>

        <div id="sec-sampling">
          <Section title="Sampling" desc="Control fidelity versus creativity.">
            <Segment label="Sampler" options={samplers} value={sampler} onChange={setSampler} />
            <SliderRow label="Steps" value={steps} onChange={setSteps} min={8} max={80} />
            <SliderRow label="Guidance" value={guidance} onChange={setGuidance} min={1} max={20} />
            <SwitchRow
              label="Lock seed"
              desc="Reuse the same seed for repeatable results"
              checked={seedLock}
              onCheckedChange={setSeedLock}
            />
          </Section>
        </div>

        <div id="sec-output">
          <Section title="Output" desc="How renders are delivered.">
            <SliderRow label="Variations" value={count} onChange={setCount} min={1} max={8} />
            <SwitchRow
              label="Auto upscale"
              desc="Detail-preserving super-resolution pass"
              checked={upscale}
              onCheckedChange={setUpscale}
            />
            <SwitchRow
              label="Transparent background"
              desc="Export PNG with alpha"
              checked={transparent}
              onCheckedChange={setTransparent}
            />
          </Section>
        </div>
      </div>
    </StudioLayout>
  );
}
