"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AppContextValue = {
  /** True once the preloader has finished and the hero may choreograph in. */
  introDone: boolean;
  completeIntro: () => void;
  /** Smoothly scroll to a section id (or top). */
  scrollTo: (target: string | number) => void;
  reducedMotion: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProviders>");
  return ctx;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Smooth scrolling (disabled entirely for reduced-motion users).
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Hold the page still while the preloader plays.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!introDone) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [introDone, reducedMotion]);

  const completeIntro = useCallback(() => setIntroDone(true), []);

  const scrollTo = useCallback(
    (target: string | number) => {
      const lenis = lenisRef.current;
      const el =
        typeof target === "string"
          ? target === "home"
            ? 0
            : (document.getElementById(target) as HTMLElement | null)
          : target;
      if (el === null) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: typeof el === "number" ? 0 : -16, duration: 1.4 });
      } else if (typeof el === "number") {
        window.scrollTo({ top: el });
      } else {
        el.scrollIntoView();
      }
      if (typeof target === "string") {
        history.replaceState(null, "", target === "home" ? location.pathname : `#${target}`);
      }
    },
    []
  );

  const value = useMemo(
    () => ({ introDone, completeIntro, scrollTo, reducedMotion }),
    [introDone, completeIntro, scrollTo, reducedMotion]
  );

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </MotionConfig>
    </AppContext.Provider>
  );
}
