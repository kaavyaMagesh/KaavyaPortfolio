import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square, Maximize2 } from "lucide-react";
import { useDraggable } from "@/hooks/useDraggable";

import { useIsMobile } from "@/hooks/use-mobile";

interface DraggableWindowProps {
  title: string;
  onClose?: () => void;
  onExpand?: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
  id?: string;
  zIndexOverride?: number;
  onlyCloseControl?: boolean;
  inlineOnMobile?: boolean;
}

export function DraggableWindow({ title, onClose, onExpand, children, initialPosition = { x: 50, y: 50 }, className = "", id, zIndexOverride, onlyCloseControl = false, inlineOnMobile = false }: DraggableWindowProps) {
  const isMobile = useIsMobile();
  const { position, handleMouseDown, isDragging } = useDraggable(initialPosition);
  const [activeWindow, setActiveWindow] = useState<string>("");

  const selfId = id || title;

  useEffect(() => {
    const handleFocus = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail && customEvent.detail.id) {
        setActiveWindow(customEvent.detail.id);
      }
    };
    window.addEventListener("focus-window", handleFocus);
    
    // Focus self initially upon mounting
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("focus-window", { detail: { id: selfId } }));
    }, 50);

    return () => window.removeEventListener("focus-window", handleFocus);
  }, [selfId]);

  const isFocused = activeWindow === selfId;
  const baseZIndex = zIndexOverride || 120;
  const currentZIndex = isDragging ? 400 : (isFocused ? baseZIndex + 100 : baseZIndex);

  const handleWindowClick = () => {
    window.dispatchEvent(new CustomEvent("focus-window", { detail: { id: selfId } }));
  };

  return (
    <motion.div
      initial={inlineOnMobile && isMobile ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={inlineOnMobile && isMobile ? undefined : { scale: 0.9, opacity: 0 }}
      style={isMobile ? (
        inlineOnMobile ? {
          position: 'relative',
          width: '100%',
          zIndex: 10,
        } : {
          position: 'fixed',
          left: '4%',
          right: '4%',
          top: '8%',
          width: '92vw',
          maxHeight: '84vh',
          zIndex: currentZIndex,
        }
      ) : {
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: currentZIndex,
      }}
      className={`cyber-window rounded-none overflow-hidden flex flex-col min-w-[280px] ${className}`}
      data-testid={`window-${id || title.toLowerCase()}`}
      onMouseDown={handleWindowClick}
    >
      <div 
        className={`bg-primary/20 border-b border-primary/40 p-2 flex items-center justify-between ${isMobile ? '' : 'cursor-move'}`}
        onMouseDown={isMobile ? undefined : handleMouseDown}
      >
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5 ml-1">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/40" />
          </div>
          <span className="font-heading text-xs font-bold tracking-widest text-primary ml-2 uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-1.5 text-primary">
          {onExpand && !isMobile && (
            <Maximize2 size={13} className="cursor-pointer hover:text-white mr-1" onClick={onExpand} />
          )}
          {!onlyCloseControl && !onExpand && !isMobile && (
            <>
              <Minus size={14} className="cursor-pointer hover:text-white" />
              <Square size={12} className="cursor-pointer hover:text-white" />
            </>
          )}
          {onClose && (!inlineOnMobile || !isMobile) && <X size={16} className="cursor-pointer hover:text-white" onClick={onClose} data-testid={`close-${id || title.toLowerCase()}`} />}
        </div>
      </div>
      <div className={`p-4 bg-black/60 grow overflow-y-auto ${inlineOnMobile && isMobile ? 'max-h-[600px]' : 'max-h-[calc(84vh-40px)]'}`}>
        {children}
      </div>
    </motion.div>
  );
}