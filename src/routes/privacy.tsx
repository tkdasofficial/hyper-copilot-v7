import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileNav, Sidebar } from "@/components/hyper/Sidebar";
import { TopBar } from "@/components/hyper/TopBar";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Hyper Copilot" },
      {
        name: "description",
        content:
          "How Hyper Copilot collects, uses and protects your prompts, uploaded references and account data, plus the controls you have over them.",
      },
      { property: "og:title", content: "Privacy Policy — Hyper Copilot" },
      {
        property: "og:description",
        content: "What we collect, how prompts and references are handled, and your data controls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    h: "Data we collect",
    p: "Account details, prompts you submit, references you upload, and basic usage metrics such as credits consumed and models used.",
  },
  {
    h: "How we use it",
    p: "To generate your output, keep your history and boards available, prevent abuse, and improve reliability of the platform.",
  },
  {
    h: "Model training",
    p: "Your prompts and uploads are not used to train public models. Private model fine-tuning happens only on assets you explicitly select.",
  },
  {
    h: "Retention",
    p: "Generations stay in your workspace until you delete them. Deleted assets are purged from backups within 30 days.",
  },
  {
    h: "Your controls",
    p: "You can export or delete your workspace data at any time from Settings, or request removal by contacting support.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      <Sidebar />
      <div className="lg:pl-[248px]">
        <TopBar />
        <main className="mx-auto max-w-2xl px-4 pb-28 pt-10 lg:px-8 lg:pb-20">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-[12.5px] text-muted-foreground">Last updated August 2026</p>
          <div className="mt-8 space-y-6">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-[15px] font-bold">{s.h}</h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{s.p}</p>
              </section>
            ))}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
