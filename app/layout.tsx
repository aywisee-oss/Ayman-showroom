import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['300', '400', '500', '600', '700'], variable: '--font-plex' });

export const metadata: Metadata = {
  title: 'Ayman Al Hussam — Luxury Career Showroom',
  description:
    'Sales & Marketing · Branch Operations · Business Development. A luxury career showroom presenting the professional journey of Ayman Al Hussam, Riyadh, Saudi Arabia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${plex.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
