import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { useDraggable } from "@/hooks/useDraggable";

interface DraggableWindowProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
  id?: string;
}

export function DraggableWindow({ title, onClose, children, initialPosition = { x: 50, y: 50 }, className = "", id }: DraggableWindowProps) {
  const { position, handleMouseDown, isDragging } = useDraggable(initialPosition);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 100 : 50,
      }}
      className={`cyber-window rounded-none overflow-hidden flex flex-col min-w-[300px] ${className}`}
      data-testid={`window-${id || title.toLowerCase()}`}
    >
      <div 
        className="bg-primary/20 border-b border-primary/40 p-2 flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5 ml-1">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
          </div>
          <span className="font-heading text-xs font-bold tracking-widest text-primary ml-2 uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Minus size={14} className="cursor-pointer hover:text-white" />
          <Square size={12} className="cursor-pointer hover:text-white" />
          <X size={16} className="cursor-pointer hover:text-white" onClick={onClose} data-testid={`close-${id || title.toLowerCase()}`} />
        </div>
      </div>
      <div className="p-4 bg-black/60 grow">
        {children}
      </div>
    </motion.div>
  );
}