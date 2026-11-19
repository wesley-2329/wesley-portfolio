import { SplitText } from "./SplitText";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Consistent section header: numbered eyebrow, split-reveal title, optional intro. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  emphasis,
  intro,
  className,
  align = "left",
  id,
}: {
  id?: string;
  index: string;
  eyebrow: string;
  title: string;
  emphasis?: string[];
  intro?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal className={cn("mb-6 flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="font-mono text-xs text-violet-soft">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-violet/70 to-transparent" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitText as="h2" id={id} text={title} emphasis={emphasis} className="text-heading-lg font-semibold text-fg" />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg", align === "center" && "mx-auto")}>
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
