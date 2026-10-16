'use client';

import Link from 'next/link';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Reveal } from './Reveal';

export default function StudioProject() {
  const { ar } = useLang();
  return (
    <Reveal>
      <article aria-labelledby="studio-project-title" className="mt-16 border border-ivory/15 p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest2 text-taupe">{ar ? 'مشروع رقمي · تخطيط الأفكار' : 'Digital project · Idea planning'}</p>
            <h3 id="studio-project-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">AYMAN AI STUDIO</h3>
            <p className="mt-5 text-sm leading-7 text-ivory/70">{ar ? 'استوديو تخطيط ثنائي اللغة يحوّل الفكرة إلى تحليل منظم وخطة تنفيذ ومراجعة نقدية، مع تقرير نهائي وحفظ المشاريع وتصدير النتائج.' : 'A bilingual planning studio that turns an idea into structured analysis, an execution plan and a critical review, with a final report, saved projects and exportable results.'}</p>
          </div>
          <Layers3 size={40} strokeWidth={1} className="text-taupe" aria-hidden="true" />
        </div>
        <ul className="mt-7 flex flex-wrap gap-3 text-xs text-ivory/60" aria-label={ar ? 'تقنيات المشروع' : 'Project technology'}>
          {['Next.js', 'TypeScript', 'EN / AR', 'JSON / Markdown'].map(tag => <li className="border border-ivory/15 px-3 py-2" key={tag}>{tag}</li>)}
        </ul>
        <p className="mt-7 max-w-2xl text-xs leading-6 text-taupe">{ar ? 'المتاح حاليًا: محاكاة محلية تجريبية. تكامل Gemini قيد التجهيز ولم يُختبر أو يُفعّل بعد.' : 'Currently available: an illustrative local simulation. Gemini integration is being prepared and has not yet been live-tested or activated.'}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://ayman-ai-studio.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 bg-ivory px-6 py-3 text-sm text-charcoal transition-colors hover:bg-taupe">{ar ? 'استكشف الاستوديو' : 'Explore the studio'}<ArrowUpRight size={17} aria-hidden="true" /></a>
          <Link href={ar ? "/projects/ayman-ai-studio?lang=ar" : "/projects/ayman-ai-studio"} className="inline-flex min-h-12 items-center gap-3 border border-ivory/25 px-6 py-3 text-sm transition-colors hover:border-taupe">{ar ? 'دراسة المشروع' : 'View case study'}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </article>
    </Reveal>
  );
}
