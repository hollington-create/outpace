"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 12;
const TRAIL_COLORS = [
  "rgba(34, 211, 238, 0.9)",
  "rgba(34, 211, 238, 0.7)",
  "rgba(52, 211, 153, 0.6)",
  "rgba(52, 211, 153, 0.45)",
  "rgba(212, 160, 20, 0.35)",
  "rgba(212, 160, 20, 0.25)",
  "rgba(212, 160, 20, 0.18)",
  "rgba(52, 211, 153, 0.12)",
  "rgba(34, 211, 238, 0.08)",
  "rgba(34, 211, 238, 0.05)",
  "rgba(34, 211, 238, 0.03)",
  "rgba(34, 211, 238, 0.01)",
];

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const hovering = useRef(false);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouch) return;

    setVisible(true);
    document.documentElement.classList.add("cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterInteractive = () => { hovering.current = true; };
    const onMouseLeaveInteractive = () => { hovering.current = false; };

    window.addEventListener("mousemove", onMouseMove);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    };

    let interactives = addListeners();

    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      interactives = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add current mouse pos to front of trail
      trail.current.unshift({ ...mousePos.current });
      if (trail.current.length > TRAIL_LENGTH) {
        trail.current.pop();
      }

      const isHover = hovering.current;

      // Draw trail dots (back to front, smallest to largest)
      for (let i = trail.current.length - 1; i >= 0; i--) {
        const point = trail.current[i];
        const ratio = 1 - i / TRAIL_LENGTH;
        const baseSize = isHover ? 6 : 3.5;
        const size = baseSize * ratio;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = TRAIL_COLORS[i] || "transparent";
        ctx.fill();
      }

      // Draw head dot
      if (trail.current.length > 0) {
        const head = trail.current[0];
        const headSize = isHover ? 7 : 4;
        ctx.beginPath();
        ctx.arc(head.x, head.y, headSize, 0, Math.PI * 2);
        ctx.fillStyle = isHover
          ? "rgba(52, 211, 153, 0.95)"
          : "rgba(34, 211, 238, 0.95)";
        ctx.fill();

        // Subtle glow on head
        ctx.beginPath();
        ctx.arc(head.x, head.y, headSize + 4, 0, Math.PI * 2);
        ctx.fillStyle = isHover
          ? "rgba(52, 211, 153, 0.15)"
          : "rgba(34, 211, 238, 0.1)";
        ctx.fill();
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("cursor-active");
      cancelAnimationFrame(animFrame.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}
