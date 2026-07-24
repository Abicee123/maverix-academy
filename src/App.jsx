import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ChevronRight, Calendar, MapPin, Mail, Phone, 
  BookOpen, Users, Trophy, MessageSquare, ArrowRight,
  GraduationCap, Cpu, Atom, Network, Layers, Box, PenTool,
  Sun, Moon, Pen, Monitor, Compass, Layout
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero', title: 'Home', icon: Box },
  { id: 'about', title: 'The Academy', icon: BookOpen },
  { id: 'curriculum', title: 'Curriculum', icon: Layers },
  { id: 'software', title: 'Software', icon: Cpu },
  { id: 'admissions', title: 'Admissions', icon: MessageSquare }
];

const SOFTWARE_STACK = [
  { name: "AutoCAD", desc: "Precision 2D/3D Drafting", icon: PenTool, color: "text-red-500" },
  { name: "SketchUp Pro", desc: "Intuitive 3D Modeling", icon: Box, color: "text-blue-500" },
  { name: "Lumion", desc: "Real-time 3D Rendering", icon: Monitor, color: "text-teal-500" },
  { name: "Autodesk Revit", desc: "BIM Architecture", icon: Layers, color: "text-indigo-500" },
  { name: "Photoshop", desc: "Post-Processing", icon: Pen, color: "text-sky-500" },
  { name: "K-SMART", desc: "Structural Detailing", icon: Cpu, color: "text-yellow-600", highlight: true }
];

const MaverixLogo = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80 L40 20 L55 50 L25 80 Z" className="fill-[var(--text-heading)] transition-colors duration-500" />
    <path d="M45 50 L60 20 L90 80 L75 80 L65 60 L45 60 Z" fill="#0D9488" />
    <path d="M50 70 L60 70 L55 80 Z" className="fill-[var(--text-heading)] transition-colors duration-500" />
  </svg>
);

const GlassPanel = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay }}
    className={`relative overflow-hidden rounded-2xl bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--panel-border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--highlight)] to-transparent pointer-events-none opacity-20" />
    <div className="relative z-10 p-8 md:p-12">{children}</div>
  </motion.div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`flex flex-col justify-center py-24 min-h-screen ${className}`}>
    {children}
  </section>
);

const AssemblingBook = ({ scrollYProgress }) => {
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 35, damping: 25, mass: 0.5, restDelta: 0.001 });

  const bookX = useTransform(smoothProgress, [0.2, 0.4], ["0vw", "10vw"]);
  const bookScale = useTransform(smoothProgress, [0, 0.2, 0.4, 1], [0.5, 0.8, 1.2, 1.2]);
  
  const bookRotateX = useTransform(smoothProgress, [0, 0.2, 0.4, 1], [60, 45, 15, 15]);
  const bookRotateY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.9, 1], [45, 30, -10, -10, 20]);
  const bookRotateZ = useTransform(smoothProgress, [0, 0.2, 1], [-20, -10, -5]);

  const backCoverZ = useTransform(smoothProgress, [0, 0.2], [-500, -4]);
  const backCoverOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  
  const spineX = useTransform(smoothProgress, [0, 0.2], [-200, 0]);
  const spineOpacity = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);

  const page4Z = useTransform(smoothProgress, [0, 0.2], [200, 1]);
  const page3Z = useTransform(smoothProgress, [0, 0.2], [300, 2]);
  const page2Z = useTransform(smoothProgress, [0, 0.2], [400, 3]);
  const page1Z = useTransform(smoothProgress, [0, 0.2], [500, 4]);
  
  const frontCoverZ = useTransform(smoothProgress, [0, 0.2], [800, 6]);
  const frontCoverOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);

  const coverTurn = useTransform(smoothProgress, [0.4, 0.55], [0, -165]);
  const page1Turn = useTransform(smoothProgress, [0.50, 0.65], [0, -160]);
  const page2Turn = useTransform(smoothProgress, [0.60, 0.75], [0, -155]);
  const page3Turn = useTransform(smoothProgress, [0.70, 0.85], [0, -150]);
  const page4Turn = useTransform(smoothProgress, [0, 1], [0, 0]);

  const solidPageClass = "absolute inset-0 bg-[var(--book-inner)] border border-[var(--panel-border)] rounded-r-2xl p-6 overflow-hidden backface-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,0.02)] transition-colors duration-500";

  /* UNIQUE INNER PAGES - NO REPEATED LOGOS */
  const PAGE_CONTENTS = [
    // Page 4 (Bottom) - Mathematical / Global Illumination
    <div className="h-full flex flex-col relative" key="p4">
      <div className="border-b border-[var(--panel-border)] pb-2 mb-4 flex justify-between items-center">
          <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-teal-600 font-semibold">Eq 1. Global Illumination</span>
          <Atom size={10} className="text-teal-500/50"/>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative p-4">
          <div className="text-[9px] font-serif text-[var(--text-heading)] mb-6 text-center leading-loose transition-colors duration-500">
             <span className="text-[var(--text-main)] transition-colors duration-500">L<sub>o</sub>(x, ω<sub>o</sub>)</span> = 
             L<sub>e</sub>(x, ω<sub>o</sub>) + 
             <span className="text-teal-500"> ∫<sub>Ω</sub></span> f<sub>r</sub>(x, ω<sub>i</sub>, ω<sub>o</sub>) L<sub>i</sub>(x, ω<sub>i</sub>) (ω<sub>i</sub> ⋅ n) dω<sub>i</sub>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-24 stroke-[var(--text-muted)] fill-none" strokeWidth="0.5">
              <path d="M 10,90 Q 50,80 90,90" strokeDasharray="2 2"/>
              <line x1="50" y1="90" x2="50" y2="20" className="stroke-teal-500" strokeDasharray="4 2"/>
              <line x1="20" y1="20" x2="50" y2="90" className="stroke-[var(--text-main)]" />
              <line x1="50" y1="90" x2="80" y2="40" className="stroke-[var(--text-main)]" />
              <circle cx="50" cy="90" r="2" className="fill-teal-500 stroke-none" />
          </svg>
      </div>
    </div>,
    
    // Page 3 - Structural Matrix
    <div className="h-full flex flex-col" key="p3">
      <div className="border-b border-[var(--panel-border)] pb-2 mb-4 flex justify-between items-center">
          <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-teal-600 font-semibold">Fig 2. Stiffness Matrix</span>
          <Layers size={10} className="text-teal-500/50"/>
      </div>
      <div className="flex-1 relative flex flex-col items-center justify-center p-4">
          <div className="font-mono text-[7px] text-[var(--text-heading)] leading-relaxed tracking-widest text-center w-full mb-6 font-semibold">
              [ K ] &#123; U &#125; = &#123; F &#125;
          </div>
          <div className="grid grid-cols-4 gap-1 w-full p-2 border-l border-r border-teal-500/30">
             {[...Array(16)].map((_, i) => (
                 <div key={i} className={`h-4 border-[0.5px] border-[var(--panel-border)] flex items-center justify-center text-[5px] font-mono transition-colors duration-500 ${i===0||i===5||i===10||i===15 ? 'text-teal-600 bg-teal-500/5 font-bold' : 'text-[var(--text-muted)]'}`}>
                    k<sub>{Math.floor(i/4)+1}{i%4+1}</sub>
                 </div>
             ))}
          </div>
      </div>
    </div>,

    // Page 2 - Isometric / Orthographic Shapes
    <div className="h-full flex flex-col" key="p2">
      <div className="border-b border-[var(--panel-border)] pb-2 mb-4 flex justify-between items-center">
          <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-teal-600 font-semibold">Fig 1. Spatial Proj.</span>
          <Compass size={10} className="text-teal-500/50"/>
      </div>
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden p-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <svg viewBox="0 0 100 100" className="w-full h-32 stroke-teal-600 fill-none relative z-10" strokeWidth="0.5">
              <polygon points="50,20 80,35 50,50 20,35" className="fill-teal-500/10" />
              <polygon points="20,35 50,50 50,85 20,70" className="fill-teal-500/5" />
              <polygon points="80,35 50,50 50,85 80,70" className="fill-teal-500/20" />
              <line x1="50" y1="20" x2="50" y2="0" className="stroke-[var(--text-muted)] transition-colors duration-500" strokeDasharray="1 2"/>
              <circle cx="50" cy="50" r="1.5" className="fill-[var(--text-heading)] stroke-none" />
          </svg>
      </div>
    </div>,
    
    // Page 1 (Top) - Preface / Introduction (Replaced Logo)
    <div className="h-full flex flex-col relative" key="p1">
      <div className="flex-1 border-[0.5px] border-[var(--panel-border)] p-6 flex flex-col items-center justify-center relative">
          <div className="absolute top-4 left-4 w-2 h-2 border-l border-t border-teal-500" />
          <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-teal-500" />
          
          <h3 className="text-sm font-serif tracking-[0.2em] text-[var(--text-heading)] text-center leading-none uppercase">Module 01</h3>
          <p className="mt-2 text-[6px] font-mono tracking-[0.4em] text-teal-600 uppercase font-bold text-center">Architectural Formations</p>
          
          <div className="w-8 h-[1px] bg-[var(--panel-border)] my-6" />
          
          <p className="text-[6px] font-mono text-center text-[var(--text-muted)] uppercase tracking-widest leading-loose">
            The foundation of<br/>
            spatial logic &<br/>
            structural integrity<br/>
            via precise visualization.
          </p>
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 perspective-[2500px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[10vw]">
        <div className="animate-float preserve-3d">
          <motion.div
            className="relative w-[280px] h-[390px] md:w-[360px] md:h-[500px] preserve-3d will-change-transform"
            style={{ x: bookX, scale: bookScale, rotateX: bookRotateX, rotateY: bookRotateY, rotateZ: bookRotateZ }}
          >
            {/* Spine */}
            <motion.div
              className="absolute left-0 top-0 w-[40px] h-full origin-left preserve-3d bg-[var(--book-spine)] border-l border-t border-b border-[var(--panel-border)] rounded-l-md shadow-sm transition-colors duration-500"
              style={{ rotateY: -90, x: spineX, opacity: spineOpacity }}
            >
              <div className="w-full h-full flex flex-col items-center justify-between py-12 opacity-80">
                <div className="w-4 h-[1px] bg-teal-500/50" />
                <div className="text-[8px] font-mono text-[var(--text-heading)] tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap font-bold transition-colors duration-500">Maverix Academy</div>
                <div className="w-4 h-[1px] bg-teal-500/50" />
              </div>
            </motion.div>

            {/* Back Cover - Minimalist, NO LOGO */}
            <motion.div 
              className="absolute inset-0 preserve-3d" 
              style={{ transform: useTransform(backCoverZ, z => `translateZ(${z}px)`), opacity: backCoverOpacity }}
            >
              <div className="absolute inset-0 bg-[var(--book-spine)] border-[0.5px] border-[var(--panel-border)] rounded-r-3xl rounded-l-md backface-hidden transition-colors duration-500" style={{ transform: 'translateZ(1px)' }}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.05)_1px,transparent_1px)] bg-[size:20px_20px] rounded-r-3xl" />
              </div>
              <div className="absolute inset-0 bg-[var(--book-cover)] border border-[var(--panel-border)] rounded-l-3xl rounded-r-md shadow-lg flex flex-col items-center justify-center backface-hidden overflow-hidden transition-colors duration-500" style={{ transform: 'rotateY(180deg) translateZ(1px)' }}>
                 
                 {/* Minimalist Tech Details instead of Logo */}
                 <div className="absolute bottom-10 left-10 right-10 flex flex-col items-center border-t border-[var(--panel-border)] pt-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className="h-6 bg-[var(--text-muted)]" style={{ width: Math.random() * 3 + 1 + 'px' }} />
                      ))}
                    </div>
                    <div className="text-[6px] font-mono tracking-widest text-[var(--text-muted)] uppercase">LMA-2026 // VOL. 1</div>
                 </div>

              </div>
            </motion.div>

            {/* Pages */}
            {[
              { z: page4Z, rot: page4Turn, content: PAGE_CONTENTS[0] },
              { z: page3Z, rot: page3Turn, content: PAGE_CONTENTS[1] },
              { z: page2Z, rot: page2Turn, content: PAGE_CONTENTS[2] },
              { z: page1Z, rot: page1Turn, content: PAGE_CONTENTS[3] } 
            ].map((page, i) => (
              <motion.div
                key={i}
                className="absolute inset-y-1 left-[2px] right-2 origin-left preserve-3d will-change-transform"
                style={{ rotateY: page.rot, z: page.z }}
              >
                <div className={solidPageClass}>{page.content}</div>
                <div className={`${solidPageClass} !rounded-l-2xl !rounded-r-none`} style={{ transform: 'rotateY(180deg) translateZ(1px)' }}>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.02)_1px,transparent_1px)] bg-[size:10px_10px] rounded-l-2xl" />
                </div>
              </motion.div>
            ))}

            {/* Front Cover - Only place with Logo */}
            <motion.div
              className="absolute inset-0 origin-left preserve-3d will-change-transform"
              style={{ rotateY: coverTurn, z: frontCoverZ, opacity: frontCoverOpacity }}
            >
              <div className="absolute inset-0 border border-[var(--panel-border)] bg-[var(--book-cover)] rounded-r-3xl rounded-l-md overflow-hidden backface-hidden shadow-[20px_20px_40px_rgba(0,0,0,0.05)] transition-colors duration-500" style={{ transform: 'translateZ(1px)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-xl" />
                
                <div className="absolute inset-5 border-[0.5px] border-[var(--panel-border)] rounded-r-2xl rounded-l-sm p-8 flex flex-col items-center justify-center text-center bg-[var(--book-spine)]/30 backdrop-blur-sm">
                  <div className="w-20 h-20 mb-6 drop-shadow-md">
                    <MaverixLogo />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-[var(--text-heading)] font-normal transition-colors duration-500">MAVERIX</h1>
                  <div className="w-full flex items-center justify-center gap-2 mt-4 mb-2">
                    <div className="h-[1px] w-6 bg-teal-500/30" />
                    <p className="text-[8px] font-mono tracking-[0.4em] uppercase text-teal-600 font-bold">Academy</p>
                    <div className="h-[1px] w-6 bg-teal-500/30" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 right-8 text-center border-t border-[var(--panel-border)] pt-4">
                    <p className="text-[6px] font-mono tracking-widest text-[var(--text-muted)] uppercase transition-colors duration-500">Master Diploma In</p>
                    <p className="text-[8px] font-mono tracking-widest text-[var(--text-heading)] uppercase mt-1 transition-colors duration-500">Arch Viz & BIM</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border border-[var(--panel-border)] bg-[var(--book-spine)] rounded-l-3xl rounded-r-md backface-hidden shadow-inner transition-colors duration-500" style={{ transform: 'rotateY(180deg) translateZ(1px)' }}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.05)_1px,transparent_1px)] bg-[size:20px_20px] rounded-l-3xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    // Finetuned Intersection Observer for flawless tab indication
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Triggers exactly when section takes up the central view
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' } 
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`${isDark ? 'theme-dark' : 'theme-light'} relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-teal-500/30 selection:text-teal-900 overflow-x-hidden transition-colors duration-500`}>
      
      {/* Premium Typography & Variable Setup */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        
        :root {
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Plus Jakarta Sans', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }
        .font-mono { font-family: var(--font-mono); }

        .theme-light {
          --bg-main: #FAFAFA;
          --text-main: #475569;
          --text-heading: #0F172A;
          --text-muted: #94A3B8;
          --panel-bg: rgba(255, 255, 255, 0.7);
          --panel-border: rgba(148, 163, 184, 0.2);
          --highlight: rgba(13, 148, 136, 0.05);
          
          --book-cover: #FFFFFF;
          --book-spine: #F1F5F9;
          --book-inner: #FFFFFF;
        }
        .theme-dark {
          --bg-main: #0B1120;
          --text-main: #94A3B8;
          --text-heading: #F8FAFC;
          --text-muted: #475569;
          --panel-bg: rgba(15, 23, 42, 0.6);
          --panel-border: rgba(51, 65, 85, 0.5);
          --highlight: rgba(20, 184, 166, 0.05);

          --book-cover: #0F172A;
          --book-spine: #0B1120;
          --book-inner: #0F172A;
        }

        html { scroll-behavior: smooth; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />

      {/* Atmospheric Background Filters */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen transition-colors duration-1000" />
      </div>

      {/* 3D Background Elements wrapped in Depth of Field Blur */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AssemblingBook scrollYProgress={scrollYProgress} />
        {/* Soft overlay keeps the book visually subordinated to the main content */}
        <div className="absolute inset-0 bg-[var(--bg-main)]/40 backdrop-blur-[2px] transition-colors duration-500" />
      </div>

      {/* FLOATING PILL NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1100px]">
        <div className="flex items-center justify-between p-2 pl-3 bg-[var(--panel-bg)] backdrop-blur-xl border border-[var(--panel-border)] rounded-[2.5rem] transition-colors duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 pr-5 border-r border-[var(--panel-border)] cursor-pointer group shrink-0" onClick={() => window.scrollTo(0,0)}>
            <div className="w-9 h-9 bg-slate-900 rounded-[12px] flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <MaverixLogo className="text-white drop-shadow-md" />
            </div>
            <div className="flex flex-col justify-center pt-0.5">
              <span className="text-[12px] font-serif tracking-[0.15em] uppercase text-[var(--text-heading)] leading-none font-semibold transition-colors duration-500">Maverix</span>
              <span className="text-[7px] font-mono tracking-[0.3em] text-[var(--text-muted)] uppercase leading-[1.5] mt-[2px] font-bold">Academy</span>
            </div>
          </div>

          {/* Section Links */}
          <div className="flex items-center justify-center gap-1 flex-1 px-3 overflow-x-auto no-scrollbar mask-edges">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`relative flex items-center px-4 py-2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] transition-colors z-10 rounded-full whitespace-nowrap ${activeSection === section.id ? 'text-[var(--text-heading)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'}`}
              >
                <span className="relative z-10">{section.title}</span>
                {/* Active Tab Background Pill */}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeNavTabPill"
                    className="absolute inset-0 bg-[var(--text-heading)] rounded-full"
                    style={{ opacity: 0.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center pl-2 border-l border-[var(--panel-border)] shrink-0">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 rounded-full hover:bg-[var(--highlight)] transition-colors text-[var(--text-muted)] hover:text-teal-600 focus:outline-none"
              title="Toggle Theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

        </div>
      </nav>

      <main className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 pointer-events-none z-10 flex flex-col pt-24 md:pt-32 font-sans">
        <div className="w-full md:w-5/12 lg:w-1/2 pointer-events-auto flex flex-col pb-[10vh]">

          {/* HERO SECTION */}
          <section id="hero" className="relative w-full min-h-[90vh] flex flex-col justify-center py-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-teal-500/50" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-600 font-bold">
                  Premium Curriculum
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--text-heading)] mb-6 leading-[1.15] tracking-tight transition-colors duration-500">
                Master Diploma in<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                  Arch Visualization
                </span><br/>
                & BIM
              </h1>
              
              <p className="text-[var(--text-main)] max-w-lg text-sm md:text-base leading-relaxed mb-12 font-light border-l border-teal-500/30 pl-5 transition-colors duration-500">
                A highly specialized 4-month program engineered for architects, civil engineers, and designers. Build a world-class portfolio with industry-leading software and real-world project training.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                <button 
                  onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative overflow-hidden flex items-center justify-center gap-4 bg-[var(--text-heading)] text-[var(--bg-main)] px-8 py-4 rounded-lg font-mono text-[11px] uppercase tracking-widest hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-xl w-max"
                >
                  <span className="relative z-10 flex items-center gap-2 font-bold">
                    Begin Application
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          </section>

          {/* ABOUT SECTION */}
          <Section id="about">
            <GlassPanel>
              <h2 className="text-3xl font-serif text-[var(--text-heading)] mb-6 tracking-tight">The Academy</h2>
              <div className="space-y-6 text-[var(--text-main)] leading-relaxed text-sm font-light">
                <p>
                  Maverix Academy is designed for students and professionals looking to build a career in Architectural Visualization, BIM, and Digital Construction.
                </p>
                <p>
                  Learn from industry expert mentors working on real projects. We provide live project training to ensure you gain practical, hands-on exposure required by top firms.
                </p>
                <div className="pt-8 mt-8 border-t border-[var(--panel-border)] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-serif text-teal-600 mb-1">100%</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Placement Assist</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-teal-600 mb-1">Live</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Project Training</div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </Section>

          {/* CURRICULUM SECTION - REDESIGNED */}
          <Section id="curriculum">
            <h2 className="text-3xl font-serif text-[var(--text-heading)] mb-8 px-2 tracking-tight">Designed For</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "DIPLOMA\nSTUDENTS", desc: "CURRENTLY\nSTUDYING\n&\nPASSED\nOUT" },
                { title: "B.TECH\nCIVIL", desc: "STUDENTS\n&\nGRADUATES" },
                { title: "ARCHITECT", desc: "PURSUING\nOR\nCOMPLETED" },
                { title: "INTERIOR\nDESIGN", desc: "PURSUING\nOR\nCOMPLETED" }
              ].map((item, idx) => (
                <GlassPanel key={idx} className="!p-8 flex flex-col justify-start group hover:-translate-y-1 hover:border-teal-500/30 transition-all duration-300">
                  <h3 className="text-sm font-serif text-[var(--text-heading)] mb-6 uppercase tracking-[0.15em] whitespace-pre-line leading-relaxed group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] leading-[2.5] whitespace-pre-line transition-colors">
                    {item.desc}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </Section>

          {/* SOFTWARE STACK SECTION - REDESIGNED */}
          <Section id="software">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-3xl font-serif text-[var(--text-heading)] tracking-tight">Software Stack</h2>
              <Layout className="text-teal-500/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOFTWARE_STACK.map((software, idx) => {
                const Icon = software.icon;
                return (
                  <GlassPanel key={idx} className="!p-6 flex flex-col gap-4 group hover:border-teal-500/30 cursor-default">
                    <div className="flex items-center justify-between">
                       <div className={`w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--panel-border)] flex items-center justify-center ${software.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      {software.highlight && (
                        <span className="text-[8px] font-mono bg-yellow-500/10 text-yellow-600 border border-yellow-500/30 px-2 py-1 rounded uppercase tracking-widest">Core</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-sans font-semibold text-[var(--text-heading)] tracking-wide mb-1 transition-colors">
                        {software.name}
                      </h4>
                      <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest transition-colors">{software.desc}</p>
                    </div>
                  </GlassPanel>
                );
              })}
            </div>
          </Section>

          {/* ENROLLMENT SECTION - REDESIGNED */}
          <Section id="admissions" className="pb-12">
            <GlassPanel className="border-t-[3px] border-t-teal-500 relative overflow-visible">
              <div className="absolute -top-[14px] right-8 bg-teal-500 text-white shadow-lg px-4 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold">
                Limited Seats
              </div>
              
              <h2 className="text-3xl font-serif text-[var(--text-heading)] mb-2 tracking-tight mt-2">Enrollment</h2>
              <p className="text-[var(--text-main)] text-sm mb-8 font-light">Secure your position for the upcoming architectural batch.</p>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                
                {/* Custom Floating Label Inputs */}
                <div className="relative">
                  <input type="text" id="name" placeholder=" " className="peer w-full bg-[var(--bg-main)] border border-[var(--panel-border)] rounded-lg px-4 pt-5 pb-2 text-sm font-sans text-[var(--text-heading)] focus:outline-none focus:border-teal-500 transition-all placeholder-transparent" />
                  <label htmlFor="name" className="absolute left-4 top-1 text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-teal-500">
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input type="tel" id="phone" placeholder=" " className="peer w-full bg-[var(--bg-main)] border border-[var(--panel-border)] rounded-lg px-4 pt-5 pb-2 text-sm font-sans text-[var(--text-heading)] focus:outline-none focus:border-teal-500 transition-all placeholder-transparent" />
                  <label htmlFor="phone" className="absolute left-4 top-1 text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-teal-500">
                    Phone Number (+91)
                  </label>
                </div>

                <div className="relative">
                  <select defaultValue="" id="background" className="peer w-full bg-[var(--bg-main)] border border-[var(--panel-border)] rounded-lg px-4 pt-5 pb-2 text-sm font-sans text-[var(--text-heading)] focus:outline-none focus:border-teal-500 transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="text-[var(--text-muted)]">Select Background</option>
                    <option value="diploma">Diploma Student</option>
                    <option value="btech">B.Tech Civil</option>
                    <option value="arch">Architecture</option>
                    <option value="interior">Interior Designing</option>
                    <option value="prof">Working Professional</option>
                  </select>
                  <label htmlFor="background" className="absolute left-4 top-1 text-[9px] font-mono uppercase tracking-widest text-teal-500 transition-all">
                    Academic Background
                  </label>
                  <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none rotate-90" />
                </div>

                <button className="w-full relative overflow-hidden group bg-[var(--text-heading)] text-[var(--bg-main)] rounded-lg py-4 mt-4 transition-all hover:shadow-[0_0_20px_rgba(13,148,136,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                    Submit Application
                  </span>
                </button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-[var(--panel-border)] flex flex-col items-center justify-center gap-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Direct Contact Inquiry</span>
                <div className="flex gap-4 font-mono text-[var(--text-heading)] text-sm font-semibold">
                  <span className="hover:text-teal-600 cursor-pointer transition-colors">+91 90614 52471</span>
                  <span className="text-[var(--panel-border)]">|</span>
                  <span className="hover:text-teal-600 cursor-pointer transition-colors">+91 95675 43636</span>
                </div>
              </div>
            </GlassPanel>
          </Section>

        </div>
      </main>

      <footer className="relative z-20 w-full bg-[var(--panel-bg)] backdrop-blur-xl border-t border-[var(--panel-border)] transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
          <div>© {new Date().getFullYear()} MAVERIX ACADEMY. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-600 transition-colors">Online Classes</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}