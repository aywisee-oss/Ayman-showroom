'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLang } from '@/lib/i18n';

export default function StudioCaseStudy() {
  const { ar, setLang } = useLang();
  useEffect(() => { if (new URLSearchParams(window.location.search).get("lang") === "ar") setLang("ar"); }, [setLang]);
  const text = (en: string, arabic: string) => ar ? arabic : en;
  const sections = [
    [text('The challenge', 'التحدي'), text('Early ideas need clear next steps. Repetitive output and dense mobile reports made it difficult to compare perspectives or decide what to do next.', 'تحتاج الأفكار الأولية إلى خطوات واضحة. تكرار المخرجات وكثافة التقارير على الجوال صعّبا مقارنة وجهات النظر وتحديد الخطوة التالية.')],
    [text('The approach', 'المنهج'), text('One workspace separates idea analysis, execution planning and critical review. A final report brings together proposed objectives, a timeline, risks and recommendations.', 'تفصل مساحة العمل بين تحليل الفكرة وخطة التنفيذ والمراجعة النقدية. يجمع التقرير النهائي الأهداف المقترحة وجدول التنفيذ والمخاطر والتوصيات.')],
    [text('The experience', 'التجربة'), text('English and Arabic, LTR and RTL navigation, dark and light themes, project history and JSON / Markdown downloads. Reports use readable mobile sections and distinct contribution tabs.', 'العربية والإنجليزية، واتجاها LTR وRTL، ومظهران داكن وفاتح، وسجل المشاريع وتنزيل JSON وMarkdown. تعرض التقارير أقسامًا مقروءة على الجوال وتبويبات للمساهمات المختلفة.')],
    [text('Transparent by design', 'وضوح مصدر النتائج'), text('The public version uses illustrative local simulation, not live AI responses or market research. Gemini 2.5 Flash integration is prepared on a separate branch for owner-only use, with sequential Analyst, Strategist and Reviewer roles. Real connectivity has not been verified or activated.', 'تستخدم النسخة العامة محاكاة محلية توضيحية وليست استجابات ذكاء اصطناعي حي أو بحث سوق. جرى تجهيز تكامل Gemini 2.5 Flash في فرع مستقل لاستخدام المالك فقط، بأدوار Analyst وStrategist وReviewer المتتابعة. لم يُتحقق من الاتصال الحقيقي أو يُفعّل بعد.')],
    [text('Validation and boundaries', 'التحقق والحدود'), text('Automated tests cover simulated responses, report generation, persistence and export. Browser checks use desktop and mobile emulation. Live Gemini and hosted authentication remain pending; this project does not claim verified market forecasts.', 'تغطي الاختبارات الآلية الاستجابات الوهمية والتقارير والحفظ والتصدير. تستخدم اختبارات المتصفح الكمبيوتر ومحاكاة الجوال. اختبار Gemini الحي والمصادقة المستضافة ما زالا معلقين؛ ولا يدّعي المشروع تقديم توقعات سوق موثقة.')],
  ];
  return (
    <main className="min-h-screen bg-charcoal text-ivory">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
        <nav className="flex flex-wrap items-center justify-between gap-6 text-sm" aria-label={text('Project navigation', 'تنقل المشروع')}>
          <Link href="/#portfolio" className="py-3 text-taupe hover:text-ivory">{text('Back to portfolio', 'العودة إلى معرض الأعمال')}</Link>
          <button type="button" onClick={() => setLang(ar ? 'en' : 'ar')} className="min-h-12 border border-ivory/25 px-5" aria-label={text('Switch language', 'تغيير اللغة')}>EN / AR</button>
        </nav>
        <header className="border-b border-ivory/15 py-16 sm:py-24">
          <p className="text-xs uppercase tracking-widest2 text-taupe">{text('Ayman Al Hussam · Case study', 'أيمن الحسام · دراسة مشروع')}</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-7xl">AYMAN AI STUDIO</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory/70">{text('From a rough idea to a clearer plan.', 'من فكرة أولية إلى خطة أوضح.')}</p>
          <p className="mt-5 text-sm text-taupe">{text('Current status: local simulation · Gemini not activated', 'الحالة الحالية: محاكاة محلية · Gemini غير مفعّل')}</p>
        </header>
        <div className="divide-y divide-ivory/15">{sections.map(([title, body], i) => <section key={i} className="grid gap-5 py-10 sm:grid-cols-[1fr_2fr]"><h2 className="text-xl font-semibold">{title}</h2><p className="text-sm leading-8 text-ivory/70">{body}</p></section>)}</div>
        <a href="https://ayman-ai-studio.vercel.app/" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-12 items-center bg-ivory px-7 py-4 text-sm text-charcoal hover:bg-taupe">{text('Open AYMAN AI STUDIO ↗', 'افتح AYMAN AI STUDIO ↗')}</a>
      </div>
    </main>
  );
}
