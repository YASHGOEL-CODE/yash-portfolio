import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(ease * to));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const STATS = [
  { val: 6,    suffix: "+", label: "Projects Built",  isNum: true  },
  { val: 3,    suffix: "+", label: "ML Experiments",  isNum: true  },
  { val: null, suffix: "",  label: "Focused",         isNum: false, text: "ML" },
];

const CARDS = [
  {
    icon: "◈",
    title: "AI Web Development",
    desc: "Building modern and interactive web experiences using AI-assisted workflows, creative UI design, and smart integrations.",
    accent: "#00f5ff",
  },
  {
    icon: "⬡",
    title: "Machine Learning",
    desc: "Exploring ML concepts, training models, and experimenting with data-driven systems using Python and modern ML libraries.",
    accent: "#a855f7",
  },
  {
    icon: "◇",
    title: "Creative Interfaces",
    desc: "Designing futuristic and visually engaging interfaces focused on smooth interaction, clarity, and modern aesthetics.",
    accent: "#3b82f6",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};
const fade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.055) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute -right-20 bottom-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#00f5ff", fontFamily: "'DM Sans', sans-serif" }}
        >
          About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* ── Left column ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-8"
          >
            <motion.h2
              variants={fade}
              className="text-4xl md:text-5xl font-extrabold leading-[1.1] text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Building AI-powered web
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                experiences with code.
              </span>
            </motion.h2>

            <motion.p
              variants={fade}
              className="text-base leading-8"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              I'm a developer exploring the intersection of AI/ML and modern web
              experiences. I enjoy building interactive interfaces, experimenting with
              machine learning models, and creating digital products that feel
              futuristic, creative, and user-focused.
            </motion.p>

            <motion.p
              variants={fade}
              className="text-base leading-8"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              My journey started with coding in 2023, followed by web development and
              later AI/ML. Today, I focus on combining intelligent systems with modern
              design to build projects that are both functional and visually engaging.
            </motion.p>

            {/* Stats grid — 3 columns */}
            <motion.div variants={fade} className="grid grid-cols-3 gap-3 pt-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    className="text-3xl font-extrabold mb-1"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      background: "linear-gradient(135deg, #00f5ff, #a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.isNum
                      ? <Counter to={s.val} suffix={s.suffix} />
                      : s.text
                    }
                  </p>
                  <p
                    className="text-xs tracking-wide"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-4"
          >
            {CARDS.map((c) => (
              <motion.div
                key={c.title}
                variants={fade}
                whileHover={{
                  scale: 1.02,
                  y: -3,
                  boxShadow: `0 0 32px 4px ${c.accent}22`,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="p-6 rounded-2xl cursor-default transition-shadow duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-2xl mt-0.5 flex-shrink-0"
                    style={{ color: c.accent }}
                  >
                    {c.icon}
                  </span>
                  <div>
                    <h3
                      className="text-base font-semibold text-white mb-2"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {c.title}
                    </h3>
                    <p
                      className="text-sm leading-7"
                      style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {c.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Timeline strip */}
            <motion.div
              variants={fade}
              className="mt-4 p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Journey
              </p>
              {[
                { year: "2025", text: "AI/ML Exploration · ML Projects",          accent: "#00f5ff" },
                { year: "2024", text: "Web Development · Full-Stack Projects",    accent: "#a855f7" },
                { year: "2023", text: "Started Coding Journey",                   accent: "#3b82f6" },
              ].map((t, i) => (
                <div key={t.year} className={`flex gap-4 ${i < 2 ? "mb-4" : ""}`}>
                  <div className="flex flex-col items-center gap-1 w-14 flex-shrink-0">
                    <span
                      className="text-xs font-bold"
                      style={{ color: t.accent, fontFamily: "'Syne', sans-serif" }}
                    >
                      {t.year}
                    </span>
                    {i < 2 && (
                      <div className="w-px flex-1 min-h-4" style={{ background: "rgba(255,255,255,0.08)" }} />
                    )}
                  </div>
                  <p
                    className="text-sm pt-0.5 leading-6"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}