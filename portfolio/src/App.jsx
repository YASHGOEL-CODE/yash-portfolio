import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ParticlesBackground from "./components/ParticlesBackground";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";

// Inject Google Fonts once
function FontLoader() {
  useEffect(() => {
    if (document.getElementById("pf-fonts")) return;
    const link = document.createElement("link");
    link.id = "pf-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaderDone = useCallback(() => setLoading(false), []);

  return (
    <>
      <FontLoader />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Cinematic loader */}
      {loading && <Loader onComplete={handleLoaderDone} />}

      {/*
        Root shell — z-index layers:
          0   → ParticlesBackground (fixed canvas)
          10  → section content
          50  → Navbar
          9997/9998 → Cursor
          9999 → Loader
      */}
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: "linear-gradient(160deg,#030312 0%,#06051a 55%,#0b0520 100%)" }}
      >
        <ParticlesBackground />

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    </>
  );
}