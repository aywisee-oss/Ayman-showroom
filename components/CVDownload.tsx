'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Download, FileText, FileType2, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

type CvLanguage = 'ar' | 'en';
type CvFormat = 'pdf' | 'docx';
type Variant = 'hero' | 'contact';

const CV_FILES: Record<CvLanguage, Record<CvFormat, string>> = {
  ar: {
    pdf: '/cv/Ayman_Al_Hussam_Professional_CV_AR.pdf',
    docx: '/cv/Ayman_Al_Hussam_Professional_CV_AR.docx',
  },
  en: {
    pdf: '/cv/Ayman_Al_Hussam_Professional_CV_EN.pdf',
    docx: '/cv/Ayman_Al_Hussam_Professional_CV_EN.docx',
  },
};

export default function CVDownload({ variant = 'hero' }: { variant?: Variant }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<CvLanguage>('en');
  const [format, setFormat] = useState<CvFormat>('pdf');
  const closeButton = useRef<HTMLButtonElement>(null);
  const triggerButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const rtl = lang === 'ar';

  const copy = rtl ? {
    title: 'تحميل السيرة الذاتية', subtitle: 'اختر اللغة والصيغة المناسبة لك',
    language: 'لغة السيرة الذاتية', format: 'صيغة الملف',
    arabic: 'العربية', english: 'الإنجليزية',
    pdf: 'PDF', word: 'Word', pdfHint: 'للعرض والمشاركة', wordHint: 'قابل للتعديل',
    download: 'تحميل السيرة الذاتية', close: 'إغلاق النافذة',
  } : {
    title: 'Download My CV', subtitle: 'Choose your preferred language and format',
    language: 'CV language', format: 'File format',
    arabic: 'Arabic', english: 'English',
    pdf: 'PDF', word: 'Word', pdfHint: 'Ready to share', wordHint: 'Editable document',
    download: 'Download CV', close: 'Close dialog',
  };

  function openDialog() {
    setLanguage(lang);
    setFormat('pdf');
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
    triggerButton.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDialog();
      if (event.key !== 'Tab') return;
      const dialog = document.getElementById('cv-download-dialog');
      const controls = Array.from(dialog?.querySelectorAll<HTMLElement>('button, a[href]') ?? []);
      if (!controls.length) return;
      if (event.shiftKey && document.activeElement === controls[0]) {
        event.preventDefault();
        controls[controls.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) {
        event.preventDefault();
        controls[0].focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const triggerClass = variant === 'hero'
    ? 'inline-flex items-center gap-2 rounded-full border border-ivory/50 px-7 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-charcoal'
    : 'inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3 text-sm font-medium text-charcoal transition-transform duration-300 hover:scale-[1.03]';

  const selectorClass = (active: boolean) =>
    'relative flex min-h-[90px] flex-col items-center justify-center gap-1 rounded-xl border px-3 py-4 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6a18b] ' +
    (active ? 'border-[#b6a18b] bg-[#b6a18b]/10' : 'border-white/20 bg-white/5 hover:border-white/50');

  return (
    <>
      <button type="button" ref={triggerButton} onClick={openDialog} className={triggerClass}>
        <Download size={16} aria-hidden="true" />
        {variant === 'hero' ? t.hero.download : t.contact.cv}
      </button>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="cv-modal-overlay"
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onMouseDown={(event) => { if (event.currentTarget === event.target) closeDialog(); }}
            >
              <motion.div
                id="cv-download-dialog" role="dialog" aria-modal="true" aria-labelledby="cv-download-title"
                dir={rtl ? 'rtl' : 'ltr'}
                className="relative my-auto w-full max-w-md rounded-2xl border border-[#b6a18b]/35 bg-[#171717] p-6 text-white shadow-2xl sm:p-8"
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <span className="pt-1 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#b6a18b]">AYMAN AL HUSSAM</span>
                  <button type="button" ref={closeButton} onClick={closeDialog} aria-label={copy.close}
                    className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b6a18b]">
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
                <h2 id="cv-download-title" className="text-center text-2xl font-semibold sm:text-3xl">{copy.title}</h2>
                <p className="mt-2 text-center text-sm text-white/60">{copy.subtitle}</p>

                <div className="mt-7">
                  <h3 className="mb-3 text-sm font-semibold">01 — {copy.language}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(['ar', 'en'] as const).map((option) => (
                      <button key={option} type="button" aria-pressed={language === option} onClick={() => setLanguage(option)} className={selectorClass(language === option)}>
                        {language === option && <Check size={15} className="absolute top-2 end-2 text-[#b6a18b]" aria-hidden="true" />}
                        <span className="font-semibold">{option === 'ar' ? copy.arabic : copy.english}</span>
                        <span className="text-xs text-white/50" lang={option}>{option === 'ar' ? 'العربية' : 'English'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold">02 — {copy.format}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(['pdf', 'docx'] as const).map((option) => (
                      <button key={option} type="button" aria-pressed={format === option} onClick={() => setFormat(option)} className={selectorClass(format === option)}>
                        {format === option && <Check size={15} className="absolute top-2 end-2 text-[#b6a18b]" aria-hidden="true" />}
                        {option === 'pdf' ? <FileText size={21} className="text-[#b6a18b]" aria-hidden="true" /> : <FileType2 size={21} className="text-[#b6a18b]" aria-hidden="true" />}
                        <span className="font-semibold">{option === 'pdf' ? copy.pdf : copy.word}</span>
                        <span className="text-xs text-white/50">{option === 'pdf' ? copy.pdfHint : copy.wordHint}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <a href={CV_FILES[language][format]}
                  download={CV_FILES[language][format].split('/').pop()}
                  onClick={closeDialog}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b6a18b] px-5 py-4 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#d1bca4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6a18b]">
                  <Download size={17} aria-hidden="true" />{copy.download}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>, document.body
      )}
    </>
  );
}
