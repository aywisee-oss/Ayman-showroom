'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import Experience from '@/components/Experience';
import Impact from '@/components/Impact';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Portfolio from '@/components/Portfolio';
import MagazineCard from '@/components/MagazineCard';
import { useLang } from '@/lib/i18n';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Page() {
  const { lang } = useLang();
  return (
    <main>
      <Navbar />
      <Hero />
      <Collection />
      <Experience />
      <Impact />
      <Skills />
      <Education />
      <Portfolio />
      <div className="bg-charcoal px-6 pb-24"><MagazineCard locale={lang} /></div>
      <About />
      <Contact />
    </main>
  );
}
