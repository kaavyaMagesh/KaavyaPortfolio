import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Download } from "lucide-react";
import { DraggableWindow } from "./DraggableWindow";

export function FolderIcons() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const folders = [
    { id: "resume", label: "Resume" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
  ];

  return (
    <>
      <div className="absolute top-10 right-10 flex flex-col gap-8">
        {folders.map((folder, index) => (
          <motion.div
            key={folder.id}
            className="flex flex-col items-center gap-2 cursor-pointer group w-24"
            whileHover={{ y: -4, scale: 1.05 }}
            onClick={() => setActiveWindow(folder.id)}
            data-testid={`folder-${folder.id}`}
          >
            <div className="relative">
              <Folder size={48} strokeWidth={1} className="text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors drop-shadow-[0_0_8px_rgba(255,0,170,0.5)]" />
              <div className="absolute inset-0 bg-white/10 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-mono text-xs text-primary-foreground bg-black/50 px-2 py-0.5 border border-primary/30 group-hover:bg-primary/20">
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

        {activeWindow === "projects" && (
          <DraggableWindow title="SYSTEM_PROJECTS" onClose={() => setActiveWindow(null)} initialPosition={{ x: window.innerWidth / 2 - 250, y: 150 }} id="window-projects">
            <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border border-primary/30 hover:border-primary bg-black/40 transition-colors">
                  <h3 className="font-heading text-lg text-primary mb-2">PROJECT_{i}</h3>
                  <p className="font-mono text-sm text-gray-400 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cyberpunk aesthetic loaded.</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-[10px] font-mono border border-accent/50 text-accent">React</span>
                    <span className="px-2 py-1 text-[10px] font-mono border border-accent/50 text-accent">Node.js</span>
                  </div>
                </div>
              ))}
            </div>
          </DraggableWindow>
        )}

        {activeWindow === "about" && (
          <DraggableWindow title="ABOUT_ME.txt" onClose={() => setActiveWindow(null)} initialPosition={{ x: window.innerWidth / 2 - 150, y: 200 }} id="window-about">
            <div className="p-4 font-mono text-sm leading-loose text-primary-foreground">
              <p className="mb-4">{">"} RUNNING PROFILE_EXTRACT...</p>
              <p className="mb-4">I am a digital architect navigating the neon-lit datescapes. Building scalable web experiences with a focus on aesthetic perfection and rigorous code quality.</p>
              <p>{">"} SKILLS: Frontend_Wizardry, Backend_Engineering, UI_Design</p>
              <p>{">"} STATUS: Ready for new bounties.</p>
              <p className="mt-4 animate-pulse">_</p>
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
}