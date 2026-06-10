import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ── Google Fonts injected once ────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    if (document.getElementById("hero-fonts")) return;
    const link = document.createElement("link");
    link.id = "hero-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ── Constants ─────────────────────────────────────────────────────────────────
const ROLES = [
  "AI Web Developer",
  "ML Systems Explorer",
  "Modern UI Creator",
  "Creative Interface Designer",
  "ML Engineer",
];

const TECH = ["C/C++", "Python", "NumPy", "Pandas", "Matplotlib"];

const STATS = [
  { val: "40+", label: "Projects" },
  { val: "5yr", label: "Experience" },
  { val: "12+", label: "ML Models" },
];

// ── Stagger variants ──────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ── Rotating role text ────────────────────────────────────────────────────────
function RoleText() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="h-8 md:h-9 overflow-hidden relative" aria-label={ROLES[idx]}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[idx]}
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -36, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center text-base md:text-lg font-medium tracking-wide"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "linear-gradient(90deg, #00f5ff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ── Tilt card (right panel) ───────────────────────────────────────────────────
function TiltCard() {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 100, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // ── Info rows ─────────────────────────────────────────────────────────────
  const lines = [
    { label: "Status",   value: "Available",           accent: "#22d3ee" },
    { label: "Focus",    value: "AI/ML + AI Web Dev",  accent: "#a855f7" },
    { label: "Location", value: "Remote / Global",     accent: "#3b82f6" },
    { label: "Response", value: "< 24 hours",          accent: "#22d3ee" },
  ];

  // ── Building With pills ───────────────────────────────────────────────────
  const buildingWith = [
    { label: "ML Systems",                accent: "#00f5ff" },
    { label: "Modern AI Web Development", accent: "#a855f7" },
    { label: "Creative Web Interfaces",   accent: "#3b82f6" },
  ];

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-sm mx-auto lg:mx-0 select-none"
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(168,85,247,0.22) 0%, rgba(0,245,255,0.1) 60%, transparent 80%)",
          filter: "blur(28px)",
        }}
      />

      {/* Glass card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 0 0 1px rgba(0,245,255,0.08), 0 32px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* ── macOS window chrome ── */}
        <div
          className="px-6 py-4 flex items-center gap-2 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          <span
            className="ml-3 text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif" }}
          >
            yash.profile
          </span>
        </div>

        {/* ── Avatar + name ── */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-4">
          <div className="relative">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.18), rgba(168,85,247,0.25))",
                border: "1px solid rgba(0,245,255,0.25)",
                fontFamily: "'Syne', sans-serif",
                color: "#00f5ff",
              }}
            >
              Y
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#050515]"
              style={{ background: "#22d3ee" }}
            />
          </div>
          <div>
            <p
              className="text-white font-bold text-base leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Yash
            </p>
            {/* ── Updated subtitle ── */}
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Building in AI/ML + Creating Modern Apps with AI
            </p>
          </div>
        </div>

        {/* ── Info rows ── */}
        <div className="px-6 pb-5 space-y-3">
          {lines.map((l) => (
            <div key={l.label} className="flex items-center justify-between">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {l.label}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: l.accent, fontFamily: "'DM Sans', sans-serif" }}
              >
                {l.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="mx-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

        {/* ── Building With section ── */}
        <div className="px-6 py-5">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Building With
          </p>
          <div className="flex flex-wrap gap-2">
            {buildingWith.map((pill) => (
              <motion.span
                key={pill.label}
                whileHover={{
                  scale: 1.06,
                  boxShadow: `0 0 14px 3px ${pill.accent}44`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-3 py-1.5 rounded-lg text-[11px] font-medium cursor-default"
                style={{
                  background: `${pill.accent}10`,
                  border: `1px solid ${pill.accent}30`,
                  color: pill.accent,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {pill.label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── Holographic shimmer overlay ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{ opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.18) 0%, transparent 50%, rgba(168,85,247,0.15) 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Scroll indicator ──────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.7 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span
        className="text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}
      >
        Scroll
      </span>
      <div
        className="w-px h-10 relative overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="w-full absolute top-0"
          style={{ height: "40%", background: "linear-gradient(180deg, #00f5ff, transparent)" }}
          animate={{ y: ["0%", "250%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <>
      <FontLoader />
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #030312 0%, #06051a 55%, #0b0520 100%)" }}
      >
        {/* ── Background atmosphere ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
            style={{
              background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,245,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.6) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* ── Content wrapper ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 py-28 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-10 items-center min-h-screen lg:min-h-0 lg:py-32">

            {/* ══ LEFT COLUMN ══════════════════════════════════════════════ */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              {/* Availability badge */}
              <motion.div variants={item} className="flex items-center">
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
                  style={{
                    background: "rgba(0,245,255,0.07)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    color: "#22d3ee",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#22d3ee" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  Open to Opportunities
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div variants={item} className="space-y-2">
                <h1
                  className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <span className="text-white">Hi, I'm </span>
                  <span
                    style={{
                      background: "linear-gradient(135deg, #00f5ff 0%, #a855f7 55%, #3b82f6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundSize: "200% auto",
                      animation: "gradientShift 5s ease infinite",
                    }}
                  >
                    Yash
                  </span>
                </h1>
                <h2
                  className="text-2xl md:text-3xl xl:text-4xl font-bold leading-snug"
                  style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.82)" }}
                >
                  I build futuristic web
                  <br className="hidden md:block" /> experiences & ML systems
                </h2>
              </motion.div>

              {/* Rotating role */}
              <motion.div variants={item}>
                <RoleText />
              </motion.div>

              {/* Intro paragraph */}
              <motion.p
                variants={item}
                className="text-base leading-8 max-w-md"
                style={{
                  color: "rgba(255,255,255,0.48)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                }}
              >
                Crafting interfaces at the intersection of design precision and
                engineering depth. From pixel-perfect UIs to production ML pipelines —
                I ship work that scales and endures.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 36px 8px rgba(0,245,255,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide text-black transition-shadow duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(135deg, #00f5ff 0%, #3b82f6 100%)",
                    boxShadow: "0 0 20px 3px rgba(0,245,255,0.25)",
                  }}
                >
                  View Projects →
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgba(168,85,247,0.7)",
                    boxShadow: "0 0 24px 4px rgba(168,85,247,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide text-white transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Contact Me
                </motion.a>
                {/* Resume button — outlined cyan, opens PDF in new tab */}
                <motion.a
                  href="/resume/Yash_Goel_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume PDF (opens in new tab)"
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgba(0,245,255,0.65)",
                    boxShadow: "0 0 22px 4px rgba(0,245,255,0.18)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(0,245,255,0.05)",
                    border: "1px solid rgba(0,245,255,0.28)",
                    color: "#00f5ff",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1.5v7M3.5 6.5l3 3 3-3M1.5 11h10"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Resume
                </motion.a>
              </motion.div>

              {/* Tech stack pills */}
              <motion.div variants={item} className="flex flex-wrap gap-2 pt-2">
                {TECH.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.08, duration: 0.35, ease: "easeOut" }}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 12px 2px rgba(0,245,255,0.3)" }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-default"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={item}
                className="flex gap-8 pt-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-2xl font-extrabold"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        background: "linear-gradient(135deg, #00f5ff, #a855f7)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.val}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ══ RIGHT COLUMN ═════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <TiltCard />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:block">
          <ScrollIndicator />
        </div>

        {/* Gradient keyframes */}
        <style>{`
          @keyframes gradientShift {
            0%   { background-position: 0%   50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0%   50%; }
          }
        `}</style>
      </section>
    </>
  );
}