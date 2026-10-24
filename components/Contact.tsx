'use client';

import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import CVDownload from './CVDownload';
import { Reveal } from './Reveal';
import { useLang } from '@/lib/i18n';

export default function Contact() {
  const { t, ar } = useLang();

  const channels = [
    { icon: Mail, label: t.contact.email, value: 'aywisee@gmail.com', href: 'mailto:aywisee@gmail.com' },
    { icon: Phone, label: t.contact.whatsapp, value: '+966 56 335 9181', href: 'https://wa.me/966563359181' },
    { icon: Phone, label: t.contact.call, value: '+966 56 335 9181', href: 'tel:+966563359181' },
  ];

  const links = [
    { label: t.contact.cocoonz, href: 'https://cocoonz.com.sa/' },
    { label: t.contact.alromansiah, href: 'https://alromansiah.com/ar' },
  ];

  return (
    <section id="contact" className="bg-charcoal py-28 text-ivory">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-taupe">{t.contact.eyebrow}</p>
          <h2 className="mt-6 text-[11vw] font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {t.contact.title}
          </h2>
          <p className="mt-6 max-w-xl text-base text-ivory/60" dir={ar ? 'rtl' : 'ltr'}>
            {t.contact.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-ivory/10 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex h-44 flex-col justify-between bg-charcoal p-8 transition-colors duration-500 hover:bg-ivory hover:text-charcoal"
              >
                <c.icon size={20} className="text-taupe" />
                <span>
                  <span className="block text-xs uppercase tracking-widest opacity-60">{c.label}</span>
                  <span className="mt-1 flex items-center gap-2 text-lg font-medium">
                    {c.value}
                    <ArrowUpRight size={16} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <CVDownload variant="contact" />
            <div className="flex items-center gap-6">
              <span className="text-xs uppercase tracking-widest text-ivory/40">{t.contact.links}</span>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ivory/70 underline-offset-4 transition-colors hover:text-taupe hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-20 border-t border-ivory/10 pt-8">
          <p className="text-xs text-ivory/40">{t.footer}</p>
        </div>
      </div>
    </section>
  );
}
