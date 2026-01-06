import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LanCraft - Agentura pro herní a esportové eventy',
  description: 'LanCraft - Profesionální agentura pro organizaci gaming eventů, herních zón a esportových akcí v České republice.',
  keywords: 'gaming events, LAN party, esports, herní zóny, pronájem techniky',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'LanCraft - Agentura pro herní a esportové eventy',
    description: 'Profesionální agentura pro organizaci gaming eventů a esportových akcí',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}