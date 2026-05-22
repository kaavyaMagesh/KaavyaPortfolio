import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentText = "";
    let currentIndex = 0;

    const startTyping = () => {
      timeoutId = setInterval(() => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setDisplayedText(currentText);
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(timeoutId);
        }
      }, speed);
    };

    if (startDelay > 0) {
      setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => clearInterval(timeoutId);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}