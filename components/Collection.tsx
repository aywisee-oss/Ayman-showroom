'use client';

import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';

const ids = ['experience', 'expertise', 'impact', 'education', 'portfolio'];

export default function Collection() {
  const { t } = useLang();

  return (
    <section id="collection" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-widest2 text-taupe">{t.collection.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {t.collection.title}
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
        {t.collection.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <button
              onClick={() => document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex h-64 w-full flex-col justify-between bg-ivory p-8 text-start transition-colors duration-500 hover:bg-charcoal"
            >
              <span className="text-xs tracking-widest2 text-taupe">0{i + 1}</span>
              <span>
                <span className="block text-2xl font-medium tracking-tight transition-colors duration-500 group-hover:text-ivory">
                  {item.title}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-charcoal/60 transition-colors duration-500 group-hover:text-ivory/60">
                  {item.desc}
                </span>
                <span className="mt-5 block h-px w-10 bg-charcoal/30 transition-all duration-500 group-hover:w-20 group-hover:bg-taupe" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
