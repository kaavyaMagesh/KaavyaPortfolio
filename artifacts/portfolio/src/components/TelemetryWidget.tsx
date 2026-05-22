import { motion } from "framer-motion";

export function TelemetryWidget() {
  return (
    <motion.div 
      className="absolute bottom-24 right-10 cyber-window p-4 w-[320px] bg-black/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      data-testid="widget-telemetry"
    >
      <div className="flex items-center justify-between mb-4 border-b border-primary/30 pb-2">
        <span className="font-heading text-xs text-primary font-bold tracking-widest">TELEMETRY.exe</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center border border-primary/20 p-2 bg-primary/5">
          {/* Wireframe Heart */}
          <div className="relative w-12 h-12 mb-2 animate-pulse-glow">
            <svg viewBox="0 0 32 32" className="w-full h-full stroke-primary fill-none stroke-[1.5]">
              <path d="M16 28 C16 28 4 20 4 10 C4 5 10 3 16 9 C22 3 28 5 28 10 C28 20 16 28 16 28 Z" />
              <path d="M16 24 C16 24 8 18 8 11 C8 7 12 6 16 10 C20 6 24 7 24 11 C24 18 16 24 16 24 Z" className="opacity-50" />
            </svg>
          </div>
          <span className="font-mono text-[10px] text-primary">CORE_TEMP</span>
        </div>

        <div className="flex flex-col items-center justify-center border border-primary/20 p-2 bg-primary/5">
          <div className="w-full h-12 relative flex items-center justify-center">
            {/* Minimal Map Placeholder */}
            <svg viewBox="0 0 100 50" className="w-full h-full stroke-primary fill-none stroke-[0.5] opacity-60">
              <path d="M10,20 Q20,10 30,25 T50,15 T70,30 T90,20 M20,30 Q40,40 60,35" />
            </svg>
            <div className="absolute w-2 h-2 bg-accent rounded-full animate-ping top-1/2 left-1/2" />
          </div>
          <span className="font-mono text-[10px] text-primary">GEO_LOC</span>
        </div>
      </div>

      <div className="mt-4 font-mono text-[11px] text-primary-foreground space-y-1">
        <div className="flex justify-between"><span>SYS_STATE</span><span className="text-green-400">STABLE</span></div>
        <div className="flex justify-between"><span>UPTIME</span><span>99.99%</span></div>
        <div className="flex justify-between"><span>THREATS</span><span>0</span></div>
        <div className="flex justify-between">
          <span>PING</span>
          <span>
            12ms <span className="cursor-blink">_</span>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between font-mono text-[10px] text-primary mb-1">
          <span>PERFORMANCE</span>
          <span>OPTIMAL</span>
        </div>
        <div className="w-full h-2 border border-primary/40 bg-black overflow-hidden p-[1px]">
          <motion.div 
            className="h-full bg-primary"
            animate={{ width: ["20%", "80%", "40%", "95%", "60%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}