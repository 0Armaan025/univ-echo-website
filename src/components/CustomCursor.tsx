"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");

    if (!media.matches) return;

    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);

      const target = event.target;

      setHovering(target instanceof Element && !!target.closest("a, button, input, textarea, select, [role='button']"));
    }

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);


    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };

  }, []);

  return (
    <div aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, opacity: visible ? 1 : 0 }}

    >

      <span className={`absolute -left-1 -top-1 block rounded-full bg-lime-300 transition-[width, height, opacity] duration-200 ${hovering ? "h-2 w-2 opacity-0" : "h-2 w-2 opacity-100"}`} />
      <span className={`absolute rounded-full border border-lime-300/80 transition-[width, height, top, left, background-color] duration-200 ${hovering ? "-left-[17px] -top-[17px] h-[34px] w-[34px] bg-lime-300/10" : "-left-[12px] -top-[12px] h-6 w-6 bg-transparent"}`} />



    </div>
  );

}
