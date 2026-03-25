export const COLORS = {
  bg: '#050505',
  fg: '#FAFAFA',
  accent: '#CCFF00',
  muted: 'rgba(250, 250, 250, 0.5)',
  subtle: 'rgba(250, 250, 250, 0.15)',
  border: 'rgba(250, 250, 250, 0.1)',
} as const;

export const ROTATING_TEXTS = [
  'Electronic Artist',
  'Developer',
  'Designer',
  'Shaping the New Industry',
  'Building the Future of Music',
  'Code × Sound × Vision',
];

export const DEVELOPER_CARDS = [
  {
    title: 'indie Folks',
    subtitle: 'Developer',
    description: 'Building an app for the indie Folks label — tools for independent artists and labels to manage, distribute, and grow.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Music Tech'],
    link: 'https://www.instagram.com/indiefolks',
  },
  {
    title: 'In Process',
    subtitle: 'Frontend Developer · 2025',
    description: 'Frontend developer building the In Process marketplace — a platform for curated creative works and digital experiences.',
    tags: ['Next.js', 'TypeScript', 'Frontend', 'Marketplace'],
    link: 'https://stayinprocess.vercel.app/',
  },
  {
    title: 'Mobile Apps',
    subtitle: 'Flutter & Cross-Platform',
    description: 'Currently building mobile apps for independent artists and labels from Argentina.',
    tags: ['Flutter', 'Dart', 'RevenueCat', 'iOS', 'Android'],
  },
  {
    title: 'Onchain Builder',
    subtitle: 'Web3 & Blockchain',
    description: 'Smart contracts, music NFTs, and decentralized apps on Base and Ethereum. Building on Farcaster.',
    tags: ['Solidity', 'Base', 'Ethereum', 'Farcaster', 'NFTs'],
    link: 'https://talent.app/0xgonzalo',
  },
  {
    title: 'Full Stack',
    subtitle: 'Next.js, Supabase, APIs',
    description: 'End-to-end web applications with modern tooling. Server components, edge functions, real-time data.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Vercel', 'APIs'],
  },
  {
    title: 'Hackathon Winner',
    subtitle: 'Awards & Recognition',
    description: '1st place at Avalanche Summit Hackathon 2024. 2nd place at Base Batches LATAM 2025. 6th place at Zora Coinathon 2025.',
    tags: ['Avalanche', 'Base', 'Zora', 'Web3'],
  },
];

export const ARTIST_PROJECTS = [
  {
    title: 'Varese',
    description: 'Techno duo exploring the raw edges of electronic sound. Dark, hypnotic, and relentless — well-known in the emerging Argentine scene, sharing stages with national and international artists.',
    link: 'https://open.spotify.com/artist/5DG278QHnEKfWW9zAGFeRg?si=o4YzFEfwTF6xRfi9xABeWw',
    year: 'Ongoing',
  },
  {
    title: 'Hyperstructures',
    description: 'A mixed-media artwork where a script scans the Bitcoin blockchain, sending data to an AI model that interprets and organizes it spatially — producing visual snapshots of a futuristic city. Finalist at the Bitcoin Argentina NGO competition.',
    link: 'https://www.instagram.com/p/CxvfQzCMyzx',
    year: '2023',
  },
  {
    title: 'TUNDR4',
    description: 'Artwork created during the Kismet Casa Creators House international residence in collaboration with ENERGY DAO and Zora. A fusion of generative art tools blending curated audio samples with visually stunning elements.',
    link: 'https://zora.co/collect/zora:0xd256ce27c7bf671602b21a7ce104bf1a7580e309/1',
    year: '2023',
  },
  {
    title: 'Resonancias Paralelas',
    description: 'An Augmented Reality exhibition curated at the Centro Cultural Kirchner (CCK) in Buenos Aires. Over 15,000 visitors experienced AR works built with MindAR, Three.js, and Model-viewer — no app required, just scan a QR.',
    link: 'https://x.com/0xgonzalo_/status/1817608251787075614',
    year: '2024',
  },
  {
    title: 'Onchain Collection',
    description: 'Various works spanning generative art and electronic music, released on Zora protocol and showcased in an immersive oncyber gallery.',
    link: 'https://oncyber.io/0xgonzalo',
    year: 'Ongoing',
  },
];

export const ARTIST_RESIDENCES = [
  {
    name: 'Kismet Casa',
    year: '2023',
    context: 'During Bright Moments in Buenos Aires',
  },
  {
    name: 'Buenos Aires Songcamp',
    year: '2024',
    context: 'Part of the 1st onchain songcamp in Latin America',
  },
  {
    name: 'Sozu House Thailand',
    year: '2024',
    context: 'During Devcon Bangkok in November',
  },
];

export const ARTIST_INFO = {
  label: {
    name: 'Folks',
    description: 'Indie music label pushing the boundaries of electronic music in Latin America.',
  },
  gear: ['Massive X', 'Moog Minitaur', 'Behringer TD-3', 'Ableton Live', 'Hardware Synths'],
  intersection: 'Exploring the convergence of music, technology, and Web3 to create new cultural infrastructure.',
};

export const FOUNDER_PROJECTS = [
  {
    name: 'Varese',
    description: 'Techno duo exploring the raw edges of electronic sound. Dark, hypnotic, and relentless.',
    role: 'Artist',
    size: 'large',
    link: 'https://open.spotify.com/artist/5DG278QHnEKfWW9zAGFeRg?si=UYPu-YXmTsezLnWNiBG1Ew',
  },
  {
    name: 'Shine',
    description: 'Farcaster music mini-app connecting artists directly with their community onchain.',
    role: 'Creator',
    size: 'medium',
    link: 'https://x.com/Shinemusic_xyz',
  },
  {
    name: 'MusicaW3',
    description: 'Web3 × music initiative bridging Latin American artists with decentralized technology.',
    role: 'Co-founder',
    size: 'medium',
    link: 'https://www.musicaw3.com',
  },
  {
    name: 'Backstage',
    description: 'Decentralized platform giving artists ownership of their creative and financial journey.',
    role: 'Founder',
    size: 'large',
  },
];

export const SOCIAL_LINKS = [
  { name: 'X / Twitter', url: 'https://x.com/0xgonzalo_', handle: '@0xgonzalo_', icon: 'x' },
  { name: 'Instagram', url: 'https://www.instagram.com/0xgonzalo', handle: '@0xgonzalo', icon: 'instagram' },
  { name: 'GitHub', url: 'https://github.com/0xgonzalo', handle: '0xgonzalo', icon: 'github' },
  { name: 'Telegram', url: 'https://t.me/gonzalo0x', handle: '@gonzalo0x', icon: 'telegram' },
  { name: 'Farcaster', url: 'https://warpcast.com/0xgonzalo', handle: '@0xgonzalo', icon: 'farcaster' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/0xgonzalo', handle: '0xgonzalo', icon: 'soundcloud' },
];

export const ABOUT_BIO = `I am 0xGonzalo, a multimedia artist, music producer, and creative coder from Argentina. I have been working for many years at the intersection of art and technology, participating in various digital art and music collectives, where I provide blockchain distribution and outreach tools like MusicaW3 and Maskay.

In 2023, I participated in the international residency "Kismet Creators House" and was a finalist with my piece Hyperstructures in the Bitcoin Argentina NGO competition.

In July 2024, I showcased an Augmented Reality exhibition at the prestigious Centro Cultural Kirchner (CCK) in Buenos Aires titled Resonancias Paralelas. Following that, in August 2024, I was an associate speaker at Digital Futures, presenting alongside Angeles Franco on "Augmented Reality in Exhibition Spaces."

I also have a techno project called Varese, which is well-known in the emerging Argentine scene, sharing stages with national and international artists. Additionally, I produce downtempo and experimental music, designing my own artworks and releasing them on onchain music platforms.`;

export const ABOUT_HIGHLIGHTS = ['multimedia artist', 'music producer', 'creative coder', 'art and technology', 'blockchain', 'Augmented Reality', 'Varese', 'onchain'];
