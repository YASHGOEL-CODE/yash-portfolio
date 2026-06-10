import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");
  const [hovered, setHovered]   = useState(null);
  const [open, setOpen]         = useState(false);

  // ── Scroll depth detection ────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via IntersectionObserver ───────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        // Always glass, deepens on scroll
        background: scrolled
          ? "rgba(3, 3, 18, 0.88)"
          : "rgba(3, 3, 18, 0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled
          ? "0 1px 40px rgba(0,0,0,0.45)"
          : "none",
        // Compact: py-3 equivalent via px/py inline
        padding: "10px 48px",
      }}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ opacity: 0.85 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 select-none"
      >
        {/* Small accent dot */}
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#00f5ff", boxShadow: "0 0 6px 1px rgba(0,245,255,0.7)" }}
        />
        <span
          className="text-[15px] font-extrabold tracking-[0.18em]"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: "linear-gradient(90deg, #00f5ff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          YASH.DEV
        </span>
      </motion.button>

      {/* ── Desktop links ─────────────────────────────────────────────────── */}
      <ul className="hidden md:flex items-center gap-0.5">
        {LINKS.map((id) => {
          const isActive  = active === id;
          const isHovered = hovered === id;
          return (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-4 py-2 text-[13px] capitalize rounded-lg outline-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? "#e2fffe"
                    : isHovered
                    ? "rgba(255,255,255,0.82)"
                    : "rgba(255,255,255,0.44)",
                  transition: "color 0.2s",
                  letterSpacing: "0.03em",
                }}
              >
                {/* Shared background pill — active */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(0,245,255,0.06)",
                      border: "1px solid rgba(0,245,255,0.14)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}

                {/* Hover background — only when not active */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  />
                )}

                {/* Link text */}
                <span className="relative z-10">{id}</span>

                {/* Active underline dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      background: "#00f5ff",
                      boxShadow: "0 0 5px 1px rgba(0,245,255,0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── Desktop CTA row ───────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-2">
        {/* Resume — outlined */}
        <motion.a
          href="/resume/Yash_Goel_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Yash Goel's resume (opens in new tab)"
          whileHover={{
            scale: 1.03,
            borderColor: "rgba(0,245,255,0.55)",
            boxShadow: "0 0 14px 2px rgba(0,245,255,0.15)",
          }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold"
          style={{
            background: "transparent",
            border: "1px solid rgba(0,245,255,0.3)",
            color: "#00f5ff",
            letterSpacing: "0.02em",
            fontFamily: "'DM Sans', sans-serif",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          {/* Download icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Resume
        </motion.a>

        {/* Hire Me — filled */}
        <motion.button
          onClick={() => scrollTo("contact")}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 18px 3px rgba(0,245,255,0.22)",
          }}
          whileTap={{ scale: 0.96 }}
          aria-label="Hire Me — scroll to contact section"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold text-black"
          style={{
            background: "linear-gradient(135deg, #00f5ff 0%, #3b82f6 100%)",
            letterSpacing: "0.02em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Hire Me
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      {/* ── Hamburger (mobile) ────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block rounded-full origin-center"
            style={{
              height: "1px",
              width: i === 1 ? "18px" : "24px",
              background: open ? "rgba(0,245,255,0.9)" : "rgba(255,255,255,0.65)",
              transition: "background 0.2s",
            }}
            animate={
              open
                ? i === 0 ? { rotate: 45,  y: 6,  width: "24px" }
                : i === 1 ? { opacity: 0,  x: -6 }
                :           { rotate: -45, y: -6, width: "24px" }
                : { rotate: 0, y: 0, x: 0, opacity: 1, width: i === 1 ? "18px" : "24px" }
            }
            transition={{ duration: 0.22, ease: "easeInOut" }}
          />
        ))}
      </button>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-3 right-3 mt-2 rounded-2xl overflow-hidden md:hidden"
            style={{
              background: "rgba(5, 4, 22, 0.96)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.65)",
            }}
          >
            <div className="p-3 flex flex-col gap-0.5">
              {LINKS.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                  onClick={() => scrollTo(id)}
                  className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm capitalize transition-colors duration-150"
                  style={{
                    color: active === id ? "#00f5ff" : "rgba(255,255,255,0.55)",
                    fontWeight: active === id ? 600 : 400,
                    background: active === id ? "rgba(0,245,255,0.05)" : "transparent",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.03em",
                  }}
                >
                  {/* Active dot */}
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{
                      background: active === id ? "#00f5ff" : "transparent",
                      boxShadow: active === id ? "0 0 4px 1px rgba(0,245,255,0.6)" : "none",
                      transition: "background 0.2s",
                    }}
                  />
                  {id}
                </motion.button>
              ))}

              {/* Divider */}
              <div
                className="mx-1 my-2"
                style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
              />

              {/* Mobile Resume */}
              <motion.a
                href="/resume/Yash_Goel_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume (opens in new tab)"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.97 }}
                className="mx-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(0,245,255,0.28)",
                  color: "#00f5ff",
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke="currentColor"
                    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Resume
              </motion.a>

              {/* Mobile Hire Me */}
              <motion.button
                onClick={() => scrollTo("contact")}
                whileTap={{ scale: 0.97 }}
                className="mx-1 py-2.5 rounded-xl text-sm font-semibold text-black flex items-center justify-center gap-1.5"
                style={{
                  background: "linear-gradient(135deg, #00f5ff 0%, #3b82f6 100%)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Hire Me
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}