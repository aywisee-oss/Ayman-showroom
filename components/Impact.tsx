'use client';

import { Reveal, Counter } from './Reveal';
import { useLang } from '@/lib/i18n';

export default function Impact() {
  const { t } = useLang();
  const [m1, m2] = t.impact.metrics;

  return (
    <section id="impact" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-widest2 text-taupe">{t.impact.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t.impact.title}</h2>
        <p className="mt-4 max-w-lg text-sm text-charcoal/60">{t.impact.sub}</p>
      </Reveal>

      {/* Signature metric: the waste indicator */}
      <Reveal delay={100}>
        <div className="mt-16 bg-charcoal p-10 text-ivory sm:p-16">
          <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-6xl font-semibold tracking-tight text-ivory/50 sm:text-7xl">
                <Counter target={m1.value} decimals={m1.decimals} suffix={m1.suffix} />
              </div>
              <div className="mt-2 h-px w-full bg-ivory/15" />
              <p className="mt-3 text-xs uppercase tracking-widest text-ivory/40">Before</p>
            </div>
            <div className="text-center">
              <svg viewBox="0 0 80 24" className="mx-auto h-6 w-20 text-taupe" fill="none">
                <path d="M2 12h72m0 0-8-8m8 8-8 8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="mt-4 text-6xl font-semibold tracking-tight text-taupe sm:text-7xl">
                <Counter target={m1.to} decimals={m1.decimals} suffix={m1.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-ivory/40">After</p>
            </div>
            <div>
              <p className="text-xl font-medium leading-snug sm:text-2xl">{m1.label}</p>
              <p className="mt-3 text-sm text-ivory/60">{m1.note}</p>
            </div>
          </div>
          <div className="mt-10 h-1 w-full bg-ivory/10">
            <div className="h-full bg-taupe" style={{ width: '44%' }} />
          </div>
          <p className="mt-2 text-end text-[11px] uppercase tracking-widest text-ivory/40">1.80% → 0.80%</p>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {t.impact.metrics.slice(1).map((m, i) => (
          <Reveal key={m.label} delay={i * 100}>
            <div className="border border-charcoal/10 p-8 transition-colors duration-500 hover:border-taupe">
              <div className="text-5xl font-semibold tracking-tight text-charcoal">
                <Counter target={m.value} suffix={m.suffix} />
              </div>
              <p className="mt-4 text-sm font-medium leading-snug">{m.label}</p>
              <p className="mt-2 text-xs text-charcoal/50">{m.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
