import { motion } from "framer-motion";
import { MessageSquare, Globe, Mail, Image as ImageIcon, Trash2 } from "lucide-react";

export function Dock() {
  const icons = [
    { icon: MessageSquare, label: "COMM" },
    { icon: Globe, label: "NET" },
    { icon: Mail, label: "MAIL" },
    { icon: ImageIcon, label: "MEDIA" },
    { icon: Trash2, label: "TRASH" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border-t border-x border-primary/40 px-6 py-3 rounded-t-xl flex gap-6 shadow-[0_-5px_20px_rgba(255,0,170,0.15)] z-[100]">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="relative group flex flex-col items-center justify-end cursor-pointer"
          whileHover={{ scale: 1.3, y: -8 }}
          data-testid={`dock-${item.label.toLowerCase()}`}
        >
          <div className="absolute -top-8 bg-black border border-primary text-primary font-mono text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {item.label}
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,170,0.5)] transition-all">
            <item.icon className="text-primary" size={20} strokeWidth={1.5} />
          </div>
          <div className="w-1 h-1 rounded-full bg-primary/50 mt-1" />
        </motion.div>
      ))}
    </div>
  );
}