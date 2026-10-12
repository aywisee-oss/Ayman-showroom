'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

const links = [
  { id: 'collection', key: 'collection' },
  { id: 'experience', key: 'experience' },
  { id: 'impact', key: 'impact' },
  { id: 'expertise', key: 'expertise' },
  { id: 'portfolio', key: 'portfolio' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
] as const;

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ivory/85 backdrop-blur-md border-b border-charcoal/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-semibold tracking-widest2 uppercase">
          Ayman Al Hussam
        </button>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className="text-xs uppercase tracking-[0.18em] text-charcoal/70 transition-colors hover:text-charcoal">
                {t.nav[l.key as keyof typeof t.nav]}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="rounded-full border border-charcoal/20 px-4 py-1.5 text-xs font-medium tracking-widest uppercase transition-colors hover:bg-charcoal hover:text-ivory"
            aria-label="Switch language"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            <div className="space-y-1.5">
              <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-charcoal/10 bg-ivory lg:hidden">
          <ul className="space-y-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className="w-full py-2 text-start text-sm uppercase tracking-[0.18em] text-charcoal/80">
                  {t.nav[l.key as keyof typeof t.nav]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
