'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { DEVELOPER_CARDS } from '@/lib/constants';
import Card3D from './Card3D';

export default function DeveloperCanvas() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {DEVELOPER_CARDS.map((card, i) => (
        <Card3D
          key={card.title}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          tags={card.tags}
          index={i}
          link={'link' in card ? (card as { link: string }).link : undefined}
        />
      ))}
    </motion.div>
  );
}
