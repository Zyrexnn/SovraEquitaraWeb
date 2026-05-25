import React, { useEffect, useState, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  scrambleWindow?: number;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 30,
  maxIterations = 30,
  className = "",
  scrambleWindow = 8,
}) => {
  const [iteration, setIteration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  // Track random characters so they don't change every render unnecessarily, 
  // but we want them to change during the animation interval.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!hasAnimated || isHovering) {
      setIteration(0);
      interval = setInterval(() => {
        setTick(t => t + 1);
        setIteration((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            if (!hasAnimated) setHasAnimated(true);
            return text.length;
          }
          // Calculate step so it finishes in maxIterations
          return prev + Math.max(1, text.length / maxIterations);
        });
      }, speed);
    }

    return () => clearInterval(interval);
  }, [hasAnimated, isHovering, text, maxIterations, speed]);

  return (
    <span 
      className={className} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index}> </span>;
        
        let displayChar = char;
        let opacity = 1;
        let isScrambling = false;
        
        if (index >= iteration) {
          // If we are within the "scramble window" ahead of the current iteration
          if (index < iteration + scrambleWindow) {
            // Use tick to pseudo-randomize during the animation
            const randomChar = CHARACTERS[Math.floor((index + tick) % CHARACTERS.length)];
            displayChar = randomChar;
            opacity = 0.9;
            isScrambling = true;
          } else {
            // Far ahead characters: original but dimmed to prevent layout shifts
            displayChar = char;
            opacity = 0.15;
          }
        }

        return (
          <span 
            key={index} 
            style={{ 
              opacity,
              color: isScrambling ? 'inherit' : undefined,
              transition: 'opacity 0.1s ease-out'
            }}
            className={isScrambling ? "text-amber-500 dark:text-amber-400 font-mono text-[0.9em]" : ""}
          >
            {displayChar}
          </span>
        );
      })}
    </span>
  );
};
