import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AudioLines,
  Mic2,
  Music2,
  Settings2,
  SlidersHorizontal,
  Waves,
  Wand2,
} from "lucide-react";
import { StudioLayout, type StudioFeature } from "@/components/hyper/StudioLayout";
import { Chips, Section, Segment, SliderRow, SwitchRow, TextRow } from "@/components/hyper/StudioControls";

export const Route = createFileRoute("/audio")({
  head: () => ({
    meta: [
      { title: "Audio Studio — Advanced AI Audio Generation | Hyper Copilot" },
      {
        name: "description",
        content:
          "Compose AI music, voices and sound effects with full control: genre, tempo, key, voice character, mixing and mastering in Hyper Copilot's Audio Studio.",
      },
      { property: "og:title", content: "Audio Studio — Advanced AI Audio Generation" },
      {
        property: "og:description",
        content: "Music, voice and sound-effect controls for production-grade AI audio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AudioStudio,
});

const features: StudioFeature[] = [
  { id: "prompt", label: "Prompt", icon: Wand2 },
  { id: "kind", label: "Type", icon: AudioLines },
  { id: "music", label: "Music", icon: Music2 },
  { id: "voice", label: "Voice", icon: Mic2 },
  { id: "mix", label: "Mix", icon: SlidersHorizontal },
  { id: "output", label: "Output", icon: Settings2 },
];

const kinds = ["Music", "Voice", "Sound FX"] as const;
const genres = ["Cinematic", "Ambient", "Electronic", "Orchestral", "Hip-Hop", "Lo-Fi", "Rock"] as const;
const moods = ["Uplifting", "Tense", "Melancholy", "Serene", "Energetic", "Dark"] as const;
const keys = ["Auto", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
const scales = ["Major", "Minor"] as const;
const voiceTypes = ["Narrator", "Conversational", "Whisper", "Announcer", "Character"] as const;
const voiceStyles = ["HEAVEN", "Warm", "Crisp", "Deep", "Airy", "Robotic"] as const;
const durations = ["15s", "30s", "60s", "2 min", "5 min"] as const;
const formats = ["WAV", "MP3", "FLAC", "OGG"] as const;
const sampleRates = ["44.1 kHz", "48 kHz", "96 kHz"] as const;

function AudioStudio() {
  const [active, setActive] = useState("prompt");
  const [prompt, setPrompt] = useState("");
  const [kind, setKind] = useState<(typeof kinds)[number]>(kinds[0]);
  const [genre, setGenre] = useState<(typeof genres)[number]>(genres[0]);
  const [moodSel, setMoodSel] = useState<string[]>(["Serene"]);
  const [tempo, setTempo] = useState(90);
  const [songKey, setSongKey] = useState<(typeof keys)[number]>(keys[0]);
  const [scale, setScale] = useState<(typeof scales)[number]>(scales[0]);
  const [instrumental, setInstrumental] = useState(true);
  const [voice, setVoice] = useState<(typeof voiceTypes)[number]>(voiceTypes[0]);
  const [voiceStyle, setVoiceStyle] = useState<(typeof voiceStyles)[number]>(voiceStyles[0]);
  const [stability, setStability] = useState(60);
  const [script, setScript] = useState("");
  const [bass, setBass] = useState(50);
  const [mids, setMids] = useState(50);
  const [treble, setTreble] = useState(50);
  const [width, setWidth] = useState(40);
  const [duration, setDuration] = useState<(typeof durations)[number]>(durations[1]);
  const [format, setFormat] = useState<(typeof formats)[number]>(formats[0]);
  const [rate, setRate] = useState<(typeof sampleRates)[number]>(sampleRates[1]);
  const [normalize, setNormalize] = useState(true);

  return (
    <StudioLayout features={features} active={active} onSelect={setActive}>
      <div className="space-y-4">
        <div id="sec-prompt">
          <Section title="Prompt" desc="Describe the sound you want to hear.">
            <TextRow
              label="Prompt"
              value={prompt}
              onChange={setPrompt}
              rows={4}
              placeholder="A slow cinematic swell of strings over a distant choir, cathedral reverb…"
            />
            <button
              type="button"
              onClick={() =>
                prompt.trim()
                  ? toast.success("Queued audio render", {
                      description: `${kind} · ${duration} · ${format}`,
                    })
                  : toast.error("Describe the sound you want to create first.")
              }
              className="w-full rounded-full bg-primary py-3 text-[13.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Generate audio
            </button>
          </Section>
        </div>

        <div id="sec-kind">
          <Section title="Type" desc="What kind of audio to generate.">
            <Segment options={kinds} value={kind} onChange={setKind} />
            <Segment label="Duration" options={durations} value={duration} onChange={setDuration} />
          </Section>
        </div>

        <div id="sec-music">
          <Section title="Music" desc="Genre, mood and musical structure.">
            <Segment label="Genre" options={genres} value={genre} onChange={setGenre} />
            <div>
              <p className="mb-2 text-[12px] font-semibold text-muted-foreground">Mood</p>
              <Chips
                options={moods}
                values={moodSel}
                onToggle={(v) =>
                  setMoodSel((m) => (m.includes(v) ? m.filter((x) => x !== v) : [...m, v]))
                }
              />
            </div>
            <SliderRow label="Tempo" value={tempo} onChange={setTempo} min={40} max={200} suffix=" BPM" />
            <Segment label="Key" options={keys} value={songKey} onChange={setSongKey} />
            <Segment label="Scale" options={scales} value={scale} onChange={setScale} />
            <SwitchRow
              label="Instrumental"
              desc="No vocals in the generated track"
              checked={instrumental}
              onCheckedChange={setInstrumental}
            />
          </Section>
        </div>

        <div id="sec-voice">
          <Section title="Voice" desc="Speaker character and delivery.">
            <Segment label="Voice type" options={voiceTypes} value={voice} onChange={setVoice} />
            <Segment label="Voice style" options={voiceStyles} value={voiceStyle} onChange={setVoiceStyle} />
            <SliderRow label="Stability" value={stability} onChange={setStability} suffix="%" />
            <TextRow
              label="Script (optional)"
              value={script}
              onChange={setScript}
              rows={3}
              placeholder="Every sound tells a story."
            />
          </Section>
        </div>

        <div id="sec-mix">
          <Section title="Mix" desc="Shape the frequency balance and stereo field.">
            <SliderRow label="Bass" value={bass} onChange={setBass} suffix="%" />
            <SliderRow label="Mids" value={mids} onChange={setMids} suffix="%" />
            <SliderRow label="Treble" value={treble} onChange={setTreble} suffix="%" />
            <SliderRow label="Stereo width" value={width} onChange={setWidth} suffix="%" />
            <SwitchRow
              label="Normalize loudness"
              desc="Master to streaming loudness targets"
              checked={normalize}
              onCheckedChange={setNormalize}
            />
          </Section>
        </div>

        <div id="sec-output">
          <Section title="Output" desc="Delivery format and quality.">
            <Segment label="Format" options={formats} value={format} onChange={setFormat} />
            <Segment label="Sample rate" options={sampleRates} value={rate} onChange={setRate} />
          </Section>
        </div>

        <div className="flex items-center gap-3 rounded-3xl border border-border bg-surface/60 p-4">
          <Waves className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.6} />
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            Generated audio renders appear here once you connect a generative audio model.
          </p>
        </div>
      </div>
    </StudioLayout>
  );
}
