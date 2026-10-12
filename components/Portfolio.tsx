'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';
import { portfolio } from '@/lib/data';

export default function Portfolio() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="portfolio" className="bg-charcoal py-28 text-ivory">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-taupe">{t.portfolioSec.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t.portfolioSec.title}</h2>
          <p className="mt-4 max-w-lg text-sm text-ivory/60">{t.portfolioSec.sub}</p>
        </Reveal>

        <div className="mt-16 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {portfolio.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 60}>
              <button onClick={() => setOpen(i)} className="group block w-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button className="absolute end-6 top-6 text-ivory/70 hover:text-ivory" aria-label="Close">
              <X size={28} />
            </button>
            <motion.img
              src={portfolio[open].src}
              alt={portfolio[open].alt}
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
