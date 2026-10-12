'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import Experience from '@/components/Experience';
import Impact from '@/components/Impact';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Page() {
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
      <About />
      <Contact />
    </main>
  );
}
