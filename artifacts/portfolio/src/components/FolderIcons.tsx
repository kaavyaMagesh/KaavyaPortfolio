import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Download, Maximize2, ExternalLink } from "lucide-react";
import { DraggableWindow } from "./DraggableWindow";
import { useIsMobile } from "@/hooks/use-mobile";

export function FolderIcons() {
  const isMobile = useIsMobile();
  const [isExpExpanded, setIsExpExpanded] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const folders = [
    { id: "resume", label: "Resume" },
    { id: "about", label: "About" },
  ];

  return (
    <>
      {/* Permanent, Non-Draggable Locked Experience Window Pinned to Top-Right */}
      <div 
        className={isMobile ? "relative w-full z-30 cyber-window rounded-none overflow-hidden flex flex-col border-amber-500/40 bg-black/90 shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.45)] hover:border-amber-500 transition-all duration-300 cursor-pointer group/exp" : "absolute top-6 right-10 w-[600px] z-30 cyber-window rounded-none overflow-hidden flex flex-col border-amber-500/40 bg-black/90 shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.45)] hover:border-amber-500 transition-all duration-300 cursor-pointer group/exp"}
        data-testid="window-experience"
        onClick={() => setIsExpExpanded(true)}
      >
        <div className="bg-amber-500/15 border-b border-amber-500/40 p-2.5 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="flex gap-1.5 ml-1">
              <div className="w-3 h-3 rounded-full bg-red-500/40 shadow-[0_0_3px_rgba(239,68,68,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/40 shadow-[0_0_3px_rgba(34,197,94,0.4)]" />
            </div>
            <span className="font-heading text-xs font-black tracking-widest text-amber-500 ml-2 uppercase">Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize2 size={13} className="text-amber-500 group-hover/exp:text-amber-400 group-hover/exp:scale-110 transition-all mr-1" />
          </div>
        </div>
        <div className="p-5 bg-black/40 grow">
          <div className="flex flex-col gap-4 max-h-[460px] overflow-y-auto pr-1.5 scrollbar-thin select-text">
            {/* Digital Post-it Note */}
            <div 
              className="relative p-6 sm:p-8 bg-yellow-100 dark:bg-yellow-250 text-neutral-900 border border-yellow-300 shadow-xl transform rotate-0.5 hover:rotate-0 transition-transform duration-300 min-h-[250px] flex flex-col justify-between"
              style={{
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05), 4px 4px 20px rgba(0,0,0,0.3)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%)'
              }}
            >
              {/* Folded corner ornament */}
              <div 
                className="absolute bottom-0 right-0 w-5 h-5 bg-yellow-300 dark:bg-yellow-400 border-t border-l border-yellow-400"
                style={{
                  boxShadow: '-2px -2px 5px rgba(0,0,0,0.15)'
                }}
              />
              
              {/* Piece of sticky tape */}
              <div className="absolute top-[-9px] left-1/2 transform -translate-x-1/2 w-28 h-6.5 bg-white/60 border border-white/40 shadow-sm rotate-[-1deg] flex items-center justify-center font-mono text-[10px] text-neutral-700 uppercase tracking-widest backdrop-blur-[1px] select-none font-bold">
                STICKY_MEM // EXP_01
              </div>
 
              <div className="flex flex-col gap-4.5 mt-3">
                <div className="border-b border-dashed border-neutral-400 pb-3">
                  <h3 className="font-heading text-base sm:text-lg font-black text-yellow-950 tracking-wide uppercase leading-tight">
                    Edunet Foundation (IBM SkillsBuild)
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                    <span className="font-mono text-xs sm:text-sm font-black text-amber-900 tracking-wider">AI Intern (Remote)</span>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://drive.google.com/file/d/1x7-q2GGf4IVYSQG70uhIlhrqx_o2l1ry/view?usp=drivesdk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[10px] font-extrabold text-amber-950 border border-amber-950/20 px-2 py-0.5 hover:bg-amber-950 hover:text-white transition-all flex items-center gap-1 rounded bg-yellow-300/40"
                      >
                        <ExternalLink size={10} />
                        VERIFY
                      </a>
                      <span className="font-mono text-[10px] sm:text-[11px] font-black text-neutral-800 bg-yellow-355/80 px-2.5 py-0.75 rounded border border-yellow-400/40">June 2025 - Jul 2025</span>
                    </div>
                  </div>
                </div>
 
                <ul className="list-disc pl-5 font-sans text-xs sm:text-sm md:text-[15px] space-y-3 text-neutral-800 leading-relaxed font-medium">
                  <li>Developed end-to-end machine learning pipelines using real-world datasets.</li>
                  <li>Performed data cleaning, feature engineering, model evaluation, and deployment.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Expanded Large Window in the Middle (Covers other tabs, retains exact same card design) */}
      <AnimatePresence>
        {isExpExpanded && (
          <DraggableWindow 
            title="system_experience" 
            onClose={() => setIsExpExpanded(false)} 
            initialPosition={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 320 : 300, y: 120 }} 
            id="window-experience-expanded"
            className="md:w-[640px] w-full border-amber-500 bg-black/95 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
            zIndexOverride={300}
            onlyCloseControl={true}
          >
            <div className="flex flex-col gap-4 p-1">
              {/* Styled sticky card list with custom scrollbar inside expanded modal */}
              <div className="max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent">
                {/* Digital Post-it Note */}
                <div 
                  className="relative p-6 sm:p-8 bg-yellow-100 text-neutral-900 border border-yellow-300 shadow-xl flex flex-col justify-between min-h-[300px]"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05), 4px 4px 20px rgba(0,0,0,0.3)',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%)'
                  }}
                >
                  {/* Folded corner ornament */}
                  <div 
                    className="absolute bottom-0 right-0 w-5 h-5 bg-yellow-300 border-t border-l border-yellow-400"
                    style={{
                      boxShadow: '-2px -2px 5px rgba(0,0,0,0.15)'
                    }}
                  />
                  
                  {/* Piece of sticky tape */}
                  <div className="absolute top-[-9px] left-1/2 transform -translate-x-1/2 w-28 h-6.5 bg-white/60 border border-white/40 shadow-sm rotate-[-1deg] flex items-center justify-center font-mono text-[10px] text-neutral-700 uppercase tracking-widest backdrop-blur-[1px] select-none font-bold">
                    STICKY_MEM // EXP_01
                  </div>

                  <div className="flex flex-col gap-4.5 mt-3">
                    <div className="border-b border-dashed border-neutral-400 pb-3">
                      <h3 className="font-heading text-base sm:text-lg font-black text-yellow-950 tracking-wide uppercase leading-tight">
                        Edunet Foundation (IBM SkillsBuild)
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                        <span className="font-mono text-xs sm:text-sm font-black text-amber-900 tracking-wider">AI Intern (Remote)</span>
                        <div className="flex items-center gap-2">
                          <a 
                            href="https://drive.google.com/file/d/1x7-q2GGf4IVYSQG70uhIlhrqx_o2l1ry/view?usp=drivesdk" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] font-extrabold text-amber-950 border border-amber-950/20 px-2 py-0.5 hover:bg-amber-950 hover:text-white transition-all flex items-center gap-1 rounded bg-yellow-300/40"
                          >
                            <ExternalLink size={10} />
                            VERIFY
                          </a>
                          <span className="font-mono text-[10px] sm:text-[11px] font-black text-neutral-800 bg-yellow-355/80 px-2.5 py-0.75 rounded border border-yellow-400/40">June 2025 - Jul 2025</span>
                        </div>
                      </div>
                    </div>

                    <ul className="list-disc pl-5 font-sans text-xs sm:text-sm md:text-[15px] space-y-3.5 text-neutral-800 leading-relaxed font-medium">
                      <li>Developed end-to-end machine learning pipelines using real-world datasets.</li>
                      <li>Performed data cleaning, feature engineering, model evaluation, and deployment.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>

      {/* Folders laid out horizontally (adjacent to each other) shifted downwards */}
      <div className={isMobile ? "relative flex flex-row justify-center gap-5 my-6 w-full" : "absolute top-[450px] left-8 flex flex-row gap-5"}>
        {folders.map((folder, index) => (
          <motion.div
            key={folder.id}
            className="flex flex-col items-center gap-2.5 cursor-pointer group w-28"
            whileHover={{ y: -3, scale: 1.05 }}
            onClick={() => {
              if (folder.id === "resume") {
                window.open("https://drive.google.com/file/d/1lMOR7gQ33yj5tgyiAAktxXEKqHyoQo8t/view?usp=sharing", "_blank", "noopener,noreferrer");
              } else if (folder.id === "about") {
                window.dispatchEvent(new CustomEvent("open-about"));
              } else {
                setActiveWindow(folder.id);
              }
            }}
            data-testid={`folder-${folder.id}`}
          >
            <div className="relative">
              <Folder size={72} strokeWidth={1} className="text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors drop-shadow-[0_0_15px_rgba(255,0,170,0.65)]" />
              <div className="absolute inset-0 bg-white/10 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-mono text-sm text-primary-foreground bg-black/85 px-3 py-1.5 border border-primary/40 group-hover:bg-primary/30 tracking-wider shadow-[0_0_10px_rgba(255,0,170,0.3)] whitespace-nowrap font-bold">
              {folder.label}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeWindow === "resume" && (
          <DraggableWindow title="RESUME.pdf" onClose={() => setActiveWindow(null)} initialPosition={{ x: window.innerWidth / 2 - 200, y: 100 }} id="window-resume">
            <div className="flex flex-col items-center justify-center p-8 gap-6 text-center">
              <div className="w-16 h-20 bg-primary/20 border border-primary flex items-center justify-center animate-pulse-glow">
                <span className="font-heading font-bold text-primary">PDF</span>
              </div>
              <p className="font-mono text-sm text-foreground">ENCRYPTED_RESUME_DATA.pdf</p>
              <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black font-mono font-bold transition-all shadow-[0_0_10px_rgba(255,0,170,0.2)] hover:shadow-[0_0_20px_rgba(255,0,170,0.6)]">
                <Download size={16} />
                DOWNLOAD
              </button>
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
}