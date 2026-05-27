import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Trigger loading bar and welcome text sequentially
  useEffect(() => {
    const barTimer = setTimeout(() => {
      setShowLoadingBar(true);
    }, 2000);

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 3200);

    return () => {
      clearTimeout(barTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="cyber-window relative bg-black/90 w-[500px] max-w-[90vw] border-2 border-primary pointer-events-auto"
            data-testid="boot-window"
          >
            <div className="bg-primary/20 border-b border-primary p-2.5 flex items-center">
              <div className="flex gap-1.5 ml-1">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
              </div>
              <span className="ml-4 font-heading text-primary font-bold tracking-widest text-xs uppercase">INIT_PROTOCOL.exe</span>
            </div>
            <div className="p-6 font-mono text-primary-foreground min-h-[300px] flex flex-col text-sm md:text-base leading-relaxed">
              <BootText showLoadingBar={showLoadingBar} showWelcome={showWelcome} />
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8 }}
                onClick={() => {
                  setDone(true);
                  setTimeout(onComplete, 300);
                }}
                className="mt-6 self-end bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-black px-6 py-2.5 uppercase font-bold tracking-widest transition-all duration-300"
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

function BootText({ showLoadingBar, showWelcome }: { showLoadingBar: boolean; showWelcome: boolean }) {
  const line1 = useTypewriter("SYSTEM BOOT... OK", 25, 0);
  const line2 = useTypewriter("IDENTIFYING USER... GUEST", 25, 800);
  const line3 = useTypewriter("STATUS: ONLINE ✓", 25, 1600);
  const line4 = useTypewriter("Welcome to the Kaavya's Portfolio", 25, 3200);

  return (
    <div className="flex flex-col gap-3">
      <div className="h-6 font-bold text-gray-300">{line1.displayedText}</div>
      <div className="h-6 font-bold text-accent">{line2.displayedText}</div>
      <div className="h-6 font-bold text-green-400">{line3.displayedText}</div>
      
      {/* Loading bar */}
      <div className="h-8 flex flex-col justify-center">
        {showLoadingBar && (
          <motion.div 
            className="w-full h-3 border border-primary/50 bg-black/60 p-[1.5px] relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </div>

      <div className="h-8 mt-2 text-primary font-bold text-lg drop-shadow-[0_0_8px_rgba(255,0,170,0.5)]">
        {showWelcome && line4.displayedText}
      </div>
    </div>
  );
}
