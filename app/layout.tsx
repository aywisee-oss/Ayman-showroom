import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['300', '400', '500', '600', '700'], variable: '--font-plex' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ayman-showroom.vercel.app'),
  title: 'Ayman Al Hussam | أيمن الحسام — Creative Portfolio & Digital Marketing',
  description: 'الموقع الشخصي لأيمن الحسام — Ayman Al Hussam. معرض أعمال في التصميم الإبداعي والتسويق الرقمي وتطوير الأعمال في الرياض، السعودية.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://ayman-showroom.vercel.app',
    title: 'Ayman Al Hussam | أيمن الحسام',
    description: 'Creative portfolio, digital marketing and business development | معرض أعمال أيمن الحسام',
    siteName: 'Ayman Al Hussam',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
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
