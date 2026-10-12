'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';
import { skills, skillCategories } from '@/lib/data';

type Cat = keyof typeof skillCategories;

export default function Skills() {
  const { t, lang, ar } = useLang();
  const [cat, setCat] = useState<Cat>('all');
  const reduce = useReducedMotion();

  const filtered = cat === 'all' ? skills : skills.filter((s) => s.category === cat);

  return (
    <section id="expertise" className="bg-ivory py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-taupe">{t.expertise.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t.expertise.title}</h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2" dir={ar ? 'rtl' : 'ltr'}>
            {(Object.keys(skillCategories) as Cat[]).map((k) => (
              <button
                key={k}
                onClick={() => setCat(k)}
                className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
                  cat === k ? 'bg-charcoal text-ivory' : 'border border-charcoal/15 text-charcoal/60 hover:border-charcoal/40'
                }`}
              >
                {skillCategories[k][lang]}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-px bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <motion.div
                key={s.name.en}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group bg-ivory p-7 transition-colors duration-500 hover:bg-charcoal"
              >
                <span className="block h-px w-8 bg-taupe transition-all duration-500 group-hover:w-14" />
                <p className="mt-4 text-base font-medium tracking-tight transition-colors duration-500 group-hover:text-ivory">
                  {s.name[lang]}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
