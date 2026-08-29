import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Clapperboard,
  Film,
  ImageIcon,
  Music2,
  Ratio,
  Settings2,
  Video,
  Wand2,
} from "lucide-react";
import { StudioLayout, type StudioFeature } from "@/components/hyper/StudioLayout";
import { Chips, Section, Segment, SliderRow, SwitchRow, TextRow } from "@/components/hyper/StudioControls";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Studio — Advanced AI Video Generation | Hyper Copilot" },
      {
        name: "description",
        content:
          "Direct AI video with full control: cinematic models, shot types, camera motion, duration, frame interpolation and soundtracks in Hyper Copilot's Video Studio.",
      },
      { property: "og:title", content: "Video Studio — Advanced AI Video Generation" },
      {
        property: "og:description",
        content: "Model, shot, camera, motion and audio controls for production-grade AI video.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoStudio,
});

const features: StudioFeature[] = [
  { id: "prompt", label: "Prompt", icon: Wand2 },
  { id: "model", label: "Model", icon: Clapperboard },
  { id: "shot", label: "Shot", icon: Film },
  { id: "camera", label: "Camera", icon: Video },
  { id: "frames", label: "Frames", icon: ImageIcon },
  { id: "audio", label: "Audio", icon: Music2 },
  { id: "output", label: "Output", icon: Settings2 },
];

const models = ["Hyper Motion 2", "Hyper Motion 2 Turbo", "Hyper Cinema"] as const;
const shotTypes = ["Wide", "Medium", "Close-up", "Aerial", "Macro", "POV"] as const;
const cameraMoves = ["Static", "Pan", "Tilt", "Dolly in", "Dolly out", "Orbit", "Crane", "Handheld"] as const;
const ratios = ["16:9", "9:16", "1:1", "4:3", "21:9"] as const;
const durations = ["4s", "6s", "8s"] as const;
const fps = ["24 fps", "30 fps", "60 fps"] as const;
const frameModes = ["Text to video", "First frame", "First + last frame", "Extend clip"] as const;
const soundtrack = ["None", "Cinematic", "Ambient", "Electronic", "Orchestral"] as const;
const styles = ["HEAVEN", "Cinematic", "Anime", "Documentary", "Neon Noir", "Vintage Film"] as const;

function VideoStudio() {
  const [active, setActive] = useState("prompt");
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [model, setModel] = useState<(typeof models)[number]>(models[0]);
  const [shot, setShot] = useState<(typeof shotTypes)[number]>(shotTypes[0]);
  const [move, setMove] = useState<(typeof cameraMoves)[number]>(cameraMoves[0]);
  const [moveSpeed, setMoveSpeed] = useState(40);
  const [ratio, setRatio] = useState<(typeof ratios)[number]>(ratios[0]);
  const [duration, setDuration] = useState<(typeof durations)[number]>(durations[1]);
  const [frameRate, setFrameRate] = useState<(typeof fps)[number]>(fps[0]);
  const [frameMode, setFrameMode] = useState<(typeof frameModes)[number]>(frameModes[0]);
  const [style, setStyle] = useState<(typeof styles)[number]>(styles[0]);
  const [styleStrength, setStyleStrength] = useState(55);
  const [track, setTrack] = useState<(typeof soundtrack)[number]>(soundtrack[0]);
  const [dialogue, setDialogue] = useState("");
  const [seedLock, setSeedLock] = useState(false);
  const [loop, setLoop] = useState(false);
  const [hdr, setHdr] = useState(true);

  return (
    <StudioLayout features={features} active={active} onSelect={setActive}>
      <div className="space-y-4">
        <div id="sec-prompt">
          <Section title="Prompt" desc="One clip is one scene — describe a single moment.">
            <TextRow
              label="Prompt"
              value={prompt}
              onChange={setPrompt}
              rows={4}
              placeholder="A chrome heron gliding over a flooded cathedral at dawn, slow motion…"
            />
            <TextRow
              label="Negative prompt"
              value={negative}
              onChange={setNegative}
              rows={2}
              placeholder="text overlays, flicker, warped faces"
            />
            <Segment label="Style" options={styles} value={style} onChange={setStyle} />
            <SliderRow label="Style strength" value={styleStrength} onChange={setStyleStrength} suffix="%" />
            <button
              type="button"
              onClick={() =>
                prompt.trim()
                  ? toast.success("Queued video render", {
                      description: `${model} · ${duration} · ${ratio} · ${style}`,
                    })
                  : toast.error("Describe the scene you want to create first.")
              }
              className="w-full rounded-full bg-primary py-3 text-[13.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Generate video
            </button>
          </Section>
        </div>

        <div id="sec-model">
          <Section title="Model" desc="Generative video models you connect appear here.">
            <Segment options={models} value={model} onChange={setModel} />
            <Segment label="Duration" options={durations} value={duration} onChange={setDuration} />
            <Segment label="Frame rate" options={fps} value={frameRate} onChange={setFrameRate} />
          </Section>
        </div>

        <div id="sec-shot">
          <Section title="Shot" desc="Framing and aspect of the scene.">
            <Segment label="Shot type" options={shotTypes} value={shot} onChange={setShot} />
            <Segment label="Aspect ratio" options={ratios} value={ratio} onChange={setRatio} />
          </Section>
        </div>

        <div id="sec-camera">
          <Section title="Camera" desc="Movement and pace of the virtual camera.">
            <Segment label="Movement" options={cameraMoves} value={move} onChange={setMove} />
            <SliderRow label="Motion intensity" value={moveSpeed} onChange={setMoveSpeed} suffix="%" />
            <SwitchRow
              label="Seamless loop"
              desc="End frame blends back into the first"
              checked={loop}
              onCheckedChange={setLoop}
            />
          </Section>
        </div>

        <div id="sec-frames">
          <Section title="Frames" desc="Start from text, an image, or extend a clip.">
            <Chips
              options={frameModes}
              values={[frameMode]}
              onToggle={(v) => setFrameMode(v as (typeof frameModes)[number])}
            />
            <div className="grid grid-cols-2 gap-2">
              {["First frame", "Last frame"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toast.info("Frame upload connects when models are added.")}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border-strong bg-background px-3 py-6 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ImageIcon className="h-5 w-5" strokeWidth={1.6} />
                  <span className="text-[11.5px] font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </Section>
        </div>

        <div id="sec-audio">
          <Section title="Audio" desc="Soundtrack and spoken lines.">
            <Segment label="Soundtrack" options={soundtrack} value={track} onChange={setTrack} />
            <TextRow
              label="Dialogue (optional)"
              value={dialogue}
              onChange={setDialogue}
              rows={2}
              placeholder="The narrator says: Every frame is a decision."
            />
          </Section>
        </div>

        <div id="sec-output">
          <Section title="Output" desc="Delivery and quality.">
            <SwitchRow
              label="Lock seed"
              desc="Reuse the same seed for repeatable results"
              checked={seedLock}
              onCheckedChange={setSeedLock}
            />
            <SwitchRow
              label="HDR grade"
              desc="Extended dynamic range colour pass"
              checked={hdr}
              onCheckedChange={setHdr}
            />
          </Section>
        </div>
      </div>
    </StudioLayout>
  );
}
