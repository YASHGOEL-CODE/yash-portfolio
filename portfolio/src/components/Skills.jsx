import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CATEGORIES = [
  {
    label: "Frontend",
    icon: "◈",
    accent: "#00f5ff",
    skills: [
      { name: "React / Next.js", pct: 95 },
      { name: "Tailwind CSS", pct: 92 },
      { name: "JavaScript / TS", pct: 90 },
      { name: "Framer Motion", pct: 85 },
    ],
    pills: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    icon: "⬡",
    accent: "#a855f7",
    skills: [
      { name: "Node.js / Express", pct: 88 },
      { name: "MongoDB", pct: 82 },
      { name: "REST APIs", pct: 90 },
      { name: "PostgreSQL", pct: 72 },
    ],
    pills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST"],
  },
  {
    label: "ML / AI",
    icon: "◇",
    accent: "#3b82f6",
    skills: [
      { name: "Python", pct: 88 },
      { name: "PyTorch", pct: 78 },
      { name: "TensorFlow", pct: 72 },
      { name: "Scikit-learn", pct: 80 },
    ],
    pills: ["Python", "PyTorch", "TensorFlow", "NumPy", "Pandas"],
  },
  {
    label: "Tools",
    icon: "◉",
    accent: "#22d3ee",
    skills: [
      { name: "Git / GitHub", pct: 94 },
      { name: "VS Code", pct: 96 },
      { name: "Figma", pct: 75 },
      { name: "Docker", pct: 65 },
    ],
    pills: ["Git", "GitHub", "Figma", "Docker", "VS Code"],
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

function SkillBar({ name, pct, accent, inView, delay = 0 }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {name}
        </span>
        <span
          className="text-xs font-semibold"
          style={{ color: accent, fontFamily: "'DM Sans', sans-serif" }}
        >
          {pct}%
        </span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #7c3aed)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[300px]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Subtle horizontal rule */}
      <div
        className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#a855f7", fontFamily: "'DM Sans', sans-serif" }}
        >
          Skills
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Technical
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              expertise.
            </span>
          </h2>
          <p
            className="text-sm leading-7 max-w-xs md:text-right"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Spanning the full stack — from pixel-perfect frontends to
            production ML systems.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              variants={fade}
              whileHover={{
                y: -5,
                boxShadow: `0 0 40px 6px ${cat.accent}1a`,
              }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="rounded-2xl p-6 flex flex-col gap-5 cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `${cat.accent}14`,
                    border: `1px solid ${cat.accent}28`,
                    color: cat.accent,
                  }}
                >
                  {cat.icon}
                </span>
                <span
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Bars */}
              <div>
                {cat.skills.map((s, si) => (
                  <SkillBar
                    key={s.name}
                    {...s}
                    accent={cat.accent}
                    inView={inView}
                    delay={ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.pills.map((p) => (
                  <motion.span
                    key={p}
                    whileHover={{ scale: 1.08 }}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium cursor-default"
                    style={{
                      background: `${cat.accent}0f`,
                      border: `1px solid ${cat.accent}24`,
                      color: cat.accent,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}