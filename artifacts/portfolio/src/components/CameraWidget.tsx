import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DraggableWindow } from "./DraggableWindow";
import { Folder, Code, Terminal, Layers } from "lucide-react";

export function CameraWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenProjects = () => setIsOpen(true);
    window.addEventListener("open-projects", handleOpenProjects);
    return () => window.removeEventListener("open-projects", handleOpenProjects);
  }, []);

  const projects = [
    {
      name: "Sherlock — Fintech Fraud Detection",
      meta: "Full-Stack · ML · Graph Theory · Jun–Jul 2025",
      tech: ["React", "Node.js", "PostgreSQL", "WebSockets", "Tailwind", "Framer Motion"],
      desc: [
        "Real-time Supply Chain Finance fraud detection system using a multi-layer risk engine.",
        "Graph theory + ML clustering (PCA/K-Means) to detect circular trade patterns."
      ],
      color: "from-blue-600 to-purple-800",
      github: "https://github.com/kaavyaMagesh/sherlock-scf-fraud-detection-system"
    },
    {
      name: "FixCity — Civic Hazard Reporting",
      meta: "Mobile · AI · Flutter",
      tech: ["Flutter", "Firebase", "Gemini API", "OpenStreetMaps"],
      desc: [
        "Integrates Gemini API to classify civic hazards and assess severity.",
        "GPS-based real-time hazard reporting with live status tracking.",
        "🥈 2nd Place among 280+ teams — GDG GOC TechSprint Hackathon."
      ],
      color: "from-pink-600 to-rose-900",
      github: "https://github.com/kaavyaMagesh/fixcity"
    },
    {
      name: "WorkVerse — Professional Network Platform",
      meta: "Full-Stack · Social · Web",
      tech: ["React", "Node.js", "Express", "MySQL", "JWT", "Multer"],
      desc: [
        "Professional networking and job platform with JWT authentication and RBAC.",
        "Feeds, search (users/posts/hashtags), one-to-one messaging, and connection workflows."
      ],
      color: "from-purple-600 to-indigo-900",
      github: "https://github.com/kaavyaMagesh/Workverse"
    },
    {
      name: "Crop Disease Detection",
      meta: "Machine Learning · Computer Vision",
      tech: ["Python", "TensorFlow/Keras", "MobileNetV2", "OpenCV"],
      desc: [
        "CNN-based crop disease classifier using MobileNetV2 transfer learning.",
        "~90% validation accuracy with data augmentation.",
        "Inference pipeline with disease classification, confidence scores, and treatment recommendations."
      ],
      color: "from-emerald-600 to-teal-900",
      github: "https://github.com/kaavyaMagesh/crop_disease_prediction_model"
    },
    {
      name: "Legal Analyser",
      meta: "ML · NLP · Collaborative",
      tech: ["Python", "Flask", "BERT", "BART", "OCR", "spaCy"],
      desc: [
        "NLP system for legal document summarization, risk detection, and clause extraction."
      ],
      color: "from-indigo-600 to-violet-900",
      github: "https://github.com/kaavyaMagesh/legal-analyser"
    },
    {
      name: "HugFit — AI Wellness App",
      meta: "Mobile · AI · Flutter",
      tech: ["Flutter", "Firebase", "Gemini API"],
      desc: [
        "AI-driven wellness application with mood-aware coaching, journaling, and habit tracking."
      ],
      color: "from-cyan-600 to-sky-900",
      github: "https://github.com/kaavyaMagesh/HugFit-Mental-Wellness-App"
    },
    {
      name: "Employee Salary Predictor",
      meta: "Machine Learning · Regression",
      tech: ["Python", "pandas", "scikit-learn", "matplotlib", "seaborn"],
      desc: [
        "Multivariate regression model predicting salaries from experience, education, and domain.",
        "Data cleaning, analysis, and visualization to evaluate model performance."
      ],
      color: "from-orange-600 to-amber-900",
      github: "https://github.com/kaavyaMagesh/Employee-Salary-Prediction-M.Kaavyashri"
    }
  ];

  return (
    <>
      <motion.div
        className="absolute top-8 left-8 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ scale: 1.25 }}
        whileHover={{ scale: 1.30 }}
        onClick={() => setIsOpen(true)}
        data-testid="widget-camera"
        style={{ 
          filter: 'drop-shadow(0 0 18px rgba(255,0,170,0.55))',
          transformOrigin: 'top left'
        }}
      >
        {/* Camera body */}
        <div className="relative mb-2" style={{ width: 220, height: 155 }}>
          {/* Main body */}
          <div
            className="absolute inset-0 rounded-[18px]"
            style={{
              background: 'linear-gradient(145deg, #2a0a1a 0%, #1a0010 40%, #0d0008 70%, #1e000e 100%)',
              border: '2.5px solid rgba(255,0,170,0.7)',
              boxShadow: '0 0 20px rgba(255,0,170,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)',
            }}
          />

          {/* Metallic top ridge */}
          <div
            className="absolute top-0 left-4 right-4 h-[6px] rounded-t-[18px]"
            style={{
              background: 'linear-gradient(90deg, #4a0020, #ff44aa, #cc0066, #ff44aa, #4a0020)',
              opacity: 0.8,
            }}
          />

          {/* LCD Screen */}
          <div
            className="absolute top-[18px] left-[14px]"
            style={{
              width: 118,
              height: 95,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #1a3a5c 0%, #0a1f3a 50%, #0d2b4a 100%)',
              border: '2px solid rgba(255,0,170,0.9)',
              boxShadow: '0 0 10px rgba(255,0,170,0.6), inset 0 0 8px rgba(0,0,0,0.8)',
              overflow: 'hidden',
            }}
          >
            {/* Screen scanlines */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            }} />
            {/* Screen content */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #1a4060 0%, #2d1040 40%, #1a0030 70%, #0a2040 100%)',
            }} />
            {/* Viewfinder Grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(255,0,170,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,170,1) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }} />
            {/* REC indicator */}
            <div className="absolute top-1.5 left-2 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 8, color: '#ff4444' }}>REC</span>
            </div>
            {/* Pink neon viewfinder corners */}
            <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-primary opacity-80" />
            <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-primary opacity-80" />
            <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-primary opacity-80" />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-primary opacity-80" />
          </div>

          {/* Lens assembly */}
          <div
            className="absolute"
            style={{ top: 22, right: 18, width: 70, height: 70 }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'linear-gradient(145deg, #3a0020, #1a0010)',
              border: '3px solid rgba(255,0,170,0.6)',
              boxShadow: '0 0 12px rgba(255,0,170,0.5)',
            }} />
            {/* Middle ring */}
            <div className="absolute inset-[8px] rounded-full" style={{
              background: 'linear-gradient(135deg, #222, #111)',
              border: '2px solid rgba(255,0,170,0.4)',
            }} />
            {/* Inner lens */}
            <div className="absolute inset-[18px] rounded-full" style={{
              background: 'radial-gradient(circle at 35% 35%, #2a3a5a, #050510 80%)',
              border: '1.5px solid rgba(100,150,255,0.4)',
              boxShadow: 'inset 0 0 8px rgba(0,0,80,0.8)',
            }} />
            {/* Lens reflection */}
            <div className="absolute rounded-full" style={{
              top: 22, left: 22, width: 10, height: 7,
              background: 'rgba(255,255,255,0.35)',
              borderRadius: '50%',
              transform: 'rotate(-30deg)',
            }} />
          </div>

          {/* Flash */}
          <div
            className="absolute"
            style={{
              top: 12, right: 97, width: 18, height: 12,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffe0f0, #ffaadd)',
              border: '1.5px solid rgba(255,0,170,0.5)',
              boxShadow: '0 0 6px rgba(255,200,240,0.6)',
            }}
          />

          {/* Mode dial */}
          <div
            className="absolute"
            style={{
              top: 130, right: 14, width: 22, height: 22,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3a0020, #1a0010)',
              border: '2px solid rgba(255,0,170,0.5)',
            }}
          >
            <div className="absolute inset-[5px] rounded-full bg-primary/30" />
          </div>

          {/* Shutter button */}
          <div
            className="absolute"
            style={{
              top: 7, right: 55, width: 16, height: 10,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #ff66bb, #cc0066)',
              border: '1.5px solid rgba(255,0,170,0.8)',
              boxShadow: '0 0 8px rgba(255,0,170,0.6)',
            }}
          />

          {/* Side grip texture */}
          <div className="absolute left-0 top-4 bottom-4 w-[6px] rounded-l-[18px]" style={{
            background: 'repeating-linear-gradient(0deg, rgba(255,0,170,0.15) 0px, rgba(255,0,170,0.05) 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 6px)',
          }} />

          {/* Bottom label */}
          <div className="absolute bottom-[10px] left-[14px]" style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 7,
            color: 'rgba(255,0,170,0.7)',
            letterSpacing: 2,
          }}>
            CYBER-CAM PROJECTS
          </div>
        </div>

        {/* Label below: Big, Bold, and Crystal Clear */}
        <span
          className="font-mono text-sm sm:text-base font-black text-primary drop-shadow-[0_0_10px_rgba(255,0,170,0.9)] tracking-widest uppercase"
          style={{ marginTop: 2 }}
        >
          PROJECTS.exe
        </span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <DraggableWindow 
            title="SYSTEM_PROJECTS.dat" 
            onClose={() => setIsOpen(false)} 
            initialPosition={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 430 : 260, y: 60 }} 
            id="gallery"
            className="w-[860px]"
            zIndexOverride={300}
            onlyCloseControl={true}
          >
            <div className="grid grid-cols-2 gap-5 p-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin select-text">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  className="p-5 border border-primary/30 hover:border-primary bg-black/60 shadow-[0_0_15px_rgba(255,0,170,0.1)] hover:shadow-[0_0_25px_rgba(255,0,170,0.3)] transition-all duration-300 flex flex-col justify-between"
                  whileHover={{ y: -4 }}
                >
                  <div>
                    {/* Project Header */}
                    <div className="border-b border-primary/20 pb-2.5 mb-3.5">
                      <h3 className="font-heading text-xl font-black text-primary tracking-wide drop-shadow-[0_0_12px_rgba(255,0,170,0.65)] leading-snug uppercase">
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors cursor-pointer">
                          {p.name}
                        </a>
                      </h3>
                      <span className="font-mono text-xs text-gray-300 block mt-2 tracking-widest font-black">
                        {p.meta}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="list-disc pl-5 font-sans text-sm sm:text-[14px] space-y-2 text-gray-300 leading-relaxed mb-4.5 font-normal">
                      {p.desc.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2.5 border-t border-primary/10">
                    {p.tech.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className="px-2.5 py-1 text-[11px] font-mono border border-accent/40 text-accent bg-accent/5 rounded font-black tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
}
