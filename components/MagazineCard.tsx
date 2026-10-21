// components/MagazineCard.tsx — بطاقة المجلة الفاخرة (معزولة بالكامل، لا تعدّل أي ملف قائم)
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./magazine-card.module.css";

const COPY = {
  ar: {
    title: "AYMAN AL HUSSAM",
    subtitle: "CREATIVE PORTFOLIO — 2026",
    desc: "رحلة بصرية تجمع بين التصميم الإبداعي، والهوية البصرية، والتسويق الرقمي، وتطوير الأفكار إلى تجارب مؤثرة.",
    cta: "استكشف المجلة ↗",
    label: "افتح مجلة الأعمال الإبداعية",
  },
  en: {
    title: "AYMAN AL HUSSAM",
    subtitle: "CREATIVE PORTFOLIO — 2026",
    desc: "A visual journey blending creative design, brand identity, and digital marketing — turning ideas into impactful experiences.",
    cta: "Explore Portfolio ↗",
    label: "Open the creative portfolio magazine",
  },
} as const;

export default function MagazineCard({ locale = "ar" }: { locale?: "ar" | "en" }) {
  const t = COPY[locale];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // ظهور ناعم أثناء التمرير + احترام تقليل الحركة
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), io.disconnect()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${styles.card} ${visible ? styles.in : ""}`}
      aria-label={t.label}
    >
      {/* الغلاف الأصلي — تصيير حقيقي من المجلة، lazy حتى لا يبطئ الرئيسية */}
      <Link href="/portfolio" className={styles.coverLink} tabIndex={-1} aria-hidden="true">
        <span className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/magazine-cover.webp"
            alt=""
            width={440}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </span>
      </Link>

      <div className={styles.body}>
        <p className={styles.kicker}>{t.subtitle}</p>
        <h3 className={styles.title}>{t.title}</h3>
        <p className={styles.desc}>{t.desc}</p>
        <Link href="/portfolio" className={styles.cta}>
          <span>{t.cta}</span>
        </Link>
      </div>
    </section>
  );
}
