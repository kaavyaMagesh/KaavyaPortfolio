import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DraggableWindow } from "./DraggableWindow";
import { Code, Server, Database, ChevronLeft, ChevronRight, Terminal, ExternalLink } from "lucide-react";

interface AboutMeWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutMeWidget({ isOpen, onClose }: AboutMeWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: "LANGUAGES",
      icon: Code,
      items: ["Python", "JavaScript", "Java", "Dart", "C", "SQL", "TypeScript"],
      color: "from-pink-500/25 to-purple-500/20 border-pink-500/40 text-pink-400 hover:border-pink-400"
    },
    {
      title: "FRAMEWORKS & TOOLS",
      icon: Server,
      items: ["React", "Flutter", "Node.js", "Express", "Firebase", "TensorFlow", "PyTorch", "scikit-learn", "Transformers", "Next.js", "MongoDB", "AWS"],
      color: "from-blue-500/25 to-cyan-500/20 border-blue-500/40 text-blue-400 hover:border-blue-400"
    },
    {
      title: "SKILLS & DOMAINS",
      icon: Database,
      items: ["Machine Learning", "NLP", "Computer Vision", "Full-Stack Dev", "REST APIs", "IoT", "Database Design", "Git"],
      color: "from-emerald-500/25 to-teal-500/20 border-emerald-500/40 text-emerald-400 hover:border-emerald-400"
    }
  ];

  const projects = [
    {
      name: "Sherlock — SCF Fraud Detection",
      github: "https://github.com/kaavyaMagesh/sherlock-scf-fraud-detection-system",
      desc: "Real-time Supply Chain Finance fraud detection using ML clustering and graph theory to identify circular trades."
    },
    {
      name: "FixCity — Hazard Reporting",
      github: "https://github.com/kaavyaMagesh/fixcity",
      desc: "Flutter app integrating Gemini API to classify civic hazards, severity, and map GPS coordinates in real-time."
    },
    {
      name: "WorkVerse — Social Career Network",
      github: "https://github.com/kaavyaMagesh/Workverse",
      desc: "Full-stack networking platform featuring secure RBAC JWT auth, real-time messaging, connections, and feed."
    },
    {
      name: "Crop Disease Detection CV",
      github: "https://github.com/kaavyaMagesh/crop_disease_prediction_model",
      desc: "MobileNetV2 transfer learning pipeline yielding ~90% accuracy in plant leaf disease classification."
    },
    {
      name: "Legal Analyser NLP",
      github: "https://github.com/kaavyaMagesh/legal-analyser",
      desc: "BERT/BART document summarization model designed for contract clause extraction and risk assessments."
    },
    {
      name: "HugFit — AI Wellness Ecosystem",
      github: "https://github.com/kaavyaMagesh/HugFit-Mental-Wellness-App",
      desc: "AI emotional wellness coach incorporating mood-driven reflection logs, journaling, and tracking."
    },
    {
      name: "Salary Predictor ML",
      github: "https://github.com/kaavyaMagesh/Employee-Salary-Prediction-M.Kaavyashri",
      desc: "Multivariate regression architecture estimating salaries from experience, education metrics, and domain."
    }
  ];

  const handlePrev = () => setActiveCategory(prev => (prev === 0 ? categories.length - 1 : prev - 1));
  const handleNext = () => setActiveCategory(prev => (prev === categories.length - 1 ? 0 : prev + 1));

  const triggerOpenProjects = () => {
    window.dispatchEvent(new CustomEvent("open-projects"));
    onClose();
  };

  if (!isOpen) return null;

  if (isExpanded) {
    return (
      <DraggableWindow
        title="About me"
        onClose={onClose}
        onExpand={() => setIsExpanded(false)}
        initialPosition={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 490 : 150, y: 60 }}
        id="about-me-expanded"
        className="w-[980px] border-primary/50 bg-black/95 shadow-[0_0_40px_rgba(255,0,170,0.5)]"
        zIndexOverride={350}
      >
        <div className="flex flex-col gap-6 p-3 font-mono text-sm leading-relaxed max-h-[72vh] overflow-y-auto neon-scrollbar select-text">
          {/* Top Section: Bio */}
          <div className="border-b border-primary/30 pb-4">
            <h2 className="font-heading text-2xl font-black tracking-wide text-white uppercase leading-none select-none">
              HI, I'M <span className="bg-gradient-to-r from-primary via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse font-extrabold drop-shadow-[0_0_8px_rgba(255,0,170,0.5)]">KAAVYASHRI MAGESH</span>
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base text-foreground font-medium leading-relaxed">
              I'm a <span className="text-cyan-400 font-bold">Computer Science major</span> who loves building intelligent systems at the intersection of <span className="text-primary font-bold">machine learning</span>, <span className="text-primary font-bold">full-stack engineering</span>, and <span className="text-cyan-400 font-bold">real-world impact</span>.
            </p>
          </div>

          {/* Middle Section: Tech Stack side-by-side */}
          <div>
            <div className="text-xs text-primary font-bold tracking-widest uppercase mb-3 border-b border-primary/20 pb-1 select-none">
              TECH STACK
            </div>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  className={`p-4 bg-gradient-to-b ${cat.color} border-2 rounded-xl flex flex-col gap-3 shadow-md`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span className="font-heading font-black text-xs tracking-wider uppercase text-white">
                      {cat.title}
                    </span>
                    <cat.icon size={16} className="text-white animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-2 py-0.5 bg-black/60 border border-white/10 text-[11px] font-mono rounded font-medium text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Project Portfolio (Viewable by scrolling down) */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="text-xs text-cyan-400 font-bold tracking-widest uppercase border-b border-cyan-500/30 pb-1 select-none">
              PROJECTS
            </div>
            <div className="grid grid-cols-2 gap-4 pb-4">
              {projects.map((proj, idx) => (
                <div 
                  key={idx} 
                  className="p-4 border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors flex flex-col gap-2 shadow-sm"
                >
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-heading text-sm sm:text-base font-bold text-primary hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {proj.name}
                    <ExternalLink size={13} className="shrink-0" />
                  </a>
                  <p className="font-sans text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DraggableWindow>
    );
  }

  return (
    <DraggableWindow
      title="About me"
      onClose={onClose}
      onExpand={() => setIsExpanded(true)}
      initialPosition={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 275 : 250, y: typeof window !== "undefined" ? window.innerHeight - 680 : 150 }}
      id="about-me"
      className="w-[550px] border-primary/50 bg-black/90 shadow-[0_0_30px_rgba(255,0,170,0.35)] z-[90]"
    >
      <div className="flex flex-col gap-5 p-2 font-mono text-sm leading-relaxed max-h-[520px] overflow-y-auto pr-1 select-text scrollbar-thin">
        {/* Holographic Intro Header */}
        <div className="relative border-b border-primary/30 pb-4 mb-1">
          <h2 className="font-heading text-2xl font-black tracking-wide text-white uppercase leading-none select-none">
            HI, I'M <span className="bg-gradient-to-r from-primary via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse font-extrabold drop-shadow-[0_0_8px_rgba(255,0,170,0.5)]">KAAVYASHRI MAGESH</span>
          </h2>

          <p className="mt-3 font-sans text-sm text-foreground font-semibold leading-relaxed">
            I'm a <span className="text-cyan-400 font-bold">Computer Science major</span> who loves building intelligent systems at the intersection of <span className="text-primary font-bold">machine learning</span>, <span className="text-primary font-bold">full-stack engineering</span>, and <span className="text-cyan-400 font-bold">real-world impact</span>.
          </p>
        </div>

        {/* 3D Wheel Framer style Tech Stack Wheel */}
        <div className="relative py-4 border border-primary/20 bg-primary/5 p-4 flex flex-col items-center">
          <div className="text-[10px] text-primary/70 tracking-widest uppercase font-bold mb-4 w-full border-b border-primary/20 pb-1 flex justify-between select-none">
            <span>TECH STACK</span>
            <span>CATEGORY {activeCategory + 1} OF 3</span>
          </div>

          {/* 3D Container viewport */}
          <div
            className="relative w-full h-[180px] flex items-center justify-center overflow-hidden"
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-[340px] h-[150px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {categories.map((cat, idx) => {
                  if (idx !== activeCategory) return null;

                  return (
                    <motion.div
                      key={cat.title}
                      className={`absolute w-full h-full p-4 bg-gradient-to-b ${cat.color} border-2 rounded-xl flex flex-col justify-between shadow-2xl`}
                      initial={{ rotateY: 75, translateZ: -180, opacity: 0, scale: 0.8 }}
                      animate={{ rotateY: 0, translateZ: 0, opacity: 1, scale: 1 }}
                      exit={{ rotateY: -75, translateZ: -180, opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 140, damping: 18 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <span className="font-heading font-black text-sm tracking-wider uppercase text-white">
                          {cat.title}
                        </span>
                        <cat.icon size={18} className="animate-pulse text-white" />
                      </div>

                      {/* Card Tags Grid with visible scrollbar & scroll reminder */}
                      <div className="relative pb-2">
                        <div className="flex flex-wrap gap-2 py-2 overflow-y-auto max-h-[75px] scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pr-1">
                          {cat.items.map((item, itemIdx) => (
                            <span
                              key={itemIdx}
                              className="px-2.5 py-1 bg-black/60 border border-white/15 text-[12px] font-mono rounded font-bold text-white"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        {/* Compact scroll indicator overlay */}
                        <div className="absolute bottom-[-6px] right-2 text-[9px] font-mono text-white/45 tracking-widest select-none uppercase flex items-center gap-1">
                          <span>[ scroll ▲▼ ]</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Left and Right navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-1 bg-black/70 border border-primary/40 text-primary hover:bg-primary hover:text-black p-1.5 rounded-full transition-colors z-20"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 bg-black/70 border border-primary/40 text-primary hover:bg-primary hover:text-black p-1.5 rounded-full transition-colors z-20"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Action Button: View Projects */}
        <div className="flex flex-col gap-3 mt-1">
          <button
            onClick={triggerOpenProjects}
            className="w-full flex items-center justify-center gap-2 py-3 border border-primary text-primary font-heading font-bold text-sm tracking-wider hover:bg-primary hover:text-black transition-all shadow-[0_0_12px_rgba(255,0,170,0.2)] hover:shadow-[0_0_20px_rgba(255,0,170,0.6)] cursor-pointer uppercase select-none rounded-none"
          >
            <Terminal size={16} className="animate-pulse" />
            VIEW PROJECTS
          </button>
        </div>
      </div>
    </DraggableWindow>
  );
}
