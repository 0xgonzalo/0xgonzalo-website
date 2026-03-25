'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { FOUNDER_PROJECTS } from '@/lib/constants';
import SectionTitle from '@/components/shared/SectionTitle';
import ProjectNode from './ProjectNode';

/**
 * SVG connecting lines between project blocks.
 * Animated with stroke-dashoffset triggered by scroll.
 */
function ConnectingLines({ inView }: { inView: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Line from first project (top-right area) down to second project (right column) */}
      <motion.line
        x1="62%"
        y1="18%"
        x2="75%"
        y2="38%"
        stroke="rgba(250, 250, 250, 0.08)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ strokeDashoffset: 200 }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
        transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut' }}
      />
      {/* Line from second project area to third */}
      <motion.line
        x1="38%"
        y1="42%"
        x2="25%"
        y2="62%"
        stroke="rgba(250, 250, 250, 0.08)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ strokeDashoffset: 200 }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
        transition={{ duration: 1.8, delay: 0.7, ease: 'easeOut' }}
      />
      {/* Line from third project area to fourth */}
      <motion.line
        x1="65%"
        y1="60%"
        x2="58%"
        y2="80%"
        stroke="rgba(250, 250, 250, 0.08)"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ strokeDashoffset: 200 }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
        transition={{ duration: 1.8, delay: 1.0, ease: 'easeOut' }}
      />
      {/* Diagonal accent line */}
      <motion.line
        x1="10%"
        y1="15%"
        x2="90%"
        y2="85%"
        stroke="rgba(204, 255, 0, 0.03)"
        strokeWidth="1"
        initial={{ strokeDashoffset: 800, strokeDasharray: '4 8' }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 800 }}
        transition={{ duration: 3, delay: 0.2, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Founder" subtitle="Building at the edge of music and technology" />

        {/* Asymmetric project layout with connecting lines */}
        <div className="relative mt-8 md:mt-12">
          {/* SVG connecting lines */}
          {!prefersReducedMotion && <ConnectingLines inView={inView} />}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative z-10"
          >
            <div className="space-y-6 md:space-y-8">
              {/* Row 1 — Varese (large), pushed right */}
              <div className="md:ml-auto md:w-[65%] lg:w-[58%]">
                <ProjectNode
                  name={FOUNDER_PROJECTS[0].name}
                  description={FOUNDER_PROJECTS[0].description}
                  role={FOUNDER_PROJECTS[0].role}
                  size={FOUNDER_PROJECTS[0].size as 'large' | 'medium'}
                  index={0}
                  link={FOUNDER_PROJECTS[0].link}
                />
              </div>

              {/* Row 2 — Shine + MusicaW3 (medium), staggered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:w-[85%] lg:w-[75%]">
                <div className="md:mt-8">
                  <ProjectNode
                    name={FOUNDER_PROJECTS[1].name}
                    description={FOUNDER_PROJECTS[1].description}
                    role={FOUNDER_PROJECTS[1].role}
                    size={FOUNDER_PROJECTS[1].size as 'large' | 'medium'}
                    index={1}
                    link={FOUNDER_PROJECTS[1].link}
                  />
                </div>
                <div>
                  <ProjectNode
                    name={FOUNDER_PROJECTS[2].name}
                    description={FOUNDER_PROJECTS[2].description}
                    role={FOUNDER_PROJECTS[2].role}
                    size={FOUNDER_PROJECTS[2].size as 'large' | 'medium'}
                    index={2}
                    link={FOUNDER_PROJECTS[2].link}
                  />
                </div>
              </div>

              {/* Row 3 — Backstage (large), pushed left */}
              <div className="md:mr-auto md:ml-[10%] md:w-[60%] lg:w-[52%]">
                <ProjectNode
                  name={FOUNDER_PROJECTS[3].name}
                  description={FOUNDER_PROJECTS[3].description}
                  role={FOUNDER_PROJECTS[3].role}
                  size={FOUNDER_PROJECTS[3].size as 'large' | 'medium'}
                  index={3}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
