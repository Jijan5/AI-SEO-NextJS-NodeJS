"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide the native cursor globally
    document.documentElement.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      // Ring follows with smooth lag
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    // Expand ring on hover over interactive elements
    const onMouseEnter = () => {
      ringRef.current?.classList.add("cursor-hover");
    };
    const onMouseLeave = () => {
      ringRef.current?.classList.remove("cursor-hover");
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    // Attach hover listeners to all interactive elements
    const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring - lags behind */}
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border border-teal-400/70 pointer-events-none transition-all duration-150"
        style={{ willChange: "transform" }}
      />
      {/* Inner dot - snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-teal-400 pointer-events-none shadow-[0_0_8px_2px_rgba(45,212,191,0.8)]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
