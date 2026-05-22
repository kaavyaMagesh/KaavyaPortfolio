import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);

  return (
    <AnimatePresence>
      {!done && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="cyber-window relative bg-black/85 w-[500px] max-w-[90vw] pointer-events-auto"
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
                  setDone(true);
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
