"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Trophy, Award } from "lucide-react";
import { achievements, education } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";

function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setVal(to);
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} aria-label={`${prefix}${to.toLocaleString("en-IN")}`}>
      <span aria-hidden>
        {prefix}
        {val.toLocaleString("en-IN")}
      </span>
    </span>
  );
}

export function Education() {
  const rank = achievements[0];
  return (
    <section id="education" aria-labelledby="education-heading" className="relative py-28 md:py-40">
      <div className="container">
        <SectionHeading
          id="education-heading"
          index="06"
          eyebrow="Education & Achievements"
          title="Where the foundations are laid."
          emphasis={["foundations"]}
        />

        <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SpotlightCard className="relative h-full overflow-hidden p-8 md:p-12">
              <div aria-hidden className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03]">
                  <GraduationCap className="h-5 w-5 text-cyan-soft" strokeWidth={1.5} />
                </span>
                <span className="eyebrow">Education</span>
              </div>
              <h3 className="mt-10 text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1] tracking-[-0.04em]">
                {education.institution}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-fg-muted">{education.institutionFull}</p>
              <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow">Degree</dt>
                  <dd className="mt-2 text-fg">{education.degree}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Field</dt>
                  <dd className="mt-2 text-fg">{education.field}</dd>
                </div>
                <div>
                  <dt className="eyebrow">{education.status}</dt>
                  <dd className="mt-2 font-serif text-3xl italic text-gradient">{education.graduation}</dd>
                </div>
              </dl>
            </SpotlightCard>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal delay={0.1} className="flex-1">
              <SpotlightCard className="relative flex h-full flex-col overflow-hidden p-8 md:p-10">
                <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03]">
                    <Trophy className="h-5 w-5 text-violet-soft" strokeWidth={1.5} />
                  </span>
                  <span className="eyebrow">{rank.exam ?? "Competitive examination"}</span>
                </div>
                <p className="mt-auto pt-12 text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                  <CountUp to={rank.value} prefix={rank.prefix} />
                </p>
                <p className="mt-3 text-fg-muted">{rank.label}</p>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.18}>
              <SpotlightCard className="flex items-center gap-4 p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03]">
                  <Award className="h-5 w-5 text-sand" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-medium">Walmart Sparkathon 2025</p>
                  <p className="text-sm text-fg-muted">Built DefektGuard, a real-time damage-detection system.</p>
                </div>
                <motion.span
                  aria-hidden
                  className="ml-auto hidden h-px w-12 bg-gradient-to-r from-sand to-transparent sm:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: ease.expo, delay: 0.4 }}
                  style={{ originX: 0 }}
                />
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
