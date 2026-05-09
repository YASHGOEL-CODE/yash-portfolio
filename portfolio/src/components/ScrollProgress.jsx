import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[999]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        background: "linear-gradient(to right, #00f5ff, #a855f7)",
      }}
    />
  );
}