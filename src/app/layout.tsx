import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LanCraft - Agentura pro herní a esportové eventy',
  description: 'LanCraft - Profesionální agentura pro organizaci gaming eventů, herních zón a esportových akcí v České republice.',
  keywords: 'gaming events, LAN party, esports, herní zóny, pronájem techniky',
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}