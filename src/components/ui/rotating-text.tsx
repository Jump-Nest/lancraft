'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center';
  transition?: Record<string, any>;
  loop?: boolean;
  auto?: boolean;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export default function RotatingText({
  texts,
  rotationInterval = 2000,
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  staggerDuration = 0.02,
  staggerFrom = 'first',
  transition = { duration: 0.5, ease: 'easeOut' },
  loop = true,
  auto = true,
  mainClassName = '',
  splitLevelClassName = '',
  elementLevelClassName = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return loop ? nextIndex % texts.length : Math.min(nextIndex, texts.length - 1);
      });
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval, loop, auto]);

  if (!isClient) {
    return <span className={mainClassName}>{texts[0]}</span>;
  }

  const currentText = texts[index];
  const characters = currentText.split('');

  let charIndexes = characters.map((_, i) => i);
  if (staggerFrom === 'last') {
    charIndexes = charIndexes.reverse();
  } else if (staggerFrom === 'center') {
    const center = Math.floor(characters.length / 2);
    charIndexes = charIndexes.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
  }

  return (
    <span className={mainClassName}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={splitLevelClassName}
        >
          {characters.map((char, i) => {
            const charIndex = charIndexes.indexOf(i);
            const delay = charIndex * staggerDuration;

            return (
              <motion.span
                key={i}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{ ...transition, delay }}
                className={elementLevelClassName}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}