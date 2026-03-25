'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ARTIST_PROJECTS, ARTIST_RESIDENCES } from '@/lib/constants';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';

const AudioVisualizer = dynamic(
  () => import('@/components/Artist/AudioVisualizer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    ),
  }
);

function GlitchTitle() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mb-12 md:mb-20"
    >
      <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tightest leading-[0.9] relative">
        <span className="relative inline-block">
          {'Electronic'.split('').map((char, i) => (
            <motion.span
              key={`e-${i}`}
              className="inline-block"
              animate={{
                x: [0, i % 2 === 0 ? 1 : -1, 0],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.15,
                delay: 8 + i * 0.02,
                repeat: Infinity,
                repeatDelay: 8,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>{' '}
        <span className="text-accent">Artist</span>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="mt-4 font-mono text-sm md:text-base text-muted tracking-wide"
      >
        Coding Organic Interfaces
      </motion.p>
    </motion.div>
  );
}

function ProjectCard({
  title,
  description,
  link,
  year,
}: {
  title: string;
  description: string;
  link: string;
  year: string;
}) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      className="group block p-6 md:p-8 border border-[rgba(250,250,250,0.1)] hover:border-accent/40 transition-colors duration-500 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(204, 255, 0, 0.03) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-accent/60 tracking-widest uppercase">
            {year}
          </span>
          <span className="font-mono text-[10px] text-muted/40 group-hover:text-accent/60 transition-colors">
            &rarr;
          </span>
        </div>
        <h4 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-fg mb-2">
          {title}
        </h4>
        <p className="font-body text-sm text-muted leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out" />
    </motion.a>
  );
}

function ResidenceCard({
  name,
  year,
  context,
}: {
  name: string;
  year: string;
  context: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="p-4 md:p-5 border border-[rgba(250,250,250,0.08)] bg-[rgba(255,255,255,0.02)]"
    >
      <span className="font-mono text-[10px] text-accent/50 tracking-widest uppercase">
        {year}
      </span>
      <h4 className="font-display text-lg font-semibold tracking-tight text-fg mt-1">
        {name}
      </h4>
      <p className="font-body text-xs text-muted/70 mt-1 leading-relaxed">
        {context}
      </p>
    </motion.div>
  );
}

export default function ArtistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="artist"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <GlitchTitle />

        {/* Visualizer */}
        <Suspense fallback={null}>
          <AudioVisualizer isVisible={isVisible} />
        </Suspense>

        {/* Artworks & Projects */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-16 md:mt-24"
        >
          <h3 className="font-mono text-xs text-accent/60 tracking-[0.2em] uppercase mb-8">
            Artworks & Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {ARTIST_PROJECTS.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                link={project.link}
                year={project.year}
              />
            ))}
          </div>
        </motion.div>

        {/* Onchain Residences */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-16 md:mt-20"
        >
          <h3 className="font-mono text-xs text-accent/60 tracking-[0.2em] uppercase mb-8">
            Onchain Residences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ARTIST_RESIDENCES.map((residence) => (
              <ResidenceCard
                key={residence.name}
                name={residence.name}
                year={residence.year}
                context={residence.context}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
