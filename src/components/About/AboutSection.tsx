'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { EASE_DRAMATIC } from '@/lib/animations';
import { ABOUT_BIO, ABOUT_HIGHLIGHTS } from '@/lib/constants';
import SectionTitle from '@/components/shared/SectionTitle';

function isHighlighted(word: string, highlights: string[]): boolean {
  const clean = word.replace(/[.,;:!?"()]/g, '').toLowerCase();
  return highlights.some((phrase) => {
    const parts = phrase.toLowerCase().split(' ');
    return parts.includes(clean);
  });
}

export default function AboutSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const paragraphs = useMemo(() => ABOUT_BIO.split('\n\n'), []);

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-bg"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="About" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          {/* Bio text */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, pIdx) => {
              const words = paragraph.split(/\s+/);
              return (
                <div key={pIdx} className="font-body text-lg md:text-xl leading-relaxed md:leading-[1.7]">
                  {words.map((word, i) => {
                    const highlighted = isHighlighted(word, ABOUT_HIGHLIGHTS);

                    if (prefersReducedMotion) {
                      return (
                        <span key={`${pIdx}-${i}`}>
                          <span className={highlighted ? 'text-accent' : 'text-fg/85'}>
                            {word}
                          </span>
                          {i < words.length - 1 ? ' ' : ''}
                        </span>
                      );
                    }

                    return (
                      <span key={`${pIdx}-${i}`} className="inline">
                        <motion.span
                          className={`inline-block ${highlighted ? 'text-accent' : 'text-fg/85'}`}
                          initial={{ opacity: 0.12 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.02,
                            ease: [...EASE_DRAMATIC],
                          }}
                        >
                          {word}
                        </motion.span>
                        {i < words.length - 1 ? ' ' : ''}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Photo */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [...EASE_DRAMATIC] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-[rgba(250,250,250,0.1)]">
              <Image
                src="/about-me.jpg"
                alt="0xGonzalo"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted/50 tracking-wide">
              Buenos Aires, Argentina
            </p>
          </motion.div>
        </div>

        {/* Decorative accent bar */}
        <motion.div
          className="mt-16 md:mt-20 h-[1px] bg-gradient-to-r from-accent/40 via-accent/10 to-transparent"
          initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.3, ease: [...EASE_DRAMATIC] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  );
}
