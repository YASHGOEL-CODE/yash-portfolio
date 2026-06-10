import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// ── Images served from public/projects/ — no imports needed ──────────────────
// Ensure these files exist at: public/projects/<filename>
const IMAGES = {
  ganpati:    "/projects/ganpati-handloom.png",
  portfolio:  "/projects/portfolio-website.png",
  github:     "/projects/github-clone.png",
  creditwise: "/projects/creditwise-loan-system.png",
  smartcart:  "/projects/smartcart-clustering.png",
  imageClass: "/projects/image-classification.png",
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const FEATURED = {
  title: "Ganpati Handloom",
  tagline: "Traditional commerce powered by modern technology.",
  desc: "A full-stack e-commerce platform built for showcasing and selling handloom products online. Includes authentication, admin & user dashboards, order management, analytics visualizations, real-time order status tracking, and location integration.",
  tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js", "Express.js", "MongoDB", "REST API"],
  accent: "#00f5ff",
  year: "2025",
  live: "https://ganpati-handloom.vercel.app/",
  github: "https://github.com/YASHGOEL-CODE/ganpati-handloom",
  showLiveDemo: true,
  image: IMAGES.ganpati,
};

const GRID_PROJECTS = [
  {
    id: 2,
    title: "Portfolio Website",
    tagline: "Design meets interaction.",
    desc: "A futuristic developer portfolio focused on immersive UI, cinematic animations, interactive layouts, smooth transitions, and modern frontend experiences.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "Glassmorphism UI"],
    accent: "#a855f7",
    year: "2025",
    live: "",
    github: "https://github.com/YASHGOEL-CODE/yash-portfolio",
    showLiveDemo: false,
    image: IMAGES.portfolio,
  },
  {
    id: 3,
    title: "CreditWise Loan System",
    tagline: "Predicting approvals intelligently.",
    desc: "A machine learning-based loan prediction system trained on Kaggle datasets to analyze credit history, previous loans, and financial patterns for approval prediction.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Machine Learning", "Kaggle"],
    accent: "#3b82f6",
    year: "2025",
    live: "",
    github: "https://github.com/YASHGOEL-CODE/CreditWise-Loan-Prediction",
    showLiveDemo: false,
    image: IMAGES.creditwise,
  },
  {
    id: 4,
    title: "SmartCart Clustering",
    tagline: "Smarter product recommendations.",
    desc: "An ML-based recommendation system using clustering and unsupervised learning to analyze customer preferences and identify trending products for personalization.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Clustering", "Unsupervised Learning"],
    accent: "#22d3ee",
    year: "2025",
    live: "",
    github: "https://github.com/YASHGOEL-CODE/SmartCart-Customer-Segmentation",
    showLiveDemo: false,
    image: IMAGES.smartcart,
  },
  {
    id: 5,
    title: "Image Classification",
    tagline: "Training vision-based intelligence.",
    desc: "A deep learning image classification model trained on 60,000 images using CNN architecture, including end-to-end training/testing pipelines and prediction analysis.",
    tech: ["Python", "CNN", "Deep Learning", "Image Processing", "NumPy", "Pandas"],
    accent: "#6366f1",
    year: "2025",
    live: "",
    github: "https://github.com/YASHGOEL-CODE/DateFruit-Image-Classification",
    showLiveDemo: false,
    image: IMAGES.imageClass,
  },
  {
    id: 6,
    title: "GitHub Clone",
    tagline: "Recreating developer workflows.",
    desc: "A GitHub-inspired platform under development featuring repository creation, branching workflows, commit functionality, and animated authentication interfaces.",
    tech: ["React", "JavaScript", "Node.js", "MongoDB", "Git Concepts"],
    accent: "#8b5cf6",
    year: "2025",
    live: "",
    github: "https://github.com/YASHGOEL-CODE/CodePulse",
    showLiveDemo: false,
    image: IMAGES.github,
  },
];

// Icon glyphs per category
const ICONS = ["◈", "⬡", "◇", "◉", "△", "⬟"];

const EASE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT IMAGE — robust real-image rendering with cinematic overlays
// ─────────────────────────────────────────────────────────────────────────────
function ProjectImage({ src, alt, accent, icon, featured = false, hovered = false }) {
  const [imgError, setImgError] = useState(false);

  // src from Vite import is always a resolved URL string — never null after import
  // imgError only becomes true if the browser 404s after the import resolved
  const hasImage = Boolean(src) && !imgError;

  const containerHeight = featured
    ? { height: "100%", minHeight: "300px" }
    : { height: "160px" };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: "12px",
        border: `1px solid ${accent}22`,
        boxShadow: hovered ? `0 0 30px 4px ${accent}22` : "0 0 0px transparent",
        transition: "box-shadow 0.4s ease",
        backgroundColor: "#0a0a1a",   // dark base so no white flash
        ...containerHeight,
      }}
    >
      {/* ── Real image (always attempt to render when src present) ── */}
      {hasImage && (
        <img
          src={src}
          alt={alt}
          onError={() => {
            console.error(`[ProjectImage] ❌ Failed to load: ${src}`);
            console.error(`[ProjectImage] Try opening this URL in browser: http://localhost:5173${src}`);
            setImgError(true);
          }}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transition: "transform 0.7s ease",
          }}
          className="group-hover:scale-105"
        />
      )}

      {/* ── Futuristic placeholder (shown only when no image) ── */}
      {!hasImage && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${accent}10 0%, rgba(59,130,246,0.06) 60%, ${accent}06 100%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.12,
              backgroundImage: `linear-gradient(${accent}40 1px, transparent 1px), linear-gradient(90deg, ${accent}40 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 50% 50%, ${accent}12 0%, transparent 65%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "3rem", color: accent, opacity: 0.38, userSelect: "none" }}>
              {icon}
            </span>
            {/* DEV-only: tells you WHY the placeholder is showing */}
            {import.meta.env.DEV && (
              <span style={{
                fontSize: "10px",
                color: accent,
                opacity: 0.5,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}>
                {!src ? "src = undefined" : "img load failed"}
              </span>
            )}
          </div>
        </>
      )}

      {/* ── Cinematic bottom-fade overlay (always present) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(to top, rgba(3,7,18,0.5) 0%, rgba(3,7,18,0.06) 50%, transparent 100%)",
        }}
      />

      {/* ── Subtle accent tint (always present) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 55%)`,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH PILL
// ─────────────────────────────────────────────────────────────────────────────
function TechPill({ label, accent }) {
  return (
    <span
      className="px-3 py-1 rounded-lg text-[11px] font-medium"
      style={{
        background: `${accent}0d`,
        border: `1px solid ${accent}28`,
        color: `${accent}cc`,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.025em",
      }}
    >
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUTTONS
// ─────────────────────────────────────────────────────────────────────────────
function LiveButton({ href, accent }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, boxShadow: `0 0 22px 4px ${accent}44` }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-black"
      style={{
        background: `linear-gradient(135deg, ${accent}, #3b82f6)`,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.03em",
      }}
    >
      Live Demo
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

function GithubButton({ href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.26)" }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.03em",
        transition: "border-color 0.2s",
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
      GitHub
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED CARD
// ─────────────────────────────────────────────────────────────────────────────
function FeaturedCard({ project, inView }) {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setMouse({ x: 0, y: 0 }); }}
      className="relative rounded-2xl overflow-hidden group transform-gpu"      style={{
        background: "rgba(255,255,255,0.035)",
        border: `1px solid ${hovering ? `${project.accent}44` : "rgba(255,255,255,0.09)"}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovering ? `0 0 44px 6px ${project.accent}1c` : "none",
        willChange: "transform",
        transition: "border-color 0.35s, box-shadow 0.35s",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.75, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: "easeOut" } }}
    >
      {/* Spotlight glow following cursor */}
      {hovering && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, ${project.accent}14, transparent 65%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Animated top border beam */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}${hovering ? "88" : "44"}, transparent)`,
          transition: "background 0.4s ease",
          zIndex: 2,
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-0">
        {/* Image panel — explicit height so ProjectImage h:100% resolves correctly */}
        <div
          className="lg:w-[45%] flex-shrink-0"
          style={{ padding: "20px", paddingBottom: 0, minHeight: "300px" }}
        >
          <div style={{ position: "relative", height: "100%", minHeight: "300px" }}>
            <ProjectImage
              src={project.image}
              alt={project.title}
              accent={project.accent}
              icon="◈"
              featured
              hovered={hovering}
            />
          </div>
        </div>

        {/* Content panel */}
        <div className="flex-1 p-7 lg:p-8 flex flex-col justify-between">
          {/* Meta row */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold tracking-widest uppercase"
                style={{
                  background: `${project.accent}18`,
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Featured
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {project.year}
              </span>
            </div>

            <h3
              className="font-extrabold text-white mb-1.5"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.35rem, 2.5vw, 1.85rem)",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm font-medium mb-4"
              style={{ color: project.accent, fontFamily: "'DM Sans', sans-serif" }}
            >
              {project.tagline}
            </p>
            <p
              className="text-sm leading-7 mb-6"
              style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              {project.desc}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-7">
              {project.tech.map((t) => (
                <TechPill key={t} label={t} accent={project.accent} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.showLiveDemo && (
              <LiveButton href={project.live} accent={project.accent} />
            )}
            <GithubButton href={project.github} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID CARD
// ─────────────────────────────────────────────────────────────────────────────
function GridCard({ project, index, iconGlyph }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: false, amount: 0.2 });
  const cardRef = useRef(null);
  const [mouse, setMouse]     = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setMouse({ x: 0, y: 0 }); }}
        className="relative rounded-2xl overflow-hidden h-full group transform-gpu"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hovering ? `${project.accent}38` : "rgba(255,255,255,0.08)"}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: hovering ? `0 0 28px 4px ${project.accent}16` : "none",
          willChange: "transform",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
      >
        {/* Spotlight */}
        {hovering && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, ${project.accent}10, transparent 65%)`,
              zIndex: 1,
            }}
          />
        )}

        {/* Top border beam */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}${hovering ? "70" : "35"}, transparent)`,
            transition: "background 0.3s ease",
            zIndex: 2,
          }}
        />

        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* Image */}
          <div className="mb-5">
            <ProjectImage
              src={project.image}
              alt={project.title}
              accent={project.accent}
              icon={iconGlyph}
              hovered={hovering}
            />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.26)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {project.year}
            </span>
          </div>

          {/* Title + Tagline */}
          <h3
            className="text-base font-extrabold text-white mb-1 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs font-medium mb-3"
            style={{ color: project.accent, fontFamily: "'DM Sans', sans-serif" }}
          >
            {project.tagline}
          </p>
          <p
            className="text-xs leading-6 mb-5 flex-1"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            {project.desc}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <TechPill key={t} label={t} accent={project.accent} />
            ))}
            {project.tech.length > 4 && (
              <span
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
              >
                +{project.tech.length - 4} more
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            {project.showLiveDemo && (
              <LiveButton href={project.live} accent={project.accent} />
            )}
            <GithubButton href={project.github} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader({ inView }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div>
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#00f5ff", fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
        >
          Projects
        </motion.p>
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Selected
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00f5ff, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            work.
          </span>
        </h2>
      </div>

      <motion.p
        className="text-sm leading-7 max-w-xs md:text-right"
        style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
      >
        Real-world projects across AI, machine learning,
        and modern web development.
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef   = useRef(null);
  const headerInView = useInView(sectionRef, { once: false, amount: 0.08 });
  const featuredRef  = useRef(null);
  const featuredView = useInView(featuredRef, { once: false, amount: 0.15 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* ── Static ambient background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-24 w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
            filter: "blur(44px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* Section divider */}
      <div
        className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader inView={headerInView} />

        {/* ── Featured card ── */}
        <div ref={featuredRef} className="mb-6">
          <FeaturedCard project={FEATURED} inView={featuredView} />
        </div>

        {/* ── Grid of remaining 5 projects ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GRID_PROJECTS.map((project, i) => (
            <GridCard
              key={project.id}
              project={project}
              index={i}
              iconGlyph={ICONS[i + 1]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}