'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function Hero() {
  const { t, ar } = useLang();
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      {/* Background portrait */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/assets/hero.jpg"
          alt="Ayman Al Hussam"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mb-4 text-xs uppercase tracking-widest2 text-ivory/70"
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="text-[13vw] font-semibold leading-[0.95] tracking-tight text-ivory sm:text-[10vw] lg:text-[7.5vw]">
          {['AYMAN', 'AL HUSSAM'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.45 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-6 max-w-xl text-base text-ivory/85 sm:text-lg"
          dir={ar ? 'rtl' : 'ltr'}
        >
          {t.hero.headline}
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-3 max-w-md text-sm text-ivory/60"
          dir={ar ? 'rtl' : 'ltr'}
        >
          {t.hero.intro}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3 text-sm font-medium text-charcoal transition-transform duration-300 hover:scale-[1.03]"
          >
            {t.hero.explore}
            <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
          <a
            href="/assets/ayman-cv.docx"
            download
            className="inline-flex items-center gap-2 rounded-full border border-ivory/50 px-7 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-charcoal"
          >
            <Download size={16} />
            {t.hero.download}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/60"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase tracking-widest2">{t.hero.scroll}</span>
      </motion.div>
    </section>
  );
}
