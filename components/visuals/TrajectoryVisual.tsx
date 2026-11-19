"use client";

import { motion } from "framer-motion";

/**
 * Illustration for the behavioural-cloning project: clustered vehicle
 * trajectories over a perspective road grid, with an ego vehicle following
 * the learned path. Purely illustrative — no data is implied.
 */
const clusters = [
  { color: "#8E7BFF", paths: ["M60 520 C 200 430, 260 300, 330 120", "M90 520 C 210 440, 280 320, 345 130", "M40 520 C 180 420, 240 310, 318 118"] },
  { color: "#4FD1E8", paths: ["M300 520 C 310 400, 330 260, 400 110", "M330 520 C 340 410, 360 270, 420 112", "M270 520 C 290 390, 310 250, 382 108"] },
  { color: "#E9C9A1", paths: ["M560 520 C 470 430, 470 300, 470 120", "M590 520 C 500 440, 495 300, 492 122", "M530 520 C 450 420, 450 300, 452 118"] },
];

const ego = "M330 520 C 340 410, 360 270, 420 112";

export function TrajectoryVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_50%_100%,#16161c,#050507)]">
      <svg viewBox="0 0 640 540" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="fade-top" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="road-mask">
            <rect width="640" height="540" fill="url(#fade-top)" />
          </mask>
          <radialGradient id="ego-glow">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4FD1E8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Perspective road grid */}
        <g mask="url(#road-mask)" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={320 + (i - 6) * 14} y1="80" x2={320 + (i - 6) * 110} y2="540" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 80 + Math.pow(i / 11, 1.8) * 460;
            return <line key={`h${i}`} x1="0" y1={y} x2="640" y2={y} />;
          })}
        </g>

        {/* Clustered trajectories */}
        <g mask="url(#road-mask)" fill="none" strokeLinecap="round">
          {clusters.map((c, ci) =>
            c.paths.map((d, pi) => (
              <motion.path
                key={`${ci}-${pi}`}
                d={d}
                stroke={c.color}
                strokeWidth={pi === 0 ? 2 : 1}
                strokeOpacity={pi === 0 ? 0.9 : 0.4}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, delay: 0.3 + ci * 0.25 + pi * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            ))
          )}
        </g>

        {/* Obstacle for collision-avoidance scenario */}
        <g>
          <rect x="452" y="300" width="34" height="20" rx="4" fill="none" stroke="#ff8a7a" strokeOpacity="0.8" strokeDasharray="3 3" />
          <text x="469" y="290" textAnchor="middle" fontSize="9" fill="#ff8a7a" fillOpacity="0.85" fontFamily="var(--font-geist-mono)">
            OBSTACLE
          </text>
        </g>

        {/* Ego vehicle following the learned path */}
        <g>
          <circle r="22" fill="url(#ego-glow)">
            <animateMotion dur="5s" repeatCount="indefinite" path={ego} rotate="auto" />
          </circle>
          <rect x="-7" y="-4" width="14" height="8" rx="2" fill="#EDEDEF">
            <animateMotion dur="5s" repeatCount="indefinite" path={ego} rotate="auto" />
          </rect>
        </g>
      </svg>

      {/* HUD labels */}
      <div className="absolute left-5 top-5 flex flex-col gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-muted">
        <span className="flex items-center gap-2"><span className="h-px w-4 bg-violet" /> Cluster A</span>
        <span className="flex items-center gap-2"><span className="h-px w-4 bg-cyan" /> Cluster B</span>
        <span className="flex items-center gap-2"><span className="h-px w-4 bg-sand" /> Cluster C</span>
      </div>
      <div className="absolute right-5 top-5 rounded-full border border-line bg-ink/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-muted backdrop-blur">
        CARLA · ViT policy
      </div>
      <p className="absolute bottom-4 left-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-dim">Illustration</p>
    </div>
  );
}
