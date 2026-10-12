'use client';

import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';

export default function About() {
  const { t, ar } = useLang();

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <img src="/assets/portrait-stairs.jpg" alt="Ayman Al Hussam" className="aspect-[3/4] w-full object-cover" />
              <div className="flex flex-col gap-4">
                <img src="/assets/portrait-car.jpg" alt="Ayman Al Hussam" className="aspect-square w-full flex-1 object-cover" />
                <img src="/assets/portrait-orange.jpg" alt="Ayman Al Hussam" className="aspect-square w-full flex-1 object-cover" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-8">
          <Reveal>
            <p className="text-xs uppercase tracking-widest2 text-taupe">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{t.about.title}</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-charcoal/75" dir={ar ? 'rtl' : 'ltr'}>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
              <p className="pt-2 text-sm font-medium text-charcoal">{t.about.languages}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
