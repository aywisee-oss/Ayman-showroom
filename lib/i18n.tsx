'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dict, Lang } from './data';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof dict)['en'];
  ar: boolean;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: dict.en, ar: false });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.classList.toggle('font-arabic', lang === 'ar');
    document.body.classList.toggle('font-sans', lang !== 'ar');
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: dict[lang] as (typeof dict)['en'], ar: lang === 'ar' }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
