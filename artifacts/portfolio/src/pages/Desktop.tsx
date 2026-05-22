import { useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { CameraWidget } from "@/components/CameraWidget";
import { ContactWidget } from "@/components/ContactWidget";
import { FolderIcons } from "@/components/FolderIcons";
import { PolaroidStack } from "@/components/PolaroidStack";
import { TelemetryWidget } from "@/components/TelemetryWidget";
import { Dock } from "@/components/Dock";

export default function Desktop() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground">
      {/* Galaxy wallpaper background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/galaxy-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay to deepen the space feel */}
      <div className="absolute inset-0" style={{ background: 'rgba(4,0,14,0.45)' }} />

      {/* Perspective neon grid — bottom half, like image 2 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-20%',
            right: '-20%',
            height: '65%',
            backgroundImage: `
              linear-gradient(rgba(255,0,170,0.55) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,170,0.55) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'perspective(600px) rotateX(72deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Star Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => {
          const size = Math.random() * 2.5 + 0.5;
          const isPink = Math.random() > 0.6;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
                width: size + 'px',
                height: size + 'px',
                background: isPink ? '#ff88cc' : '#ffffff',
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                boxShadow: isPink ? `0 0 ${size * 3}px rgba(255,0,170,0.9)` : `0 0 ${size * 2}px rgba(255,255,255,0.8)`,
                opacity: Math.random() * 0.5 + 0.5,
              }}
            />
          );
        })}
      </div>

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
          <ContactWidget />
          <TelemetryWidget />
          <Dock />
        </div>
      )}
    </div>
  );
}