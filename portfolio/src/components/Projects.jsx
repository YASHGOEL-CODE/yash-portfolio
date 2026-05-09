import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1, featured: true,
    title: "AI SaaS Platform",
    tagline: "Intelligence at scale.",
    desc: "Full-stack AI SaaS with real-time inference, usage billing, model versioning, and an enterprise-grade dashboard — built for production from day one.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Stripe", "PostgreSQL", "Redis"],
    accent: "#00f5ff", year: "2024", github: "#", demo: "#",
  },
  {
    id: 2, featured: false,
    title: "Modern Portfolio",
    tagline: "Design meets engineering.",
    desc: "Cinematic developer portfolio with 3D elements, particle system, scroll animations, and a glassmorphism design system built in React + Framer Motion.",
    tech: ["React", "Tailwind", "Framer Motion", "Spline"],
    accent: "#a855f7", year: "2024", github: "#", demo: "#",
  },
  {
    id: 3, featured: false,
    title: "ML Prediction System",
    tagline: "Data to decisions.",
    desc: "Production ML pipeline for loan approval prediction. Ensemble models, SHAP explainability, FastAPI serving, live monitoring dashboard.",
    tech: ["Python", "PyTorch", "FastAPI", "Scikit-learn", "Docker"],
    accent: "#3b82f6", year: "2024", github: "#", demo: "#",
  },
  {
    id: 4, featured: false,
    title: "Realtime Chat App",
    tagline: "Communication, elevated.",
    desc: "WebSocket-first messaging platform with E2E encrypted rooms, presence detection, file sharing, and thousands of concurrent users supported.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
    accent: "#22d3ee", year: "2023", github: "#", demo: "#",
  },
];

const ICONS = ["◈", "⬡", "◇", "◉"];

function ProjectCard({ project, featured }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={`relative rounded-2xl overflow-hidden cursor-default ${featured ? "lg:col-span-2" : ""}`}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>

      {/* Spotlight */}
      {hovered && (
        <div className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px,${project.accent}18,transparent 60%)`, zIndex: 1 }} />
      )}

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-400"
        style={{ background: hovered ? `linear-gradient(90deg,transparent,${project.accent}88,transparent)` : `linear-gradient(90deg,transparent,${project.accent}28,transparent)` }} />

      <div className={`relative z-10 p-7 md:p-8 ${featured ? "lg:flex gap-10 items-start" : ""}`}>
        {/* Preview image placeholder */}
        <div className={`rounded-xl overflow-hidden mb-6 flex-shrink-0 relative ${featured ? "lg:mb-0 w-full lg:w-80 h-44 lg:h-52" : "w-full h-40"}`}
          style={{ background: `linear-gradient(135deg,${project.accent}18,rgba(59,130,246,0.06))`, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `linear-gradient(${project.accent}25 1px,transparent 1px),linear-gradient(90deg,${project.accent}25 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl select-none" style={{ color: project.accent, opacity: 0.5 }}>{ICONS[project.id - 1]}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.26)", fontFamily: "'DM Sans',sans-serif" }}>{project.year}</span>
            {featured && (
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold tracking-wider"
                style={{ background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}30`, fontFamily: "'DM Sans',sans-serif" }}>
                FEATURED
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-white mb-1 leading-tight"
            style={{ fontFamily: "'Syne',sans-serif", fontSize: featured ? "clamp(1.4rem,2.5vw,1.9rem)" : "1.1rem" }}>
            {project.title}
          </h3>
          <p className="text-sm mb-3 font-medium" style={{ color: project.accent, fontFamily: "'DM Sans',sans-serif" }}>{project.tagline}</p>
          <p className="text-sm leading-7 mb-5" style={{ color: "rgba(255,255,255,0.43)", fontFamily: "'DM Sans',sans-serif" }}>{project.desc}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg text-[11px] font-medium"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.52)", fontFamily: "'DM Sans',sans-serif" }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.a href={project.demo}
              whileHover={{ scale: 1.04, boxShadow: `0 0 20px 4px ${project.accent}44` }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black"
              style={{ background: `linear-gradient(135deg,${project.accent},#3b82f6)`, fontFamily: "'DM Sans',sans-serif" }}>
              Live Demo →
            </motion.a>
            <motion.a href={project.github}
              whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.28)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Sans',sans-serif" }}>
              GitHub
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const fade = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="projects" ref={ref} className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(0,245,255,0.05) 0%,transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)", filter: "blur(40px)" }} />
      </div>
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#00f5ff", fontFamily: "'DM Sans',sans-serif" }}>Projects</motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]"
            style={{ fontFamily: "'Syne',sans-serif" }}>
            Selected<br />
            <span style={{ background: "linear-gradient(135deg,#00f5ff,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>work.</span>
          </h2>
          <p className="text-sm leading-7 max-w-xs md:text-right"
            style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans',sans-serif" }}>
            Production projects across AI, web, and systems engineering.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid lg:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <motion.div key={p.id} variants={fade} className={p.featured ? "lg:col-span-2" : ""}>
              <ProjectCard project={p} featured={p.featured} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}