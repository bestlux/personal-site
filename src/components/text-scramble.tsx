"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  trigger?: boolean | number; // Re-trigger animation when this changes
}

export function TextScramble({ text, className, duration = 800, trigger = true }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const scrambled = text
        .split("")
        .map((char, index) => {
          // If we are past the progress point for this character, show the real character
          if (progress > index / text.length) {
            return char;
          }
          // Keep spaces as spaces to preserve word shapes
          if (char === " ") return " ";
          // Pick a random character for the scramble
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayText(text); // Ensure it perfectly matches at the end
      }
    };

    frameId = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [text, duration, trigger]);

  return <span className={className}>{displayText}</span>;
}
