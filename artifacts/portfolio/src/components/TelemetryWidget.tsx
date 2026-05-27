import { motion } from "framer-motion";

export function TelemetryWidget() {
  const courses = [
    "Data Structures & Algorithms",
    "Machine Learning",
    "DBMS",
    "Operating Systems",
    "OOP",
    "Artificial Intelligence",
    "Statistics"
  ];

  return (
    <motion.div 
      className="absolute bottom-20 right-10 cyber-window p-4 w-[510px] bg-black/90 border-2 border-primary/50 shadow-[0_0_25px_rgba(255,0,170,0.25)]"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      data-testid="widget-telemetry"
    >
      <div className="flex items-center justify-between mb-2.5 border-b-2 border-primary/30 pb-1.5">
        <span className="font-heading text-base text-primary font-bold tracking-widest">ACADEMIC_TELEMETRY.exe</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ONLINE</span>
        </div>
      </div>

      {/* University Header */}
      <div className="mb-2.5 font-mono">
        <h4 className="font-heading text-lg text-foreground font-black tracking-wide leading-tight">
          SHIV NADAR UNIVERSITY, CHENNAI
        </h4>
        <p className="text-base text-primary-foreground font-semibold mt-0.5 leading-snug">
          B.Tech — Computer Science & Engineering
          <span className="text-primary font-semibold ml-1.5 text-base">(IoT Specialization)</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-3 mb-2.5">
        {/* CGPA display */}
        <div className="col-span-4 flex flex-col items-center justify-center border-2 border-primary/30 p-2 bg-primary/5 relative overflow-hidden group hover:border-primary/60 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent pointer-events-none" />
          <span className="font-heading text-3xl font-black text-primary drop-shadow-[0_0_10px_rgba(255,0,170,0.8)]">
            8.6
          </span>
          <span className="font-mono text-sm text-primary-foreground font-semibold mt-1 border-t border-primary/20 pt-0.5 w-full text-center tracking-wider">
            CGPA
          </span>
        </div>

        {/* Temporal telemetry */}
        <div className="col-span-8 flex flex-col justify-center border-2 border-primary/30 p-2 bg-primary/5 font-mono text-sm space-y-1 font-medium">
          <div className="flex justify-between border-b border-primary/15 pb-0.5">
            <span className="text-primary-foreground/60 font-semibold">SYS_CYCLE:</span>
            <span className="text-foreground font-semibold">2024 - 2028</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-foreground/60 font-semibold">SECTOR:</span>
            <span className="text-foreground font-semibold">CSE_IoT</span>
          </div>
        </div>
      </div>

      {/* Specialization Modules / Courses */}
      <div className="border-2 border-primary/20 bg-black/40 p-2.5 font-mono text-sm mb-2.5">
        <div className="text-sm text-primary font-bold uppercase tracking-wider mb-1.5 border-b border-primary/20 pb-0.5 flex justify-between">
          <span>COURSEWORK</span>
        </div>
        <div className="max-h-[80px] overflow-y-auto pr-1 flex flex-wrap gap-1.5 neon-scrollbar">
          {courses.map((course, idx) => (
            <span 
              key={idx} 
              className="px-2.5 py-0.75 bg-primary/10 border-2 border-primary/30 text-primary-foreground hover:bg-primary/20 hover:border-primary transition-all text-sm font-semibold leading-tight select-none"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* Degree Timeline / Progress bar */}
      <div>
        <div className="flex justify-between font-mono text-sm text-primary mb-1">
          <span className="font-bold">DEGREE PROGRESSION</span>
          <span className="font-bold">50% [SEMESTER 4]</span>
        </div>
        <div className="w-full h-2.5 border-2 border-primary/40 bg-black overflow-hidden p-[1px]">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}