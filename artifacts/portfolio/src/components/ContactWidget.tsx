import { useState } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { DraggableWindow } from "./DraggableWindow";

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <DraggableWindow title="CONTACT.sys" onClose={() => setIsOpen(false)} initialPosition={{ x: 32, y: typeof window !== "undefined" ? window.innerHeight - 300 : 650 }} id="contact">
      <div className="flex flex-col gap-4.5 font-mono text-base font-medium">
        <a href="mailto:kaavyamagesh1609@gmail.com" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-email">
          <Mail size={22} className="text-primary group-hover:animate-pulse-glow" />
          <span className="tracking-wide">kaavyamagesh1609@gmail.com</span>
        </a>
        <a href="https://github.com/kaavyaMagesh" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-github">
          <Github size={22} className="text-primary group-hover:animate-pulse-glow" />
          <span className="tracking-wide">github.com/kaavyaMagesh</span>
        </a>
        <a href="https://www.linkedin.com/in/kaavyashri-magesh-327106313/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-linkedin">
          <Linkedin size={22} className="text-primary group-hover:animate-pulse-glow" />
          <span className="tracking-wide">linkedin.com/in/kaavyashri-magesh-327106313</span>
        </a>
      </div>
    </DraggableWindow>
  );
}