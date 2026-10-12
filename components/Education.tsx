'use client';

import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';

const statusColor: Record<string, string> = {
  'In progress': 'bg-taupe/20 text-charcoal border-taupe/40',
  'قيد الدراسة': 'bg-taupe/20 text-charcoal border-taupe/40',
  'Completed': 'bg-charcoal/5 text-charcoal/70 border-charcoal/15',
  'مكتمل': 'bg-charcoal/5 text-charcoal/70 border-charcoal/15',
  'Certificate': 'bg-charcoal text-ivory border-charcoal',
  'شهادة': 'bg-charcoal text-ivory border-charcoal',
};

export default function Education() {
  const { t } = useLang();

  return (
    <section id="education" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-widest2 text-taupe">{t.education.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t.education.title}</h2>
      </Reveal>

      <div className="mt-16 border-s border-charcoal/15 ps-8">
        {t.education.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="relative pb-12 last:pb-0">
              <span className="absolute -start-[37px] top-2 h-2.5 w-2.5 rounded-full bg-taupe" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/60">{item.place}</p>
                  {item.period ? <p className="mt-1 text-xs uppercase tracking-widest text-charcoal/40">{item.period}</p> : null}
                </div>
                <span className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest ${statusColor[item.status] || 'border-charcoal/15 text-charcoal/60'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
