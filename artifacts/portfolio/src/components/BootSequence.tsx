import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"pixels" | "window" | "done">("pixels");
  const [pixelsCleared, setPixelsCleared] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPixelsCleared(true);
      setTimeout(() => setPhase("window"), 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const cols = Math.ceil(window.innerWidth / 40);
  const rows = Math.ceil(window.innerHeight / 40);
  const centerX = cols / 2;
  const centerY = rows / 2;

  const maxDist = Math.sqrt(Math.pow(cols / 2, 2) + Math.pow(rows / 2, 2));

  const pixels = Array.from({ length: cols * rows }).map((_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Angle in [0, 2π] — spiral winds clockwise from top
    const angle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
    // Spiral delay: distance drives the main expansion, angle adds the twist
    const spiralOrder = dist / maxDist + angle / (Math.PI * 2) * 0.4;
    return { id: i, spiralOrder };
  });

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          {phase === "pixels" && (
            <div className="absolute inset-0 flex flex-wrap" style={{ width: cols * 40, height: rows * 40 }}>
              {pixels.map((p) => (
                <motion.div
                  key={p.id}
                  className="w-[40px] h-[40px]"
                  style={{
                    backgroundColor: Math.random() > 0.5 ? '#0a0014' : '#1a0033',
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: pixelsCleared ? 0 : 1 }}
                  transition={{ delay: pixelsCleared ? p.spiralOrder * 1.2 : 0, duration: 0.15 }}
                />
              ))}
            </div>
          )}

          {phase === "window" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="cyber-window relative bg-black/80 w-[500px] max-w-[90vw] pointer-events-auto"
              data-testid="boot-window"
            >
              <div className="bg-primary/20 border-b border-primary p-2 flex items-center">
                <div className="flex gap-1.5 ml-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 font-heading text-primary font-bold">INIT_PROTOCOL.exe</span>
              </div>
              <div className="p-6 font-mono text-primary-foreground min-h-[250px] flex flex-col text-sm md:text-base leading-relaxed">
                <BootText />
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                  onClick={() => {
                    setPhase("done");
                    setTimeout(onComplete, 300);
                  }}
                  className="mt-auto self-end bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-black px-6 py-2 uppercase font-bold tracking-widest transition-all duration-300"
                  style={{ boxShadow: 'var(--cyber-glow)' }}
                  data-testid="boot-enter"
                >
                  [ ENTER ]
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

function BootText() {
  const line1 = useTypewriter("SYSTEM BOOT... OK", 30, 0);
  const line2 = useTypewriter("IDENTIFYING USER... GUEST", 30, 800);
  const line3 = useTypewriter("ROLE: FULL STACK DEVELOPER", 30, 1600);
  const line4 = useTypewriter("STATUS: ONLINE ✓", 30, 2400);
  const line5 = useTypewriter("Welcome to the neon void.", 30, 3000);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-6">{line1.displayedText}</div>
      <div className="h-6">{line2.displayedText}</div>
      <div className="h-6 text-accent">{line3.displayedText}</div>
      <div className="h-6 text-green-400">{line4.displayedText}</div>
      <div className="h-6 mt-4 text-primary italic">{line5.displayedText}</div>
    </div>
  );
}