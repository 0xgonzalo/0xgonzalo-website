import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '0xGonzalo — Creative Multidisciplinary',
  description:
    'Electronic artist, developer, and designer based in Buenos Aires. Operating at the intersection of music, code, and design.',
  metadataBase: new URL('https://0xgonzalo.com'),
  openGraph: {
    title: '0xGonzalo — Creative Multidisciplinary',
    description:
      'Electronic artist, developer, and designer. Code × Sound × Vision.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@0xgonzalo_',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=general-sans@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-bg text-fg antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
