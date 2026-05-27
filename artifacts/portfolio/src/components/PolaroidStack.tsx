import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Trophy, Shield, Link2 } from "lucide-react";
import { DraggableWindow } from "./DraggableWindow";

export function PolaroidStack() {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState([0, 1, 2]);

  // Constantly cycle the stack order every 2.0 seconds for an active shuffling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift()!;
        next.push(first);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const basePolaroids = [
    { id: 1, color: "from-pink-500 to-purple-600", label: "HACKATHON", icon: Trophy, baseRotate: -6, baseX: 0, baseY: 0 },
    { id: 2, color: "from-blue-500 to-cyan-400", label: "SEC_ELITE", icon: Shield, baseRotate: 4, baseX: 25, baseY: -12 },
    { id: 3, color: "from-purple-500 to-indigo-600", label: "BLOCKCHAIN", icon: Link2, baseRotate: -3, baseX: 12, baseY: 25 },
  ];

  return (
    <>
      {/* Photo stack wrapper placed on the right of the camera */}
      <div 
        className="absolute top-8 left-[360px] w-[240px] h-[220px] flex flex-col items-center justify-between cursor-pointer group z-40"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full h-[160px]">
          {basePolaroids.map((p, index) => {
            const rank = order.indexOf(index); // 0 (bottom) to 2 (top)
            
            // Calculate offsets that dynamically shift based on card rank for depth feel
            const xOffset = p.baseX + (rank * 6);
            const yOffset = p.baseY - (rank * 4);
            const rotation = p.baseRotate + (rank * 1);

            return (
              <motion.div
                key={p.id}
                className="absolute bg-white p-2 pb-6 border border-primary/20"
                style={{
                  boxShadow: '0 8px 20px rgba(0,0,0,0.8), var(--cyber-glow)',
                }}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotate: rotation,
                  scale: rank === 2 ? 1.01 : 0.98,
                  zIndex: rank * 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 16,
                }}
                whileHover={{
                  rotate: 0,
                  y: yOffset - 10,
                  scale: 1.05,
                  zIndex: 100,
                  boxShadow: '0 18px 30px rgba(0,0,0,0.9), var(--cyber-glow-strong)'
                }}
                data-testid={`polaroid-${p.id}`}
              >
                <div className="w-[170px] h-[115px] bg-black relative overflow-hidden group flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-85 mix-blend-screen group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-0 border-[1px] border-primary/50 m-1.5" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100%_3px]" />
                  <p.icon className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" size={40} strokeWidth={1} />
                </div>
                <div className="absolute bottom-1 w-full text-center pr-4">
                  <p className="font-mono text-black font-extrabold text-[9px] uppercase tracking-widest">{p.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Desktop icon label below the achievements stack */}
        <span className="font-mono text-sm sm:text-base font-black text-primary drop-shadow-[0_0_10px_rgba(255,0,170,0.9)] tracking-widest uppercase bg-black/85 px-3 py-1 border border-primary/40 group-hover:bg-primary/30 group-hover:border-primary transition-all shadow-[0_0_8px_rgba(255,0,170,0.25)] select-none">
          Achievements
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <DraggableWindow 
            title="SYSTEM_ACHIEVEMENTS.txt" 
            onClose={() => setIsOpen(false)} 
            initialPosition={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 250 : 450, y: 150 }} 
            id="window-achievements"
            className="w-[500px]"
          >
            <div className="flex flex-col gap-5 font-mono text-sm sm:text-base text-primary-foreground max-h-[50vh] overflow-y-auto pr-1">
              <div className="border-b border-primary/30 pb-2.5 mb-1 flex items-center gap-2">
                <Trophy className="text-primary animate-bounce-slow" size={22} />
                <span className="text-primary font-black uppercase tracking-widest text-base">ACHIEVEMENTS LOADED</span>
              </div>

              {/* Achievement 1 */}
              <div className="p-4 border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors flex gap-3.5 items-start">
                <Trophy className="text-amber-400 mt-1 shrink-0" size={18} />
                <div className="space-y-2.5">
                  <p className="font-sans text-sm sm:text-[15px] text-foreground font-medium leading-relaxed">
                    Secured <span className="text-primary font-black">2nd Place</span> among 280+ teams in GDG GOC TechSprint Hackathon for building <span className="text-primary font-black">FixCity</span>.
                  </p>
                  <a 
                    href="https://drive.google.com/file/d/1sLE3TDmb3s4dl7kE8o0JugFfPEeSiJBR/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-primary/40 text-primary hover:bg-primary hover:text-black transition-colors rounded font-bold"
                  >
                    <ExternalLink size={12} />
                    VERIFY_CREDENTIAL
                  </a>
                </div>
              </div>

              {/* Achievement 2 */}
              <div className="p-4 border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors flex gap-3.5 items-start">
                <Award className="text-cyan-400 mt-1 shrink-0" size={18} />
                <div className="space-y-2.5">
                  <p className="font-sans text-sm sm:text-[15px] text-foreground font-medium leading-relaxed">
                    NPTEL Ethical Hacking — <span className="text-cyan-400 font-black">Elite + Silver Certification</span>
                  </p>
                  <a 
                    href="https://drive.google.com/file/d/1kft8sEZSUGRdZXfxSUr_HE9OdfysbGdM/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors rounded font-bold"
                  >
                    <ExternalLink size={12} />
                    VIEW_CERTIFICATE
                  </a>
                </div>
              </div>

              {/* Achievement 3 */}
              <div className="p-4 border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors flex gap-3.5 items-start">
                <Award className="text-emerald-400 mt-1 shrink-0" size={18} />
                <div className="space-y-2.5">
                  <p className="font-sans text-sm sm:text-[15px] text-foreground font-medium leading-relaxed">
                    NPTEL Blockchain and its Applications — <span className="text-emerald-400 font-black">Elite + Silver Certification</span>
                  </p>
                  <a 
                    href="https://drive.google.com/file/d/1RqUZg2ahDHVRWf6cCs1IpKwhCKpjKE97/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors rounded font-bold"
                  >
                    <ExternalLink size={12} />
                    VIEW_CERTIFICATE
                  </a>
                </div>
              </div>
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
}