import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 1,
    icon: "◈",
    title: "Modern Web Interfaces",
    desc: "Creating responsive and visually engaging web experiences with modern frontend technologies.",
    pills: ["React", "Next.js", "Tailwind", "JavaScript"],
    accent: "#00f5ff",
  },
  {
    id: 2,
    icon: "⬡",
    title: "AI / ML Exploration",
    desc: "Exploring machine learning workflows, model experimentation, and intelligent systems using Python-based tools.",
    pills: ["Python", "NumPy", "Pandas", "Matplotlib"],
    accent: "#a855f7",
  },
  {
    id: 3,
    icon: "◇",
    title: "AI-Assisted Development",
    desc: "Building modern applications with AI-assisted workflows and rapid prototyping.",
    pills: ["Claude", "ChatGPT", "Gemini", "GitHub"],
    accent: "#3b82f6",
  },
  {
    id: 4,
    icon: "◉",
    title: "Creative Interfaces",
    desc: "Creating futuristic and interactive web experiences with modern UI concepts and AI-assisted design workflows.",
    pills: ["Interactive UI", "Modern Layouts", "AI-Assisted Design"],
    accent: "#22d3ee",
  },
];

// Shared premium easing
const EASE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────────────────────────
// ENERGY FLOW — single animated bead on the timeline (GPU-only, no blur loop)
// ─────────────────────────────────────────────────────────────────────────────
function EnergyFlow({ accent }) {
  return (
    <div
      className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          translateX: "-50%",
          width: "2px",
          height: "56px",
          background: `linear-gradient(180deg,
            transparent 0%,
            ${accent}44 30%,
            ${accent}99 55%,
            ${accent}44 75%,
            transparent 100%)`,
        }}
        animate={{ top: ["-8%", "108%"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1.2,
        }}
      />
    </div>
  );
}

// Mobile version of energy bead
function EnergyFlowMobile({ accent }) {
  return (
    <div
      className="md:hidden absolute left-4 top-0 bottom-0 w-px pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
    >
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          translateX: "-50%",
          width: "2px",
          height: "40px",
          background: `linear-gradient(180deg,
            transparent 0%,
            ${accent}44 30%,
            ${accent}88 55%,
            ${accent}44 75%,
            transparent 100%)`,
        }}
        animate={{ top: ["-8%", "108%"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1.2,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE NODE — static glow, simple fade-in, no infinite pulse
// ─────────────────────────────────────────────────────────────────────────────
function TimelineNode({ accent, isActive, inView }) {
  return (
    <div
      className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                 items-center justify-center"
      style={{ willChange: "opacity, transform" }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "20px",
          height: "20px",
          background: `${accent}${isActive ? "28" : "14"}`,
          border: `1px solid ${accent}${isActive ? "44" : "22"}`,
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      {/* Core dot */}
      <motion.div
        className="rounded-full relative z-10"
        style={{
          width: "10px",
          height: "10px",
          background: accent,
          boxShadow: `0 0 ${isActive ? "10px" : "5px"} 1px ${accent}${isActive ? "88" : "55"}`,
          transition: "box-shadow 0.4s ease",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE CARD — GPU-only transform, once:false, no blur animation
// ─────────────────────────────────────────────────────────────────────────────
function TimelineCard({ card, index, activeIndex, setActiveIndex }) {
  const ref       = useRef(null);
  const isLeft    = index % 2 === 0;
  const isActive  = activeIndex === index;

  // ── Entry trigger — once:false so it replays every scroll-in ──────────────
  const inView = useInView(ref, {
    once: false,
    amount: 0.25,
  });

  // ── Focus trigger — tight margin to detect the "primary" visible card ──────
  const focusRef  = useRef(null);
  const focusView = useInView(focusRef, {
    once: false,
    margin: "-28% 0px -28% 0px",
  });

  useEffect(() => {
    if (focusView) setActiveIndex(index);
  }, [focusView, index, setActiveIndex]);

  // Direction: left cards from left, right cards from right
  const xInitial = isLeft ? -80 : 80;

  // Animated values based on state
  const animateState = inView
    ? { x: 0,        opacity: 1,    scale: 1    }
    : { x: xInitial, opacity: 0.35, scale: 0.98 };

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full ${
        isLeft
          ? "flex-row md:flex-row justify-start"
          : "flex-row md:flex-row-reverse justify-start"
      }`}
    >
      {/* Invisible focus probe — sits at card center */}
      <div ref={focusRef} className="absolute inset-0 pointer-events-none" />

      {/* ── CARD ─────────────────────────────────────────────────────────── */}
      <motion.div
        // GPU-only: x, opacity, scale — NO filter/blur animations
        className={`
          relative rounded-2xl p-6 cursor-default
          w-full md:w-[calc(50%-2.5rem)]
          ${isLeft ? "md:mr-auto" : "md:ml-auto"}
          transform-gpu
        `}
        style={{
          willChange: "transform, opacity",
          background: isActive
            ? "rgba(255,255,255,0.055)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${
            isActive ? `${card.accent}44` : "rgba(255,255,255,0.08)"
          }`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          // Static shadow only — NOT animated
          boxShadow: isActive
            ? `0 0 28px 4px ${card.accent}18`
            : "none",
          transition:
            "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
        initial={{ x: xInitial, opacity: 0, scale: 0.96 }}
        animate={animateState}
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        whileHover={{
          y: -4,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{
            background: inView
              ? `linear-gradient(90deg, transparent, ${card.accent}${isActive ? "77" : "33"}, transparent)`
              : "transparent",
            transition: "background 0.5s ease",
          }}
        />

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: `${card.accent}${isActive ? "18" : "0f"}`,
              border: `1px solid ${card.accent}${isActive ? "40" : "25"}`,
              color: card.accent,
              // Static box-shadow — NOT animated loop
              boxShadow: isActive ? `0 0 10px 2px ${card.accent}22` : "none",
              transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
            }}
          >
            {card.icon}
          </span>

          <h3
            className="text-base font-bold leading-snug"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
              transition: "color 0.4s ease",
            }}
          >
            {card.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-7 mb-5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.34)",
            transition: "color 0.4s ease",
          }}
        >
          {card.desc}
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {card.pills.map((pill) => (
            <motion.span
              key={pill}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
              className="px-3 py-1 rounded-lg text-[11px] font-medium cursor-default"
              style={{
                background: `${card.accent}${isActive ? "14" : "0c"}`,
                border: `1px solid ${card.accent}${isActive ? "33" : "20"}`,
                color: isActive ? card.accent : `${card.accent}bb`,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.025em",
                transition: "background 0.35s, border-color 0.35s, color 0.35s",
              }}
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── Horizontal connector (desktop) ───────────────────────────────── */}
      <motion.div
        className={`
          hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-10
          ${isLeft ? "right-[calc(50%-2.5rem)]" : "left-[calc(50%-2.5rem)]"}
          transform-gpu
        `}
        style={{
          background: `linear-gradient(${isLeft ? "90deg" : "270deg"},
            ${card.accent}${isActive ? "80" : "44"}, transparent)`,
          willChange: "transform, opacity",
          transformOrigin: isLeft ? "right" : "left",
          transition: "background 0.4s ease",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
      />

      {/* ── Timeline node (desktop) ──────────────────────────────────────── */}
      <TimelineNode accent={card.accent} isActive={isActive} inView={inView} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader({ inView }) {
  return (
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <motion.p
        className="text-xs tracking-[0.4em] uppercase mb-4"
        style={{ color: "#a855f7", fontFamily: "'DM Sans', sans-serif" }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
      >
        Skills
      </motion.p>

      <h2
        className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        What I{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #a855f7, #00f5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          build
        </span>{" "}
        &{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #3b82f6, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          explore.
        </span>
      </h2>

      <motion.p
        className="text-sm leading-7 mt-4 max-w-md mx-auto"
        style={{ color: "rgba(255,255,255,0.36)", fontFamily: "'DM Sans', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        A focused AI-first skill set — spanning modern interfaces,
        machine learning, and creative development.
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef   = useRef(null);
  const headerInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const lineInView   = useInView(sectionRef, { once: false, amount: 0.05 });

  const [activeIndex, setActiveIndex] = useState(0);
  const activeAccent = CARDS[activeIndex]?.accent ?? "#a855f7";

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* ── Static ambient background — NOT animated to save GPU ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[280px]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -left-28 bottom-1/3 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute -right-16 top-1/3 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)",
            filter: "blur(44px)",
          }}
        />
      </div>

      {/* Section top divider */}
      <div
        className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <SectionHeader inView={headerInView} />

        {/* ── Timeline wrapper ── */}
        <div className="relative">

          {/* ── Center vertical line (desktop) — replays on re-entry ── */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px transform-gpu"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.28) 15%, rgba(0,245,255,0.28) 50%, rgba(59,130,246,0.28) 85%, transparent 100%)",
              transformOrigin: "top",
              willChange: "transform, opacity",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={lineInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          />

          {/* Energy bead on center line */}
          {lineInView && <EnergyFlow accent={activeAccent} />}

          {/* ── Left-aligned line (mobile) ── */}
          <motion.div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px transform-gpu"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.25) 15%, rgba(0,245,255,0.25) 85%, transparent 100%)",
              transformOrigin: "top",
              willChange: "transform, opacity",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={lineInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          />

          {/* Energy bead (mobile) */}
          {lineInView && <EnergyFlowMobile accent={activeAccent} />}

          {/* ── Card stack ── */}
          <div className="flex flex-col gap-12 md:gap-16 pl-10 md:pl-0">
            {CARDS.map((card, index) => (
              <TimelineCard
                key={card.id}
                card={card}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}