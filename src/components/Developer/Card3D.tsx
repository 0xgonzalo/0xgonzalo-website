'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface Card3DProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  index: number;
  link?: string;
}

export default function Card3D({ title, subtitle, description, tags, index, link }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      variants={fadeInUp}
      style={{ perspective: 800 }}
      className="relative h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative will-change-transform h-full"
      >
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(204, 255, 0, 0.06), transparent 40%)',
          }}
        />

        {/* Card body */}
        <div
          className={`
            relative overflow-hidden rounded-2xl border p-6 sm:p-8 h-full
            backdrop-blur-md transition-colors duration-500
            ${isHovered ? 'border-accent/40' : 'border-[rgba(250,250,250,0.1)]'}
          `}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
          }}
        >
          {/* Floating index number */}
          <span
            className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[6rem] font-bold leading-none text-transparent"
            style={{
              WebkitTextStroke: '1px rgba(250, 250, 250, 0.04)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
              {subtitle}
            </p>

            <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              {title}
            </h3>

            <p className="mb-6 font-body text-sm leading-relaxed text-muted sm:text-base">
              {description}
            </p>

            {/* Tags — pushed to bottom */}
            <div className="mt-auto flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(250,250,250,0.1)] px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-accent/20 group-hover:text-fg/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-accent/70 hover:text-accent transition-colors duration-300"
              >
                <span>View project</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>

          {/* Accent line at bottom on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-px w-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
