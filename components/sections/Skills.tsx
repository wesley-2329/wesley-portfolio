"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { skillCategories, skillLinks } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon, hasTechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

/** skill -> set of related skills (undirected). */
const graph = (() => {
  const g = new Map<string, Set<string>>();
  for (const [a, b] of skillLinks) {
    if (!g.has(a)) g.set(a, new Set());
    if (!g.has(b)) g.set(b, new Set());
    g.get(a)!.add(b);
    g.get(b)!.add(a);
  }
  return g;
})();

const categoryOf = new Map<string, string>(
  skillCategories.flatMap((c) => c.skills.map((s) => [s, c.title] as [string, string]))
);

type Line = { key: string; d: string };

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>());

  const category = skillCategories.find((c) => c.id === activeId)!;
  const related = useMemo(() => (hovered ? graph.get(hovered) ?? new Set<string>() : new Set<string>()), [hovered]);
  const crossLinks = useMemo(
    () => Array.from(related).filter((s) => !category.skills.includes(s)),
    [related, category]
  );

  // Draw curved connections from the hovered skill to related skills on the board.
  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board || !hovered) return setLines([]);
    const origin = nodeRefs.current.get(hovered);
    if (!origin) return setLines([]);
    const b = board.getBoundingClientRect();
    const o = origin.getBoundingClientRect();
    const ox = o.left + o.width / 2 - b.left;
    const oy = o.top + o.height / 2 - b.top;
    const next: Line[] = [];
    related.forEach((name) => {
      const el = nodeRefs.current.get(name);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const tx = r.left + r.width / 2 - b.left;
      const ty = r.top + r.height / 2 - b.top;
      const mx = (ox + tx) / 2;
      const my = (oy + ty) / 2 - Math.max(30, Math.abs(tx - ox) * 0.25);
      next.push({ key: `${hovered}-${name}`, d: `M ${ox} ${oy} Q ${mx} ${my} ${tx} ${ty}` });
    });
    setLines(next);
  }, [hovered, related]);

  useLayoutEffect(() => {
    measure();
  }, [measure, activeId]);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-28 md:py-40">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[50vh] max-w-5xl rounded-full bg-violet/[0.07] blur-[140px]" />
      <div className="container">
        <SectionHeading
          id="skills-heading"
          index="03"
          eyebrow="Skills"
          title="A toolkit that spans product and intelligence."
          emphasis={["product", "intelligence."]}
          intro="Pick a domain, then hover or focus a skill to see how it connects to the rest of the stack."
        />

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Category selector */}
          <div className="min-w-0 lg:col-span-5">
            <div
              role="tablist"
              aria-label="Skill categories"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
            >
              {skillCategories.map((c, i) => {
                const active = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    id={`tab-${c.id}`}
                    aria-selected={active}
                    aria-controls="skills-panel"
                    onClick={() => {
                      setActiveId(c.id);
                      setHovered(null);
                    }}
                    onMouseEnter={() => window.matchMedia("(pointer: fine)").matches && setActiveId(c.id)}
                    className={cn(
                      "group relative flex shrink-0 items-baseline gap-4 rounded-full border px-4 py-2 text-left transition-colors duration-300",
                      "lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-6",
                      active ? "border-line-strong bg-white/[0.05] lg:bg-transparent" : "border-line"
                    )}
                  >
                    <span className="hidden font-mono text-xs text-fg-dim lg:inline">0{i + 1}</span>
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm font-medium tracking-tight transition-all duration-500 ease-expo lg:text-[clamp(1.5rem,2.6vw,2.25rem)] lg:font-semibold lg:tracking-[-0.03em]",
                        active ? "text-fg lg:translate-x-2" : "text-fg-dim group-hover:text-fg-muted"
                      )}
                    >
                      {c.title}
                    </span>
                    <span className="ml-auto hidden font-mono text-xs text-fg-dim lg:inline">{String(c.skills.length).padStart(2, "0")}</span>
                    {active && (
                      <motion.span
                        layoutId="skills-active"
                        className="absolute bottom-[-1px] left-0 hidden h-px w-full bg-gradient-to-r from-violet via-cyan to-transparent lg:block"
                        transition={{ duration: 0.6, ease: ease.expo }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skill board */}
          <div className="min-w-0 lg:col-span-7">
            <div
              id="skills-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeId}`}
              ref={boardRef}
              className="surface relative min-h-[420px] overflow-hidden p-6 md:p-10"
            >
              <div aria-hidden className="absolute inset-0 bg-grid opacity-40 mask-radial" />

              {/* Connection layer */}
              <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="skill-line" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#8E7BFF" />
                    <stop offset="100%" stopColor="#4FD1E8" />
                  </linearGradient>
                </defs>
                <AnimatePresence>
                  {lines.map((l) => (
                    <motion.path
                      key={l.key}
                      d={l.d}
                      fill="none"
                      stroke="url(#skill-line)"
                      strokeWidth={1.25}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.7, ease: ease.expo }}
                    />
                  ))}
                </AnimatePresence>
              </svg>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={category.id}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.04 } },
                      exit: { opacity: 0, transition: { duration: 0.2 } },
                    }}
                  >
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      className="max-w-md text-fg-muted"
                    >
                      {category.blurb}
                    </motion.p>
                    <ul className="mt-8 flex flex-wrap gap-3" onMouseLeave={() => setHovered(null)}>
                      {category.skills.map((s) => {
                        const isHovered = hovered === s;
                        const isRelated = related.has(s);
                        const dim = hovered && !isHovered && !isRelated;
                        return (
                          <motion.li
                            key={s}
                            variants={{
                              hidden: { opacity: 0, y: 16, scale: 0.96 },
                              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: ease.expo } },
                            }}
                          >
                            <button
                              type="button"
                              ref={(el) => {
                                if (el) nodeRefs.current.set(s, el);
                                else nodeRefs.current.delete(s);
                              }}
                              onMouseEnter={() => setHovered(s)}
                              onFocus={() => setHovered(s)}
                              onBlur={() => setHovered(null)}
                              className={cn(
                                "relative flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm transition-all duration-300 md:text-[0.95rem]",
                                isHovered
                                  ? "border-violet/60 bg-violet/[0.12] text-fg shadow-[0_0_30px_-6px_rgba(142,123,255,0.6)]"
                                  : isRelated
                                    ? "border-cyan/40 bg-cyan/[0.06] text-fg"
                                    : "border-line bg-ink-800/80 text-fg-muted hover:text-fg",
                                dim && "opacity-35"
                              )}
                            >
                              {hasTechIcon(s) ? (
                                <TechIcon name={s} className="h-4 w-4" />
                              ) : (
                                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                              )}
                              {s}
                            </button>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Cross-domain connections */}
              <div className="relative mt-10 min-h-[3.5rem] border-t border-line pt-5" aria-live="polite">
                <AnimatePresence mode="wait">
                  {hovered ? (
                    <motion.div
                      key={hovered}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap items-center gap-2 text-sm"
                    >
                      <span className="eyebrow mr-1">{hovered} connects to</span>
                      {related.size === 0 && <span className="text-fg-dim">—</span>}
                      {Array.from(related).map((r) => (
                        <span key={r} className={cn("chip", crossLinks.includes(r) && "border-violet/30 text-violet-soft")}>
                          {r}
                          {crossLinks.includes(r) && <span className="text-fg-dim">· {categoryOf.get(r)}</span>}
                        </span>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="eyebrow">
                      Hover a skill to reveal its connections
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
