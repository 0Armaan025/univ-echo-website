"use client";
import { useEffect, useRef } from "react";

export default function TechnicalGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      element.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const fineGrid = `
    linear-gradient(to right, rgba(190,210,175,0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(190,210,175,0.025) 1px, transparent 1px)
  `;

  const majorGrid = `
    linear-gradient(to right, rgba(190,210,175,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(190,210,175,0.04) 1px, transparent 1px)
  `;

  const cursorGrid = `
    linear-gradient(to right, rgba(217,249,157,0.20) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(217,249,157,0.20) 1px, transparent 1px)
  `;

  return (
    <div
      aria-hidden="true"
      ref={gridRef}
      style={
        {
          "--mx": "-500px",
          "--my": "-500px",
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Fine Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: fineGrid,
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        }}
      />

      {/* Major Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: majorGrid,
          backgroundSize: "160px 160px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 90%)",
        }}
      />

      {/* Cursor illumination - very faint glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: cursorGrid,
          backgroundSize: "32px 32px",
          maskImage: `
            radial-gradient(
              circle 140px at var(--mx) var(--my),
              black 0%,
              rgba(0,0,0,0.15) 60%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              circle 140px at var(--mx) var(--my),
              black 0%,
              rgba(0,0,0,0.15) 60%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(210,230,190,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 75%, rgba(8,10,9,0.35) 100%)",
        }}
      />
    </div>
  );
}
