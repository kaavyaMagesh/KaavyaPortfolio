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
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0033] via-[#0d0020] to-[#020008]" />
      
      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ff00aa 1px, transparent 1px),
            linear-gradient(to bottom, #ff00aa 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px)',
          transformOrigin: 'bottom'
        }}
      />
      
      {/* Star Particles */}
      <div className="absolute inset-0 opacity-50">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              boxShadow: '0 0 4px #ff00aa'
            }}
          />
        ))}
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