import { useState } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { DraggableWindow } from "./DraggableWindow";

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <DraggableWindow title="CONTACT.sys" onClose={() => setIsOpen(false)} initialPosition={{ x: 40, y: window.innerHeight - 250 }} id="contact">
      <div className="flex flex-col gap-4 font-mono text-sm">
        <a href="mailto:cyber@hacker.net" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-email">
          <Mail size={16} className="text-primary group-hover:animate-pulse-glow" />
          <span>cyber@hacker.net</span>
        </a>
        <a href="tel:+15550000000" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-phone">
          <Phone size={16} className="text-primary group-hover:animate-pulse-glow" />
          <span>+1 (555) 000-0000</span>
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-github">
          <Github size={16} className="text-primary group-hover:animate-pulse-glow" />
          <span>github.com/cyber</span>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-primary transition-colors group" data-testid="contact-linkedin">
          <Linkedin size={16} className="text-primary group-hover:animate-pulse-glow" />
          <span>linkedin.com/in/cyber</span>
        </a>
      </div>
    </DraggableWindow>
  );
}