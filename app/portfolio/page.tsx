// app/portfolio/page.tsx — صفحة عرض المجلة التفاعلية
// المجلة نفسها ملفات ثابتة في /public/ayman-magazine/ (منسوخة دون تعديل)
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AYMAN AL HUSSAM — Creative Portfolio",
  description:
    "رحلة بصرية تجمع بين التصميم الإبداعي، والهوية البصرية، والتسويق الرقمي — مجلة تفاعلية تتقلب صفحاتها من اليمين إلى اليسار.",
};

export default function PortfolioPage() {
  return (
    <main dir="rtl" style={{ position: "fixed", inset: 0, background: "#0c120f" }}>
      <iframe
        src="/ayman-magazine/index.html"
        title="مجلة أيمن الحسّام — Creative Portfolio"
        allow="fullscreen"
        allowFullScreen
        loading="eager"
        style={{
          position: "fixed", inset: 0,
          width: "100%", height: "100dvh",
          border: 0, display: "block",
        }}
      />
      <Link
        href="/"
        aria-label="العودة إلى الموقع"
        style={{
          position: "fixed",
          top: "max(12px, env(safe-area-inset-top))",
          insetInlineStart: "max(12px, env(safe-area-inset-left))",
          zIndex: 60,
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 18px",
          borderRadius: "999px",
          background: "rgba(12,18,15,.72)",
          color: "#f2ecdf",
          border: "1px solid rgba(184,147,90,.55)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          fontSize: "14px",
          textDecoration: "none",
          transition: "background .25s ease, border-color .25s ease",
        }}
      >
        <span aria-hidden="true">→</span> العودة للموقع
      </Link>
    </main>
  );
}
