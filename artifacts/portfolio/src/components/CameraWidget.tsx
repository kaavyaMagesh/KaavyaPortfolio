import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import { DraggableWindow } from "./DraggableWindow";

export function CameraWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="absolute top-10 left-10 flex flex-col items-center gap-2 cursor-pointer group w-24"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        data-testid="widget-camera"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-900 border-2 border-primary/50 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:border-primary shadow-[0_0_15px_rgba(255,0,170,0.4)]">
          <div className="absolute inset-0 bg-white/10" />
          <div className="w-8 h-8 rounded-full border-4 border-black/50 bg-gradient-to-tr from-gray-400 to-white flex items-center justify-center z-10">
            <div className="w-3 h-3 rounded-full bg-blue-900" />
          </div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <span className="font-mono text-xs text-primary-foreground bg-black/50 px-2 py-0.5 border border-primary/30 group-hover:bg-primary/20">GALLERY.exe</span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <DraggableWindow title="Gallery_of_Achievements" onClose={() => setIsOpen(false)} initialPosition={{ x: 150, y: 100 }} id="gallery">
            <div className="grid grid-cols-2 gap-6 p-4 max-h-[60vh] overflow-y-auto">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="bg-white p-2 pb-8 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300 relative border border-primary/40"
                  style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5), var(--cyber-glow)' }}
                >
                  <div className={`w-full aspect-video bg-gradient-to-br from-primary/80 to-purple-800 mb-2 relative overflow-hidden`} />
                  <p className="font-mono text-black text-xs font-bold">PROJECT_0{i}.dat</p>
                  <p className="font-mono text-gray-600 text-[10px] mt-1">Tech Stack: React, Vite</p>
                </motion.div>
              ))}
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
}