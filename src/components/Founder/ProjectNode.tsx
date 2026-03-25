'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASE_DRAMATIC, EASE_OUT_EXPO } from '@/lib/animations';

interface ProjectNodeProps {
  name: string;
  description: string;
  role: string;
  size: 'large' | 'medium';
  index: number;
  link?: string;
}

export default function ProjectNode({ name, description, role, size, index, link }: ProjectNodeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isLarge = size === 'large';

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [...EASE_DRAMATIC],
      }}
      className="group relative"
    >
      <motion.div
        className={`
          relative overflow-hidden
          border border-[rgba(250,250,250,0.2)]
          transition-colors duration-500
          group-hover:border-accent
          ${isLarge ? 'p-8 md:p-10 lg:p-12' : 'p-6 md:p-8'}
        `}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
        transition={{ duration: 0.35, ease: [...EASE_OUT_EXPO] }}
      >
        {/* Hover gradient background */}
        <div
          className="
            absolute inset-0 opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
          "
          style={{
            background:
              'linear-gradient(135deg, rgba(204, 255, 0, 0.04) 0%, rgba(204, 255, 0, 0.01) 50%, transparent 100%)',
          }}
        />

        {/* Role tag */}
        <span className="relative z-10 inline-block font-mono text-xs tracking-wide text-muted uppercase mb-4 md:mb-6">
          {role}
        </span>

        {/* Project name */}
        <h3
          className={`
            relative z-10 font-display font-bold tracking-tighter leading-[0.95] text-fg
            ${isLarge ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'}
          `}
        >
          {name}
        </h3>

        {/* Description - reveals on hover */}
        <div
          className={`
            relative z-10 overflow-hidden
            transition-all duration-500 ease-out
            max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100
            ${isLarge ? 'mt-0 group-hover:mt-6' : 'mt-0 group-hover:mt-4'}
          `}
        >
          <p
            className={`
              font-body text-muted leading-relaxed
              ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'}
            `}
          >
            {description}
          </p>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-accent/70 hover:text-accent transition-colors duration-300"
            >
              <span>{link.includes('spotify') ? 'Listen' : 'Visit'}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>

        {/* Bottom accent line that grows on hover */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out" />
      </motion.div>
    </motion.div>
  );
}
