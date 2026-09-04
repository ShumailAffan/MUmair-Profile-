"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltPortraitProps = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Depth-based 3D portrait card (Option A from the brief).
 *
 * A full WebGL scene was considered and rejected: a single portrait photo
 * has no geometry, texture stack, or camera path that benefits from a
 * render pipeline — the entire visual payoff (perspective tilt, dynamic
 * light sheen, parallax layer separation) is achievable with a CSS 3D
 * transform driven by mouse position, at a fraction of the bundle size
 * and with no WebGL context to lose on low-power devices.
 *
 * Respects prefers-reduced-motion by disabling the pointer-driven tilt
 * (the component still renders normally, just without the transform).
 */
export function TiltPortrait({ src, alt, caption }: TiltPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Server and the first client render must produce identical markup, so
  // this starts false on both and is only updated after mount — reading
  // window.matchMedia inside a useState initializer (the previous version
  // of this component) causes a server/client mismatch whenever the
  // visiting device actually has reduced motion enabled, which is exactly
  // the audience this check exists to protect.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(my, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const sheenX = useTransform(springX, [0, 1], ["10%", "90%"]);
  const sheenY = useTransform(springY, [0, 1], ["10%", "90%"]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-md [perspective:1200px]"
    >
      <motion.div
        style={
          reducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="relative aspect-[4/5] w-full max-w-md rounded-sm overflow-hidden border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 420px"
          className="object-cover"
        />

        {/* Dynamic light sheen, follows pointer */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.35), transparent 55%)`,
            }}
          />
        )}

        {/* Gold edge accent — layer separation cue */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
      </motion.div>

      {caption && (
        <div className="absolute -bottom-5 left-5 right-5 bg-white text-navyink text-xs md:text-sm font-medium px-4 py-3 rounded-sm border-l-4 border-gold shadow-lg">
          {caption}
        </div>
      )}
    </div>
  );
}
