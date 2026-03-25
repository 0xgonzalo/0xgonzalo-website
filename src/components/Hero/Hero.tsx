'use client';

import { motion } from 'framer-motion';
import { EASE_DRAMATIC, EASE_OUT_EXPO } from '@/lib/animations';
import RotatingText from './RotatingText';
import CursorFollower from './CursorFollower';

type Bezier = [number, number, number, number];

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 2,
        duration: 1,
        ease: [...EASE_DRAMATIC] as Bezier,
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        scroll
      </span>
      <motion.div
        className="w-px h-8 bg-fg/20 origin-top relative overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent"
          initial={{ height: '0%' }}
          animate={{ height: ['0%', '100%', '0%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [...EASE_OUT_EXPO] as Bezier,
            repeatDelay: 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative h-screen min-h-[600px] w-full bg-bg flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/bg-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-bg/60" />
      </div>

      {/* Cursor glow */}
      <CursorFollower />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 max-w-[90vw]">
        {/* Top line: Name */}
        <motion.p
          className="font-mono text-[10px] sm:text-xs text-muted tracking-[0.2em] uppercase mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [...EASE_DRAMATIC] as Bezier,
          }}
        >
          0xGonzalo
        </motion.p>

        {/* Main rotating text — smaller */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [...EASE_DRAMATIC] as Bezier,
          }}
        >
          <RotatingText />
        </motion.div>

        {/* Bottom line: Location */}
        <motion.p
          className="font-mono text-[10px] sm:text-xs text-muted tracking-[0.15em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [...EASE_DRAMATIC] as Bezier,
          }}
        >
          Buenos Aires, Argentina
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
