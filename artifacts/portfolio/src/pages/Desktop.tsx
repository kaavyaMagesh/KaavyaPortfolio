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
import { useIsMobile } from "@/hooks/use-mobile";

export default function Desktop() {
  const isMobile = useIsMobile();
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
        <div className="absolute inset-0 animate-in fade-in duration-1000 overflow-y-auto">
          {isMobile ? (
            <div className="flex flex-col gap-6 p-4 pb-28 max-w-lg mx-auto w-full select-none">
              {/* Stack items inline inside a nice, clean list */}
              <div className="flex flex-col gap-6">
                {/* Camera / Projects button Widget */}
                <div className="flex flex-col gap-3 p-4 border border-primary/20 bg-black/60 items-center justify-center">
                  <span className="font-mono text-[9px] text-primary/60 tracking-widest uppercase font-bold">[ WIDGET // 01 ]</span>
                  <CameraWidget />
                </div>

                {/* Polaroid Achievements Widget */}
                <div className="flex flex-col gap-3 p-4 border border-primary/20 bg-black/60 items-center justify-center">
                  <span className="font-mono text-[9px] text-primary/60 tracking-widest uppercase font-bold">[ WIDGET // 02 ]</span>
                  <PolaroidStack />
                </div>

                {/* Experience Lock Cards widget */}
                <div className="flex flex-col gap-3 p-4 border border-primary/20 bg-black/60">
                  <span className="font-mono text-[9px] text-primary/60 tracking-widest uppercase font-bold text-center">[ WIDGET // 03 ]</span>
                  <FolderIcons />
                </div>

                {/* Academic Telemetry Widget */}
                <div className="flex flex-col gap-3 p-4 border border-primary/20 bg-black/60">
                  <span className="font-mono text-[9px] text-primary/60 tracking-widest uppercase font-bold text-center">[ WIDGET // 04 ]</span>
                  <TelemetryWidget />
                </div>
              </div>

              {/* Modals triggered dynamically */}
              <AboutMeWidget isOpen={aboutMeOpen} onClose={() => setAboutMeOpen(false)} />
              <ContactWidget />
            </div>
          ) : (
            <>
              <CameraWidget />
              <FolderIcons />
              <PolaroidStack />
              <AboutMeWidget isOpen={aboutMeOpen} onClose={() => setAboutMeOpen(false)} />
              <ContactWidget />
              <TelemetryWidget />
            </>
          )}

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

          <Dock onCommClick={handleCommClick} onMediaClick={handleMediaClick} commNotificationCount={commNotificationCount} />
        </div>
      )}
    </div>
  );
}