import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DraggableWindow } from "./DraggableWindow";

export function CameraWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="absolute top-8 left-8 flex flex-col items-center gap-2 cursor-pointer group"
        whileHover={{ scale: 1.04 }}
        onClick={() => setIsOpen(true)}
        data-testid="widget-camera"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,0,170,0.55))' }}
      >
        {/* Label above */}
        <span className="font-mono text-[10px] text-primary/80 tracking-widest uppercase mb-1 group-hover:text-primary transition-colors">GALACTIC VIEWPORT</span>

        {/* Camera body */}
        <div className="relative" style={{ width: 220, height: 155 }}>
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
            {/* Screen content - gradient placeholder */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #1a4060 0%, #2d1040 40%, #1a0030 70%, #0a2040 100%)',
            }} />
            {/* Pink corner grid overlay */}
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
            CYBER-CAM 2000
          </div>

          {/* Strap lug left */}
          <div className="absolute top-[10px] left-[-5px] w-[8px] h-[20px] rounded-sm" style={{
            background: 'linear-gradient(90deg, #1a0010, #2a0018)',
            border: '1px solid rgba(255,0,170,0.4)',
          }} />
          {/* Strap lug right */}
          <div className="absolute top-[10px] right-[-5px] w-[8px] h-[20px] rounded-sm" style={{
            background: 'linear-gradient(90deg, #2a0018, #1a0010)',
            border: '1px solid rgba(255,0,170,0.4)',
          }} />
        </div>

        {/* Hover cursor hand indicator */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="font-mono text-[10px] text-primary tracking-widest">[ CLICK ]</span>
        </motion.div>

        {/* Label below */}
        <span
          className="font-mono text-[10px] text-primary/60 tracking-widest uppercase group-hover:text-primary transition-colors"
          style={{ marginTop: 4 }}
        >
          GALLERY.exe
        </span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <DraggableWindow title="Gallery_of_Achievements" onClose={() => setIsOpen(false)} initialPosition={{ x: 180, y: 60 }} id="gallery">
            <div className="grid grid-cols-2 gap-6 p-4 max-h-[60vh] overflow-y-auto">
              {[
                { name: 'PROJECT_01.dat', tech: 'React · TypeScript · Node.js', color: 'from-primary/80 to-purple-800' },
                { name: 'PROJECT_02.dat', tech: 'Next.js · PostgreSQL · Drizzle', color: 'from-purple-700 to-pink-900' },
                { name: 'PROJECT_03.dat', tech: 'Three.js · WebGL · GSAP', color: 'from-pink-800 to-violet-900' },
                { name: 'PROJECT_04.dat', tech: 'Python · FastAPI · Docker', color: 'from-violet-800 to-primary/60' },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className={`bg-white p-2 pb-8 relative`}
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.6), 0 0 15px rgba(255,0,170,0.3)',
                    border: '2px solid rgba(255,0,170,0.5)',
                  }}
                  whileHover={{ rotate: 0, y: -8, scale: 1.04, zIndex: 50 }}
                >
                  <div className={`w-full aspect-video bg-gradient-to-br ${p.color} mb-2 relative overflow-hidden`}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(rgba(255,0,170,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,170,0.1) 1px, transparent 1px)',
                      backgroundSize: '10px 10px',
                    }} />
                  </div>
                  <p className="font-mono text-black text-xs font-bold">{p.name}</p>
                  <p className="font-mono text-gray-500 text-[9px] mt-0.5">{p.tech}</p>
                </motion.div>
              ))}
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
}
