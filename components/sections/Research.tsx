"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Camera, GitBranch, ShieldAlert, Brain } from "lucide-react";
import { researchSteps } from "@/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const stepIcons = [Camera, GitBranch, ShieldAlert, Brain];

export function Research() {
  const [active, setActive] = useState(0);

  return (
    <section id="research" aria-labelledby="research-heading" className="relative py-28 md:py-40">
      <div aria-hidden className="absolute inset-x-0 top-40 -z-10 mx-auto h-[60vh] max-w-6xl rounded-full bg-cyan/[0.05] blur-[150px]" />
      <div className="container">
        <SectionHeading
          id="research-heading"
          index="05"
          eyebrow="Research"
          title="Research that asks careful questions."
          emphasis={["careful"]}
          intro="From teaching a car to drive by imitation to understanding bias in Indian-language media."
        />

        {/* ---------- Sticky storytelling: behavioural cloning ---------- */}
        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow">Research Internship · May — Jul 2025</p>
                <h3 className="mt-4 text-heading font-semibold">
                  Vehicle behaviour analysis &amp; behavioural cloning
                </h3>
                <p className="mt-3 text-fg-muted">ABV-IIITM Gwalior</p>
              </Reveal>
              <PipelineDiagram active={active} />
            </div>
          </div>

          <ol className="lg:col-span-6">
            {researchSteps.map((s, i) => (
              <Step key={s.step} index={i} active={active === i} onActive={setActive} {...s} />
            ))}
          </ol>
        </div>

        {/* ---------- Ongoing M.Tech research ---------- */}
        <Reveal className="mt-28 md:mt-40">
          <div className="surface relative overflow-hidden p-8 md:p-14">
            <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet/20 blur-[120px]" />
            <div aria-hidden className="absolute inset-0 bg-grid opacity-30 [mask-image:linear-gradient(to_left,#000,transparent_70%)]" />
            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="chip border-signal/25 bg-signal/[0.06] text-signal">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                  </span>
                  Ongoing · M.Tech research
                </span>
                <SplitText
                  as="h3"
                  text="Media Bias Detection and Mitigation for Indian Languages"
                  emphasis={["Bias", "Indian", "Languages"]}
                  className="mt-6 block text-[clamp(1.9rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
                />
                <p className="mt-6 max-w-xl text-fg-muted md:text-lg">
                  News shapes how people understand the world — and much of India reads it in languages other than English.
                  My thesis applies NLP to detect, analyse and mitigate media bias in Indian-language text.
                </p>
              </div>
              <ul className="flex flex-col gap-3 lg:col-span-5 lg:justify-end">
                {[
                  { q: "Where does bias surface?", a: "Bias analysis across Indian-language news media." },
                  { q: "Can it be detected reliably?", a: "NLP methods for media bias detection." },
                  { q: "Can it be reduced?", a: "Mitigation methodologies that preserve meaning." },
                ].map((item, i) => (
                  <motion.li
                    key={item.q}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: ease.expo }}
                    className="rounded-2xl border border-line bg-ink/60 p-5 backdrop-blur"
                  >
                    <p className="font-medium">{item.q}</p>
                    <p className="mt-1 text-sm text-fg-muted">{item.a}</p>
                  </motion.li>
                ))}
                <li className="pt-2 font-mono text-xs text-fg-dim">Results will be shared once published.</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
  title,
  body,
  active,
  onActive,
}: {
  index: number;
  step: string;
  title: string;
  body: string;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex min-h-[38vh] flex-col justify-center border-t border-line py-10 first:border-t-0 lg:min-h-[60vh]">
      <span className={cn("font-mono text-xs transition-colors duration-500", active ? "text-cyan" : "text-fg-dim")}>
        Step {step}
      </span>
      <h4
        className={cn(
          "mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold tracking-[-0.03em] transition-colors duration-500",
          active ? "text-fg" : "text-fg-dim"
        )}
      >
        {title}
      </h4>
      <p className={cn("mt-4 max-w-md text-base leading-relaxed transition-colors duration-500 md:text-lg", active ? "text-fg-muted" : "text-fg-dim")}>
        {body}
      </p>
    </li>
  );
}

/** Four-stage pipeline that lights up in sync with the scrolling steps. */
function PipelineDiagram({ active }: { active: number }) {
  return (
    <div className="surface relative mt-10 hidden overflow-hidden p-8 lg:block">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30 mask-radial" />
      <div className="relative">
        <div className="relative flex items-center justify-between">
          {/* Connector */}
          <span aria-hidden className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-line" />
          <motion.span
            aria-hidden
            className="absolute left-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-violet to-cyan"
            animate={{ width: `calc(${(active / (researchSteps.length - 1)) * 100}% - ${(active / (researchSteps.length - 1)) * 3}rem)` }}
            transition={{ duration: 0.8, ease: ease.expo }}
          />
          {researchSteps.map((s, i) => {
            const Icon = stepIcons[i];
            const on = i <= active;
            return (
              <motion.span
                key={s.step}
                animate={{ scale: i === active ? 1.12 : 1 }}
                transition={{ duration: 0.6, ease: ease.expo }}
                className={cn(
                  "relative grid h-12 w-12 place-items-center rounded-2xl border transition-colors duration-500",
                  on ? "border-violet/50 bg-violet/15 text-fg" : "border-line bg-ink-800 text-fg-dim"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                {i === active && <span className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(142,123,255,0.55)]" />}
              </motion.span>
            );
          })}
        </div>
        <div className="mt-8 h-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: ease.expo }}
            >
              <p className="font-mono text-xs text-cyan">
                {researchSteps[active].step} — {researchSteps[active].title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{researchSteps[active].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <ul className="mt-2 flex flex-wrap gap-2">
          {["CARLA", "Behavioural cloning", "Trajectory clustering", "Collision avoidance", "Vision Transformers"].map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
