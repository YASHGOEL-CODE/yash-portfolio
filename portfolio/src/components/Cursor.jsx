import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useSpring(rawX, { stiffness: 700, damping: 40 });
  const dotY = useSpring(rawY, { stiffness: 700, damping: 40 });
  const ringX = useSpring(rawX, { stiffness: 160, damping: 28 });
  const ringY = useSpring(rawY, { stiffness: 160, damping: 28 });

  // Hide on touch devices
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches;

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const addHover = () => {
      const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    addHover();

    // Re-run on DOM changes
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [isMobile, rawX, rawY, visible]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          background: hovering ? "#a855f7" : "#00f5ff",
          boxShadow: `0 0 ${hovering ? 14 : 8}px 2px ${hovering ? "rgba(168,85,247,0.8)" : "rgba(0,245,255,0.8)"}`,
          opacity: visible ? 1 : 0,
          transition: "width 0.15s,height 0.15s,background 0.2s,box-shadow 0.2s",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 52 : clicking ? 28 : 36,
          height: hovering ? 52 : clicking ? 28 : 36,
          borderColor: hovering ? "rgba(168,85,247,0.6)" : "rgba(0,245,255,0.45)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        initial={{ width: 36, height: 36 }}
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          border: "1px solid rgba(0,245,255,0.45)",
          opacity: visible ? 1 : 0,
          background: hovering ? "rgba(168,85,247,0.06)" : "transparent",
          transition: "background 0.25s,opacity 0.2s",
        }}
      />
    </>
  );
}