import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

const PIXEL_SIZE = 4;

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"build" | "dissolve" | "window" | "done">("build");

  const cols = useMemo(() => Math.ceil(window.innerWidth / PIXEL_SIZE), []);
  const rows = useMemo(() => Math.ceil(window.innerHeight / PIXEL_SIZE), []);
  const centerX = cols / 2;
  const centerY = rows / 2;
  const maxDist = Math.sqrt((cols / 2) ** 2 + (rows / 2) ** 2);

  const pixels = useMemo(() => {
    const palette = ['#000000', '#0a0005', '#ff00aa', '#cc0077', '#ff44bb', '#000000', '#ff0099', '#110000'];
    return Array.from({ length: cols * rows }).map((_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
      // Spiral order: distance is primary, angle adds the clockwise twist
      const spiralOrder = dist / maxDist + (angle / (Math.PI * 2)) * 0.45;
      const color = palette[Math.floor(Math.random() * palette.length)];
      return { id: i, spiralOrder, color };
    });
  }, [cols, rows, centerX, centerY, maxDist]);

  const BUILD_DURATION = 0.9; // total seconds for all pixels to appear

  useEffect(() => {
    // After all pixels have appeared, dissolve them
    const dissolveTimer = setTimeout(() => {
      setPhase("dissolve");
    }, BUILD_DURATION * 1000 + 200);

    // After dissolve, show boot window
    const windowTimer = setTimeout(() => {
      setPhase("window");
    }, BUILD_DURATION * 1000 + 200 + 400);

    return () => {
      clearTimeout(dissolveTimer);
      clearTimeout(windowTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Black base */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: phase === "dissolve" || phase === "window" ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Pixel grid — appears in spiral, then dissolves together */}
          {(phase === "build" || phase === "dissolve") && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ display: 'flex', flexWrap: 'wrap', width: cols * PIXEL_SIZE, height: rows * PIXEL_SIZE }}
            >
              {pixels.map((p) => (
                <motion.div
                  key={p.id}
                  style={{
                    width: PIXEL_SIZE,
                    height: PIXEL_SIZE,
                    backgroundColor: p.color,
                    flexShrink: 0,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: phase === "dissolve" ? 0 : 1,
                  }}
                  transition={
                    phase === "build"
                      ? { delay: p.spiralOrder * BUILD_DURATION * 0.85, duration: 0.08, ease: "easeOut" }
                      : { duration: 0.35, ease: "easeIn" }
                  }
                />
              ))}
            </div>
          )}

          {/* Boot protocol window */}
          {phase === "window" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="cyber-window relative bg-black/85 w-[500px] max-w-[90vw]"
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
            </div>
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
