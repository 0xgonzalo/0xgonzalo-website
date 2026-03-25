'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, EASE_DRAMATIC, EASE_OUT_EXPO } from '@/lib/animations';
import { SOCIAL_LINKS } from '@/lib/constants';


function SocialLink({ name, url, handle, index }: { name: string; url: string; handle: string; index: number }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      className="group relative block border-b border-[rgba(250,250,250,0.1)] py-6 md:py-8 overflow-hidden"
      aria-label={`${name} - ${handle}`}
    >
      <div className="flex items-center justify-between">
        {/* Left side: platform name that slides right on hover */}
        <motion.div
          className="relative flex items-center gap-4 md:gap-6"
          whileHover={prefersReducedMotion ? undefined : { x: 20 }}
          transition={{ duration: 0.4, ease: [...EASE_OUT_EXPO] }}
        >
          {/* Index number */}
          <span className="font-mono text-xs text-muted opacity-50 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Platform name */}
          <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-fg transition-colors duration-300 group-hover:text-accent">
            {name}
          </span>
        </motion.div>

        {/* Right side: handle/URL that reveals on hover */}
        <div className="hidden sm:flex items-center gap-4 overflow-hidden">
          <motion.span
            className="font-mono text-sm md:text-base text-muted whitespace-nowrap"
            initial={{ opacity: 0, x: 30 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [...EASE_OUT_EXPO] }}
          >
            {handle}
          </motion.span>

          {/* Arrow that appears on hover */}
          <motion.span
            className="text-accent text-xl"
            initial={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35, ease: [...EASE_OUT_EXPO] }}
            aria-hidden="true"
          >
            &rarr;
          </motion.span>
        </div>
      </div>

      {/* Full URL reveal bar on hover */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <div
          className="
            font-mono text-[10px] md:text-xs text-accent/50
            translate-y-full group-hover:translate-y-0
            transition-transform duration-500 ease-out
            pb-2 pl-10 md:pl-14
          "
        >
          {url}
        </div>
      </div>

      {/* Hover background sweep */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-r from-accent/[0.03] to-transparent
          translate-x-[-100%] group-hover:translate-x-0
          transition-transform duration-700 ease-out
        "
      />
    </motion.a>
  );
}

export default function ConnectSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <footer
      id="connect"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [...EASE_DRAMATIC],
          }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tightest leading-[0.9]">
            Let&apos;s{' '}
            <span className="text-accent">connect</span>
          </h2>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="border-t border-[rgba(250,250,250,0.1)]"
        >
          {SOCIAL_LINKS.map((link, i) => (
            <SocialLink
              key={link.name}
              name={link.name}
              url={link.url}
              handle={link.handle}
              index={i}
            />
          ))}
        </motion.div>

        {/* Footer copyright */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
          className="mt-20 md:mt-32"
        >
          <p className="font-mono text-xs text-fg opacity-[0.15] tracking-wide">
            &copy; 2026 0xGonzalo &mdash; Built with obsession
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
