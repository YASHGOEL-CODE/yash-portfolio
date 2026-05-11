import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ── EmailJS credentials ───────────────────────────────────────────────────────
const EJS_SERVICE  = "service_trdojde";
const EJS_TEMPLATE = "template_1p3di1u";
const EJS_KEY      = "_yQPtPFxLc2JVi1jY";

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/YASHGOEL-CODE",
    accent: "#00f5ff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-goel-9327202aa/",
    accent: "#a855f7",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "yashgoel2030@gmail.com",
    accent: "#3b82f6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1];

// ── Animated focus input ──────────────────────────────────────────────────────
function Field({ label, type = "text", textarea = false, placeholder, name, value, onChange, disabled }) {
  const [focused, setFocused] = useState(false);
  const id = `field-${name}`;

  const sharedProps = {
    id,
    name,
    value,
    onChange,
    disabled,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    style: {
      color: "rgba(255,255,255,0.88)",
      fontFamily: "'DM Sans', sans-serif",
      background: "transparent",
      outline: "none",
      width: "100%",
      resize: "none",
      opacity: disabled ? 0.5 : 1,
    },
  };

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: "8px",
          fontFamily: "'DM Sans', sans-serif",
          color: focused ? "#00f5ff" : "rgba(255,255,255,0.28)",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </label>

      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          background: focused ? "rgba(0,245,255,0.04)" : "rgba(255,255,255,0.03)",
          border: focused
            ? "1px solid rgba(0,245,255,0.38)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 20px 2px rgba(0,245,255,0.07)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        {textarea ? (
          <textarea rows={4} className="text-sm" {...sharedProps} />
        ) : (
          <input type={type} className="text-sm" {...sharedProps} />
        )}
      </div>
    </div>
  );
}

// ── Stagger variants ──────────────────────────────────────────────────────────
const container = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };
const fade = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  // Form state
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
      await emailjs.send(
      EJS_SERVICE,
      EJS_TEMPLATE,
      {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      },
      EJS_KEY
    );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      // Auto-reset success banner after 5s
      setTimeout(() => setStatus("idle"), 5000);

    } catch (err) {
      console.error("[EmailJS] Error:", err);
      setErrMsg("Something went wrong. Please try again or email me directly.");
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)",
            filter: "blur(50px)",
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

        {/* ── Section label + heading ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#a855f7", fontFamily: "'DM Sans', sans-serif" }}
        >
          Contact
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ══ LEFT — heading + social cards ══════════════════════════════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-7"
          >
            <motion.h2
              variants={fade}
              className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's build
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                something great.
              </span>
            </motion.h2>

            <motion.p
              variants={fade}
              className="text-base leading-8"
              style={{
                color: "rgba(255,255,255,0.43)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              Open to full-time roles, freelance projects, and interesting
              collaborations. Whether you have a clear brief or just an idea —
              I'm here for it.
            </motion.p>

            {/* Social cards */}
            <motion.div variants={fade} className="space-y-3">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    x: 4,
                    boxShadow: `0 0 24px 2px ${s.accent}28`,
                    borderColor: `${s.accent}40`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${s.accent}14`,
                      border: `1px solid ${s.accent}24`,
                      color: s.accent,
                    }}
                  >
                    {s.icon}
                  </span>
                  <div>
                    <p
                      className="text-sm font-semibold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.33)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.name === "Email" ? "yashgoel2030@gmail.com" : `/${s.name.toLowerCase()}/yashdev`}
                    </p>
                  </div>
                  <svg className="ml-auto" width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ color: "rgba(255,255,255,0.18)" }}>
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — contact form ════════════════════════════════════════ */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="rounded-2xl p-7 md:p-8 space-y-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            noValidate
          >
            <Field
              label="Name"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Field
              label="Message"
              name="message"
              textarea
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* ── Submit button + status banners ── */}
            <div className="pt-1 space-y-3">
              <AnimatePresence mode="wait">

                {/* SUCCESS */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.28)",
                      color: "#4ade80",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}

                {/* ERROR */}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.28)",
                      color: "#f87171",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" />
                    </svg>
                    {errMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Send button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? {
                  scale: 1.02,
                  boxShadow: "0 0 28px 5px rgba(168,85,247,0.33)",
                } : {}}
                whileTap={!isLoading ? { scale: 0.97 } : {}}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white
                           flex items-center justify-center gap-2"
                style={{
                  background: isLoading
                    ? "rgba(168,85,247,0.4)"
                    : "linear-gradient(135deg, #a855f7, #3b82f6)",
                  boxShadow: isLoading ? "none" : "0 0 14px 2px rgba(168,85,247,0.22)",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              >
                {isLoading ? (
                  <>
                    <motion.span
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* ── Footer strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            className="text-xs tracking-widest"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(90deg, #00f5ff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            YASH.DEV
          </span>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} — Built with React, Tailwind & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}