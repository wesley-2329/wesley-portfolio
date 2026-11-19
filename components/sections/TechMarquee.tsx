import { marqueeTech } from "@/data";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden mask-fade-x">
      <ul
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ ["--marquee-duration" as string]: "55s" }}
      >
        {[...items, ...items].map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-fg-dim transition-colors duration-300 hover:border-line-strong hover:text-fg"
          >
            <TechIcon name={t} className="h-4 w-4" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two counter-moving rows of technologies — a calm transition out of the hero. */
export function TechMarquee() {
  const half = Math.ceil(marqueeTech.length / 2);
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-line bg-ink-900/60 py-6">
      <div className="flex flex-col gap-3">
        <Row items={marqueeTech.slice(0, half)} />
        <Row items={marqueeTech.slice(half)} reverse />
      </div>
    </section>
  );
}
