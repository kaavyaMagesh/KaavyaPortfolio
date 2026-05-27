import { useState, useEffect } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CameraWidget } from "@/components/CameraWidget";
import { ContactWidget } from "@/components/ContactWidget";
import { FolderIcons } from "@/components/FolderIcons";
import { PolaroidStack } from "@/components/PolaroidStack";
import { TelemetryWidget } from "@/components/TelemetryWidget";
import { Dock } from "@/components/Dock";
import { CyberBackground } from "@/components/CyberBackground";
import { AboutMeWidget } from "@/components/AboutMeWidget";
import { DraggableWindow } from "@/components/DraggableWindow";

export default function Desktop() {
  const [bootComplete, setBootComplete] = useState(false);
  const [aboutMeOpen, setAboutMeOpen] = useState(true);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [commNotificationCount, setCommNotificationCount] = useState(1);

  useEffect(() => {
    const handleOpenAbout = () => {
      setAboutMeOpen(true);
      setCommNotificationCount(0);
    };
    window.addEventListener("open-about", handleOpenAbout);
    return () => window.removeEventListener("open-about", handleOpenAbout);
  }, []);

  // Ping visitor tracking endpoint when portfolio loads
  useEffect(() => {
    if (bootComplete) {
      fetch("/api/visitors", { method: "POST" }).catch(() => {
        // Silently fail — analytics should never break the portfolio
      });
    }
  }, [bootComplete]);

  const handleCommClick = () => {
    setAboutMeOpen(prev => !prev);
    setCommNotificationCount(0);
  };

  const handleMediaClick = () => {
    setMediaOpen(prev => !prev);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground">
      {/* Dynamic Cyber Canvas Background */}
      <CyberBackground />
      {/* Dark overlay to deepen the space feel */}
      <div className="absolute inset-0" style={{ background: 'rgba(4,0,14,0.35)' }} />

      <div className="scan-lines" />
      <div className="noise-overlay" />

      {/* Boot Sequence Wrapper */}
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}

      {/* Desktop Environment */}
      {bootComplete && (
        <div className="absolute inset-0 animate-in fade-in duration-1000">
          <CameraWidget />
          <FolderIcons />
          <PolaroidStack />
          <AboutMeWidget isOpen={aboutMeOpen} onClose={() => setAboutMeOpen(false)} />

          {mediaOpen && (
            <DraggableWindow 
              title="MEDIA_DATABASE.sys" 
              onClose={() => setMediaOpen(false)} 
              initialPosition={{ x: typeof window !== "undefined" ? window.innerWidth / 2 - 150 : 250, y: typeof window !== "undefined" ? window.innerHeight - 400 : 400 }}
              id="media"
              className="w-[300px] border-primary/50 bg-black/95 shadow-[0_0_25px_rgba(255,0,170,0.3)] z-50 animate-in zoom-in-95 duration-200"
            >
              <div className="flex flex-col items-center justify-center p-6 text-center font-mono text-sm font-bold text-primary-foreground select-none gap-4">
                <span>No uploads yet</span>
                <button 
                  onClick={() => setMediaOpen(false)}
                  className="px-4 py-1.5 border border-primary/45 hover:bg-primary/20 hover:border-primary text-primary text-xs font-bold transition-all tracking-wider uppercase cursor-pointer"
                >
                  CLOSE_SESSION
                </button>
              </div>
            </DraggableWindow>
          )}

          <ContactWidget />
          <TelemetryWidget />
          <Dock onCommClick={handleCommClick} onMediaClick={handleMediaClick} commNotificationCount={commNotificationCount} />
        </div>
      )}
    </div>
  );
}