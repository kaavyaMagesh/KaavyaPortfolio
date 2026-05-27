import { motion } from "framer-motion";
import { MessageSquare, Globe, Image as ImageIcon } from "lucide-react";

interface DockProps {
  onCommClick: () => void;
  onMediaClick: () => void;
  commNotificationCount: number;
}

export function Dock({ onCommClick, onMediaClick, commNotificationCount }: DockProps) {
  const icons = [
    { icon: MessageSquare, label: "COMM" },
    { icon: Globe, label: "NET" },
    { icon: ImageIcon, label: "MEDIA" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border-t border-x border-primary/40 px-8 py-4 rounded-t-xl flex gap-8 shadow-[0_-5px_25px_rgba(255,0,170,0.2)] z-[100]">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="relative group flex flex-col items-center justify-end cursor-pointer"
          whileHover={{ scale: 1.25, y: -10 }}
          onClick={() => {
            if (item.label === "COMM") {
              onCommClick();
            } else if (item.label === "MEDIA") {
              onMediaClick();
            }
          }}
          data-testid={`dock-${item.label.toLowerCase()}`}
        >
          {item.label === "COMM" && commNotificationCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)] z-10 select-none">
              {commNotificationCount}
            </div>
          )}
          <div className="absolute -top-10 bg-black border border-primary text-primary font-mono text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(255,0,170,0.4)]">
            {item.label}
          </div>
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(255,0,170,0.6)] transition-all">
            <item.icon className="text-primary" size={28} strokeWidth={1.5} />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5" />
        </motion.div>
      ))}
    </div>
  );
}