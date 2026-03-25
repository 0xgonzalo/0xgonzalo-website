'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  accentPart?: string;
  outline?: boolean;
}

export default function SectionTitle({ title, subtitle, accentPart, outline }: SectionTitleProps) {
  const renderTitle = () => {
    if (accentPart) {
      const parts = title.split(accentPart);
      return (
        <>
          {parts[0]}
          <span className="text-accent">{accentPart}</span>
          {parts[1]}
        </>
      );
    }
    if (outline) {
      return (
        <span
          className="text-transparent"
          style={{
            WebkitTextStroke: '1.5px rgba(250, 250, 250, 0.6)',
          }}
        >
          {title}
        </span>
      );
    }
    return title;
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mb-12 md:mb-20"
    >
      <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tightest leading-[0.9]">
        {renderTitle()}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 font-mono text-sm md:text-base text-muted tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
