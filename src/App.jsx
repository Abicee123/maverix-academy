import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ChevronRight, Cpu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'home', title: 'Home' },
  { id: 'program', title: 'Program' },
  { id: 'software', title: 'Software' },
  { id: 'benefits', title: 'Benefits' },
  { id: 'audience', title: 'Designed For' },
  { id: 'enrollment', title: 'Enrollment' }
];

const SOFTWARE_DETAILS = {
  'AutoCAD': { 
    title: 'AutoCAD', 
    desc: 'Master 2D drafting, dimensioning, and layer management. Learn to create professional floor plans, sections, elevations, and detailed construction drawings using industry-standard blueprint symbols and grid systems.' 
  },
  'SketchUp Pro': { 
    title: 'SketchUp Pro', 
    desc: 'Dive into 3D modeling with components, groups, and advanced materials. Learn rendering preparation, building massing, and how to generate perspective views and exploded diagrams.' 
  },
  'Lumion': { 
    title: 'Lumion', 
    desc: 'Transform your 3D models into stunning visualizations. Master the render pipeline, environmental settings, realistic lighting diagrams, vegetation placement, and cinematic camera paths.' 
  },
  'Autodesk Revit (BIM)': { 
    title: 'Autodesk Revit (BIM)', 
    desc: 'Understand Building Information Modeling (BIM). Create parametric families, detailed schedules, dynamic views, and coordinate structural and MEP systems seamlessly.' 
  },
  'Photoshop': { 
    title: 'Adobe Photoshop', 
    desc: 'Enhance architectural presentations through professional post-processing. Learn color grading, sky replacement, lighting correction, and advanced layer masking techniques.' 
  },
  'K-SMART': { 
    title: 'K-SMART', 
    desc: 'Industry-standard Structural Design & Detailing Software. Learn steel detailing, reinforcement layouts, and real-project workflows with accurate structural diagrams and foundation layouts.' 
  }
};

const BENEFITS_DETAILS = {
  'Industry Expert Mentors': {
    title: 'Industry Expert Mentors',
    desc: 'Learn directly from seasoned professionals actively working on high-level architectural and BIM projects. Gain exclusive insights into industry standards, advanced workflow optimizations, and practical problem-solving techniques that you won\'t find in standard textbooks.'
  },
  'Live Project Training': {
    title: 'Live Project Training',
    desc: 'Bridge the gap between theoretical knowledge and real-world execution. You will work on actual, ongoing construction and design projects, experiencing the true pressures, deadlines, and multi-disciplinary coordination required in the industry.'
  },
  'Portfolio Development': {
    title: 'Portfolio Development',
    desc: 'Your portfolio is your ultimate resume. We provide dedicated sessions to help you compile a professional, high-impact portfolio, guiding you on how to best showcase your renders, BIM models, and CAD drawings to stand out to top global employers.'
  },
  'Placement Assistance': {
    title: 'Placement Assistance',
    desc: 'Leverage our extensive network of leading architecture, interior design, and construction firms. We provide comprehensive career guidance, resume building workshops, interview preparation, and direct placement opportunities to launch your career.'
  }
};

const Logo = () => (
  <div className="flex items-center gap-2">
    <img 
      src="/assets/Logo.png" 
      alt="Maverix Academy Logo" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
    />
    {/* Fallback Icon */}
    <div className="hidden w-8 h-8 bg-[#102A43] rounded-lg items-center justify-center">
      <div className="w-4 h-4 border-2 border-[#16C5D8] rounded-tr-xl rounded-bl-xl" />
    </div>
    <div className="flex flex-col">
      <span className="font-playfair font-bold text-sm text-[#102A43] tracking-wider leading-none">MAVERIX</span>
      <span className="text-[8px] font-inter uppercase tracking-[0.2em] text-[#0FA3B1]">Academy</span>
    </div>
  </div>
);

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [activeSection, setActiveSection] = useState('home');
  const [activeModal, setActiveModal] = useState(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#F7FAFC] text-[#102A43] font-inter overflow-hidden min-h-screen">
      
      {/* GLOBAL STYLES FOR 3D */}
      <style dangerouslySetInnerHTML={{__html: `
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-[2000px] { perspective: 2000px; }
      `}} />

      {/* TOP NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white/70 backdrop-blur-3xl border border-white shadow-xl rounded-2xl flex items-center justify-between p-2 pl-6">
          <Logo />
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="relative px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#102A43] transition-colors hover:text-[#0B4F8C]"
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[#F7FAFC] border border-[#102A43]/5 rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[90vh] flex items-center pt-32">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -inset-10 bg-white/80 blur-2xl rounded-full md:hidden z-[-1]" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-5xl md:text-7xl font-playfair mb-6 leading-[1.1] text-[#102A43]">
                Build Skills.<br /> Build Portfolio.<br /> <span className="text-[#0B4F8C]">Build Your Future.</span>
              </h1>
              <p className="text-[#102A43]/70 max-w-sm mb-8 leading-relaxed font-inter">
                Ideal for students and professionals looking to build a career in Architectural Visualization, BIM & Digital Construction.
              </p>
              <button className="px-8 py-4 bg-[#102A43] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0B4F8C] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Admissions Open
              </button>
            </motion.div>
          </div>
        </section>

        {/* PROGRAM SECTION */}
        <section id="program" className="min-h-screen flex items-center py-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-playfair mb-8 text-[#102A43]">Master Diploma in<br/>Architectural Visualization & BIM</h2>
            <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-3xl border border-white/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-[#102A43] text-[#16C5D8] text-[10px] font-bold uppercase tracking-widest rounded-bl-3xl">
                4 Months
              </div>
              <h3 className="text-xl font-bold text-[#102A43] mb-4">Become Industry Ready</h3>
              <p className="text-[#102A43]/70 mb-6 font-inter text-sm leading-relaxed">
                A comprehensive program designed to transform theoretical knowledge into practical, industry-standard expertise.
              </p>
              <div className="flex flex-col gap-2 mt-6 p-4 bg-[#F7FAFC] rounded-2xl border border-[#102A43]/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0FA3B1]">Early Bird Offer</span>
                <div className="flex items-end gap-4">
                  <span className="text-3xl font-playfair font-bold text-[#102A43]">₹20,000</span>
                  <span className="text-sm font-inter text-[#102A43]/40 line-through mb-1">₹30,000</span>
                </div>
                <span className="text-xs font-bold text-[#0B4F8C]">Save ₹10,000 (First joining students only)</span>
              </div>
            </div>
          </div>
        </section>

        {/* SOFTWARE SECTION */}
        <section id="software" className="min-h-screen flex items-center py-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-playfair mb-8 text-[#102A43]">Software You<br/>Will Master</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['AutoCAD', 'SketchUp Pro', 'Lumion', 'Autodesk Revit (BIM)', 'Photoshop', 'K-SMART'].map((software, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setActiveModal({ type: 'software', data: SOFTWARE_DETAILS[software] })}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-3xl border border-white/80 shadow-lg relative overflow-hidden cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#16C5D8]/0 to-[#0FA3B1]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {software === 'K-SMART' && (
                    <span className="absolute top-0 right-0 bg-[#0FA3B1] text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase">Highlight</span>
                  )}
                  <h4 className="font-bold text-[#102A43] mb-2">{software}</h4>
                  <p className="text-[#102A43]/60 text-xs font-inter line-clamp-2">
                    {SOFTWARE_DETAILS[software].desc}
                  </p>
                  <div className="mt-4 text-[10px] font-bold text-[#0B4F8C] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ChevronRight size={12} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section id="benefits" className="min-h-screen flex items-center py-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-playfair mb-8 text-[#102A43]">What You Will Get</h2>
            <div className="space-y-4">
              {[
                { title: 'Industry Expert Mentors', desc: 'Learn from professionals working on real projects.' },
                { title: 'Live Project Training', desc: 'Work on real projects with practical exposure.' },
                { title: 'Portfolio Development', desc: 'Build a professional portfolio that stands out.' },
                { title: 'Placement Assistance', desc: 'Career guidance and placement support.' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => setActiveModal({ type: 'benefit', data: BENEFITS_DETAILS[item.title] })}
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-3xl border border-white/50 shadow-lg flex items-center gap-6 cursor-pointer hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F7FAFC] flex items-center justify-center border border-[#102A43]/10 text-[#0FA3B1] group-hover:bg-[#102A43] group-hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#102A43]">{item.title}</h4>
                    <p className="text-[#102A43]/60 text-xs mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCE SECTION */}
        <section id="audience" className="min-h-screen flex items-center py-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-playfair mb-8 text-[#102A43]">Designed For</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Diploma Students',
                'B.Tech Civil Students',
                'Architecture Students',
                'Interior Designers',
                'Working Professionals'
              ].map((aud, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#102A43] text-white border border-[#102A43] shadow-xl text-center">
                  <span className="font-bold text-sm">{aud}</span>
                  <p className="text-[#16C5D8] text-[10px] mt-2 font-inter uppercase tracking-widest">Enroll Now</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENROLLMENT SECTION */}
        <section id="enrollment" className="min-h-screen flex items-center py-20 relative z-20">
          <div className="w-full md:w-1/2">
            
            <div className="relative p-8 md:p-12 bg-white rounded-3xl shadow-2xl border border-[#102A43]/5 mt-10">
              {/* Top Accent & Limited Seats Badge */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#16C5D8] rounded-t-3xl" />
              <div className="absolute -top-3 right-8 bg-[#16C5D8] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                Limited Seats
              </div>

              <h2 className="text-4xl font-playfair mb-2 text-[#102A43]">Enrollment</h2>
              <p className="text-[#102A43]/60 text-sm font-inter mb-8">
                Secure your position for the upcoming architectural batch.
              </p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input 
                    type="text" 
                    placeholder="FULL NAME" 
                    className="w-full p-4 rounded-xl border border-[#102A43]/10 bg-[#F7FAFC] focus:bg-white focus:border-[#16C5D8] outline-none transition-all text-xs font-mono text-[#102A43] placeholder:text-[#102A43]/40"
                  />
                </div>
                
                <div>
                  <input 
                    type="tel" 
                    placeholder="PHONE NUMBER (+91)" 
                    className="w-full p-4 rounded-xl border border-[#102A43]/10 bg-[#F7FAFC] focus:bg-white focus:border-[#16C5D8] outline-none transition-all text-xs font-mono text-[#102A43] placeholder:text-[#102A43]/40"
                  />
                </div>

                <div className="relative pt-2">
                  <label className="absolute top-0 left-4 bg-white px-1 text-[8px] font-bold uppercase tracking-widest text-[#16C5D8] z-10 rounded">
                    Academic Background
                  </label>
                  <select className="w-full p-4 rounded-xl border border-[#102A43]/10 bg-[#F7FAFC] focus:bg-white focus:border-[#16C5D8] outline-none transition-all text-sm font-inter text-[#102A43] appearance-none cursor-pointer relative z-0">
                    <option>Working Professional</option>
                    <option>Architecture Student</option>
                    <option>B.Tech Civil Student</option>
                    <option>Diploma Student</option>
                    <option>Interior Designer</option>
                  </select>
                  <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#102A43]/40 rotate-90 pointer-events-none z-10 mt-1" />
                </div>

                <button className="w-full mt-2 py-4 bg-[#102A43] text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#0B4F8C] transition-all shadow-md">
                  Submit Application
                </button>
              </form>

              <hr className="my-8 border-[#102A43]/5" />

              <div className="text-center">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#102A43]/40 mb-3 block">Direct Contact Inquiry</span>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[#102A43] font-bold font-mono text-sm">
                  <span>+91 90614 52471</span>
                  <span className="hidden sm:block text-[#102A43]/20">|</span>
                  <span>+91 95675 43636</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full md:w-1/2 py-12 border-t border-[#102A43]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#102A43]/50 uppercase tracking-widest relative z-20">
          <p>© 2026 MAVERIX ACADEMY.</p>
          <div className="flex gap-6">
            <button onClick={() => setActiveModal({ type: 'terms', title: 'Privacy Policy' })} className="hover:text-[#0FA3B1] transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveModal({ type: 'terms', title: 'Terms of Service' })} className="hover:text-[#0FA3B1] transition-colors">Terms</button>
          </div>
        </footer>

      </main>

      {/* 3D BOOK ASSEMBLER */}
      <BookAssembler scrollYProgress={scrollYProgress} />

      {/* MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#102A43]/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F7FAFC] text-[#102A43]/40 hover:text-[#102A43] transition-colors"
              >
                <X size={20} />
              </button>

              {(activeModal.type === 'software' || activeModal.type === 'benefit') && (
                <>
                  <div className="w-12 h-12 rounded-xl bg-[#F7FAFC] border border-[#102A43]/10 flex items-center justify-center text-[#0FA3B1] mb-6">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-2xl font-playfair text-[#102A43] mb-4">{activeModal.data.title}</h3>
                  <p className="text-[#102A43]/70 font-inter text-sm leading-relaxed mb-4">
                    {activeModal.data.desc}
                  </p>
                </>
              )}

              {activeModal.type === 'terms' && (
                <>
                  <h3 className="text-2xl font-playfair text-[#102A43] mb-4">{activeModal.title}</h3>
                  <div className="text-[#102A43]/70 font-inter text-xs leading-relaxed max-h-[40vh] overflow-y-auto pr-4 space-y-4">
                    <p>By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                    <p>The materials contained in this website are protected by applicable copyright and trademark law. Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p>
                    <p>This is the grant of a license, not a transfer of title. Under this license you may not modify or copy the materials; use the materials for any commercial purpose, or for any public display.</p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const BookAssembler = ({ scrollYProgress }) => {
  const rotateY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 10]);
  const assembleProgress = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Shift the entire book down by 120px when exploded (at the top of the page) so the logo is clearly visible
  const masterY = useTransform(assembleProgress, [0, 1], [0, 120]);

  const xFront = useTransform(assembleProgress, [0, 1], [0, 300]);
  const yFront = useTransform(assembleProgress, [0, 1], [0, -80]);
  const zFront = useTransform(assembleProgress, [0, 1], [15, 200]);

  const xPage1 = useTransform(assembleProgress, [0, 1], [0, 150]);
  const yPage1 = useTransform(assembleProgress, [0, 1], [0, -40]);
  const zPage1 = useTransform(assembleProgress, [0, 1], [10, 100]);

  const xPage2 = useTransform(assembleProgress, [0, 1], [0, -150]);
  const yPage2 = useTransform(assembleProgress, [0, 1], [0, 40]);
  const zPage2 = useTransform(assembleProgress, [0, 1], [5, -100]);

  const xBack = useTransform(assembleProgress, [0, 1], [0, -300]);
  const yBack = useTransform(assembleProgress, [0, 1], [0, 80]);
  const zBack = useTransform(assembleProgress, [0, 1], [0, -200]);

  const hudRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const hudRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Premium feature: Mouse tracking for dynamic tilt when user is not scrolling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movements using physics-based springs
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate rotation based on cursor position relative to the center of the screen
      // Range is mapped to subtle rotation angles (-15 to +15 degrees)
      const rotateXVal = ((e.clientY / innerHeight) - 0.5) * -30; 
      const rotateYVal = ((e.clientX / innerWidth) - 0.5) * 30;

      mouseX.set(rotateYVal);
      mouseY.set(rotateXVal);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/2 h-full pointer-events-none flex items-center justify-center z-0 perspective-[2000px] opacity-25 md:opacity-100 transition-opacity duration-300">
      {/* Outer wrapper manages the macro scroll-based rotations */}
      <motion.div 
        style={{ rotateY, rotateX, y: masterY }}
        className="transform-style-3d scale-[0.6] sm:scale-75 md:scale-100 translate-x-[15%] md:translate-x-0"
      >
        {/* Inner wrapper manages the micro mouse-based floating tilts */}
        <motion.div
          style={{ rotateX: smoothMouseY, rotateY: smoothMouseX }}
          className="relative w-[320px] h-[450px] transform-style-3d"
        >
          {/* HUD ELEMENTS */}
          <motion.div 
            style={{ rotateZ: hudRotate }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d z-[-10]"
          >
            <div className="w-[800px] h-[800px] absolute border-[0.5px] border-[#16C5D8]/20 rounded-full" />
            <div className="w-[600px] h-[600px] absolute border-[1px] border-dashed border-[#16C5D8]/30 rounded-full" />
            <div className="w-[400px] h-[400px] absolute border-[0.5px] border-[#0B4F8C]/20 rounded-full" />
            <div className="w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-[#16C5D8]/40 to-transparent absolute" />
            <div className="w-[1px] h-[1000px] bg-gradient-to-b from-transparent via-[#16C5D8]/40 to-transparent absolute" />
            
            <motion.div style={{ rotateZ: hudRotateReverse }} className="absolute w-[600px] h-[600px]">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#16C5D8] rounded-full shadow-[0_0_10px_#16C5D8]" />
              <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-[#0FA3B1] rounded-full shadow-[0_0_5px_#0FA3B1]" />
            </motion.div>

            <span className="absolute top-[-100px] left-[100px] text-[#16C5D8]/60 font-mono text-[10px] tracking-widest">θ = 45.02°</span>
            <span className="absolute bottom-[200px] right-[-200px] text-[#16C5D8]/60 font-mono text-[10px] tracking-widest">X: 120.4, Y: -45.2, Z: 1.0</span>
            <span className="absolute top-[200px] right-[100px] text-[#16C5D8]/60 font-mono text-[10px] tracking-widest">Δv = a(1 - cos θ)</span>
            <span className="absolute bottom-[-50px] left-[-150px] text-[#16C5D8]/60 font-mono text-[10px] tracking-widest">RENDER_PASS: ACTIVE</span>
          </motion.div>

          {/* FRONT COVER */}
          <motion.div 
            style={{ x: xFront, y: yFront, z: zFront }}
            className="absolute inset-0 bg-[#102A43] rounded-r-2xl shadow-2xl border-l-4 border-[#0FA3B1]/50 backface-hidden transform-style-3d"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
            <div className="absolute inset-2 border border-[#FFFFFF]/10 rounded-r-xl border-dashed" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <img 
                src="/assets/Logo.png" 
                alt="Maverix Logo" 
                className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_15px_rgba(22,197,216,0.5)]"
                onError={(e) => e.target.style.display = 'none'}
              />
              <h1 className="text-2xl font-playfair text-[#FFFFFF] tracking-widest text-center shadow-black/50 drop-shadow-md">
                MAVERIX
              </h1>
              <h2 className="text-[10px] font-inter text-[#16C5D8] tracking-[0.3em] uppercase mt-2">
                Academy
              </h2>
              <div className="w-12 h-[1px] bg-[#16C5D8]/50 my-6" />
              <p className="text-[#FFFFFF]/60 text-[8px] uppercase tracking-widest text-center font-mono">
                Vol I. Advanced BIM<br/>& Architectural Vis.
              </p>
            </div>
          </motion.div>

          {/* PAGE 1 */}
          <motion.div 
            style={{ x: xPage1, y: yPage1, z: zPage1 }}
            className="absolute inset-0 bg-white rounded-r-xl shadow-lg border-l border-[#102A43]/10 overflow-hidden transform-style-3d"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0FA3B11A_1px,transparent_1px),linear-gradient(to_bottom,#0FA3B11A_1px,transparent_1px)] bg-[size:10px_10px]" />
            <div className="p-6 relative h-full flex flex-col">
              <h3 className="text-[#102A43] font-mono text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-[#102A43]/10 pb-2">BIM Coordinate Mapping</h3>
              <div className="flex-1 border-2 border-[#0B4F8C] relative bg-white">
                <div className="absolute top-4 left-4 w-16 h-16 border border-[#16C5D8] rounded-full flex items-center justify-center text-[#102A43] text-[8px] font-mono">TOP</div>
                <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 20 80 L 80 80 L 80 20 L 50 10 L 20 20 Z" fill="none" stroke="#102A43" strokeWidth="0.5"/>
                  <line x1="20" y1="20" x2="80" y2="80" stroke="#0FA3B1" strokeWidth="0.5" strokeDasharray="2,2"/>
                  <line x1="20" y1="80" x2="80" y2="20" stroke="#0FA3B1" strokeWidth="0.5" strokeDasharray="2,2"/>
                </svg>
              </div>
              <p className="text-[#102A43]/60 font-mono text-[6px] mt-4 uppercase">Fig 1. Spatial alignment grid for K-SMART structures.</p>
            </div>
          </motion.div>

          {/* PAGE 2 */}
          <motion.div 
            style={{ x: xPage2, y: yPage2, z: zPage2 }}
            className="absolute inset-0 bg-white rounded-r-xl shadow-lg border-l border-[#102A43]/10 overflow-hidden transform-style-3d"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#102A4305_1px,transparent_1px),linear-gradient(to_bottom,#102A4305_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="p-6 relative h-full flex flex-col justify-center items-center">
              <h3 className="text-[#102A43] font-playfair italic text-lg mb-6 border-b border-[#102A43]/20 pb-2">Structural Dynamics</h3>
              <div className="text-[#102A43] font-mono text-[10px] space-y-4 text-center">
                <p>M y'' + C y' + K y = F(t)</p>
                <div className="w-full h-[1px] bg-[#0FA3B1]/30 my-4" />
                <p>ω_n = √(K / M)</p>
                <p>ζ = C / (2 * √(K * M))</p>
                <div className="w-full h-[1px] bg-[#0FA3B1]/30 my-4" />
                <p className="text-[7px] text-[#102A43]/50">Applied in Revit & AutoCAD</p>
              </div>
              <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-[#16C5D8]/40 border-dashed animate-[spin_10s_linear_infinite]" />
            </div>
          </motion.div>

          {/* BACK COVER */}
          <motion.div 
            style={{ x: xBack, y: yBack, z: zBack }}
            className="absolute inset-0 bg-[#102A43] rounded-r-2xl shadow-xl border-r border-[#102A43] transform-style-3d flex items-center justify-center"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
            <img 
              src="/assets/Logo.png" 
              alt="Maverix Logo" 
              className="w-12 h-12 object-contain opacity-20 filter grayscale"
              onError={(e) => e.target.style.display = 'none'}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};