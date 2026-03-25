'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SectionTitle from '@/components/shared/SectionTitle';

const DeveloperCanvas = dynamic(() => import('./DeveloperCanvas'), {
  ssr: false,
  loading: () => <DeveloperSkeleton />,
});

function DeveloperSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-[rgba(250,250,250,0.05)] p-6 sm:p-8"
          style={{ background: 'rgba(255, 255, 255, 0.02)' }}
        >
          <div className="mb-2 h-3 w-24 rounded bg-[rgba(250,250,250,0.05)]" />
          <div className="mb-3 h-7 w-40 rounded bg-[rgba(250,250,250,0.08)]" />
          <div className="mb-2 h-4 w-full rounded bg-[rgba(250,250,250,0.04)]" />
          <div className="mb-6 h-4 w-3/4 rounded bg-[rgba(250,250,250,0.04)]" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="h-6 w-16 rounded-full bg-[rgba(250,250,250,0.04)]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DeveloperSection() {
  return (
    <section
      id="developer"
      className="relative overflow-hidden bg-bg px-6 py-24 sm:px-8 md:py-32 lg:px-12"
    >
      {/* Ambient background grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(204, 255, 0, 0.15), transparent 50%), radial-gradient(circle at 80% 20%, rgba(204, 255, 0, 0.08), transparent 40%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          title="Developer"
          subtitle="Building digital experiences with code"
          outline
        />

        <Suspense fallback={<DeveloperSkeleton />}>
          <DeveloperCanvas />
        </Suspense>
      </div>
    </section>
  );
}
