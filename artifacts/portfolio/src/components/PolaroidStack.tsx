import { motion } from "framer-motion";

export function PolaroidStack() {
  const polaroids = [
    { id: 1, rotate: -6, color: "from-pink-500 to-purple-600", x: 0, y: 0, label: "SYS_CORE" },
    { id: 2, rotate: 4, color: "from-blue-500 to-cyan-400", x: 40, y: -20, label: "DATA_NODE" },
    { id: 3, rotate: -3, color: "from-purple-500 to-indigo-600", x: 20, y: 40, label: "UPLINK" },
    { id: 4, rotate: 8, color: "from-emerald-400 to-teal-600", x: 60, y: 20, label: "MATRIX" },
  ];

  return (
    <div className="absolute top-1/4 right-[20%] w-[300px] h-[300px]">
      {polaroids.map((p, index) => (
        <motion.div
          key={p.id}
          className="absolute bg-white p-3 pb-10 border border-primary/20 cursor-pointer"
          style={{
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            boxShadow: '0 10px 25px rgba(0,0,0,0.8), var(--cyber-glow)',
            zIndex: index
          }}
          whileHover={{
            rotate: 0,
            y: p.y - 15,
            scale: 1.05,
            zIndex: 50,
            boxShadow: '0 20px 30px rgba(0,0,0,0.9), var(--cyber-glow-strong)'
          }}
          data-testid={`polaroid-${p.id}`}
        >
          <div className="w-[180px] h-[180px] bg-black relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-80 mix-blend-screen group-hover:opacity-100 transition-opacity`} />
            <div className="absolute inset-0 border-[1px] border-primary/50 m-2" />
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100%_4px]" />
          </div>
          <div className="absolute bottom-3 w-full text-center pr-6">
            <p className="font-mono text-black font-bold text-xs uppercase tracking-widest">{p.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}