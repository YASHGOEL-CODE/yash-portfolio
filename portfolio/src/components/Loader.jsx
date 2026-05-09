import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 2200;
    const tick = (now) => {
      const pct = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));
      if (pct < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setDone(true); setTimeout(onComplete, 650); }, 280);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  const letters = "YASH.DEV".split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg,#030312 0%,#06051a 55%,#0b0520 100%)" }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(0,245,255,0.07) 0%,transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(168,85,247,0.09) 0%,transparent 70%)", filter: "blur(50px)" }} />

          <div className="flex items-center gap-1 mb-10">
            {letters.map((l, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl font-extrabold"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: l === "." ? "linear-gradient(135deg,#a855f7,#3b82f6)" : "linear-gradient(135deg,#00f5ff,#a855f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  letterSpacing: "0.12em",
                }}>
                {l}
              </motion.span>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }} className="w-52 md:w-72">
            <div className="h-px rounded-full overflow-hidden mb-3"
              style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg,#00f5ff,#a855f7)",
                  boxShadow: "0 0 10px 2px rgba(0,245,255,0.45)",
                }} />
            </div>
            <p className="text-center text-xs tracking-[0.35em] tabular-nums"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans',sans-serif" }}>
              {String(progress).padStart(3, "0")}%
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-10 text-xs tracking-[0.4em] uppercase"
            style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'DM Sans',sans-serif" }}>
            Portfolio · {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}