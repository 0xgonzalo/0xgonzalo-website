'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_OUT_EXPO, EASE_DRAMATIC } from '@/lib/animations';
import { ROTATING_TEXTS } from '@/lib/constants';

type Bezier = [number, number, number, number];

const CHAR_STAGGER_ENTER = 0.03; // 30ms stagger on enter
const CHAR_STAGGER_EXIT = 0.015; // faster stagger on exit
const DISPLAY_DURATION_MS = 3000;

/**
 * Container variant for orchestrating per-character stagger.
 * The `custom` value passed to children is their character index.
 */
const containerVariants = {
  enter: {
    transition: {
      staggerChildren: CHAR_STAGGER_ENTER,
    },
  },
  exit: {
    transition: {
      staggerChildren: CHAR_STAGGER_EXIT,
    },
  },
};

const charVariants = {
  initial: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [...EASE_OUT_EXPO] as Bezier,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: 'blur(12px)',
    transition: {
      duration: 0.35,
      ease: [...EASE_DRAMATIC] as Bezier,
    },
  },
};

export default function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(advance, DISPLAY_DURATION_MS);
    return () => clearInterval(interval);
  }, [advance, prefersReducedMotion]);

  const currentText = ROTATING_TEXTS[currentIndex];
  const chars = currentText.split('');

  // Static render for reduced motion preference
  if (prefersReducedMotion) {
    return (
      <div className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tightest leading-[0.95] text-fg text-center">
        {currentText}
      </div>
    );
  }

  return (
    <div
      className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tightest leading-[1.1] text-fg relative"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Accessible live text for screen readers */}
      <span className="sr-only">{currentText}</span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentIndex}
          className="inline-flex flex-wrap justify-center"
          variants={containerVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          aria-hidden="true"
          style={{ willChange: 'contents' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={`${currentIndex}-${i}`}
              variants={charVariants}
              className="inline-block"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
