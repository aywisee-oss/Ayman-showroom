'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';
import { roles, Role } from '@/lib/data';

export default function Experience() {
  const { t, lang, ar } = useLang();
  const [selected, setSelected] = useState<Role | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section id="experience" className="bg-charcoal py-28 text-ivory">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-taupe">{t.experience.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t.experience.title}</h2>
        </Reveal>

        <div className="mt-16 divide-y divide-ivory/10 border-y border-ivory/10">
          {roles.map((role, i) => (
            <Reveal key={role.id} delay={i * 60}>
              <button
                onClick={() => setSelected(role)}
                className="group grid w-full grid-cols-1 items-center gap-4 py-8 text-start transition-colors duration-300 hover:bg-ivory/5 sm:grid-cols-12 sm:gap-6 sm:px-4"
              >
                <span className="sm:col-span-1 text-sm text-ivory/40">0{i + 1}</span>
                <span className="sm:col-span-4">
                  <span className="block text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                    {role.title[lang]}
                  </span>
                  <span className="mt-1 block text-sm text-taupe">{role.company[lang]}</span>
                </span>
                <span className="text-sm text-ivory/60 sm:col-span-3">{role.period[lang]}</span>
                <span className="text-sm text-ivory/40 sm:col-span-3">{role.location[lang]}</span>
                <span className="hidden justify-end sm:col-span-1 sm:flex">
                  <span className="rounded-full border border-ivory/20 px-4 py-1.5 text-xs uppercase tracking-widest transition-colors duration-300 group-hover:border-taupe group-hover:text-taupe">
                    {t.experience.open}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-ivory text-charcoal"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            dir={ar ? 'rtl' : 'ltr'}
          >
            <div className="mx-auto max-w-6xl px-6 py-10">
              <button
                onClick={() => setSelected(null)}
                className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/60 transition-colors hover:text-charcoal"
              >
                <X size={16} /> {t.experience.close}
              </button>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-taupe">{selected.period[lang]}</p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    {selected.title[lang]}
                  </h3>
                  <p className="mt-3 text-lg text-charcoal/70">{selected.company[lang]}</p>
                  <p className="mt-1 text-sm text-charcoal/50">{selected.location[lang]}</p>

                  <div className="mt-8 overflow-hidden">
                    <img
                      src={selected.image}
                      alt={selected.company[lang]}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="lg:pt-24">
                  <h4 className="text-xs uppercase tracking-widest2 text-taupe">{t.experience.responsibilities}</h4>
                  <ul className="mt-5 space-y-4">
                    {selected.points[lang].map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-charcoal/80">
                        <span className="mt-[9px] h-px w-6 shrink-0 bg-taupe" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-10 text-xs uppercase tracking-widest2 text-taupe">{t.experience.relatedSkills}</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.skills[lang].map((s) => (
                      <span key={s} className="rounded-full border border-charcoal/15 px-4 py-1.5 text-xs text-charcoal/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
