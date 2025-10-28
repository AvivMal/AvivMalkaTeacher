// src/components/SurveyModal.jsx
import { useEffect, useRef } from "react";

export default function SurveyModal({ open, onClose, onCTA }) {
  const dialogRef = useRef(null);

  // סגירה ב-Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="lg-survey-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.(); // קליק על רקע סוגר
      }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* card */}
      <div
        ref={dialogRef}
        className="relative glass-card max-w-lg w-full p-6 animate-fade-in-up"
        dir="rtl"
      >
        {/* X */}
        <button
          onClick={onClose}
          aria-label="סגור הודעה"
          className="absolute top-3 left-3 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
        >
          ✕
        </button>

        <div className="mb-2 text-sm text-white/70">Learnin-Go Studios</div>
        <h3 id="lg-survey-title" className="text-2xl font-bold mb-2">
          עוזרים לנו לבנות את דור ה-AI בלמידה הדיגיטלית 🚀
        </h3>
        <p className="text-white/85 mb-4">
          אנחנו מפתחים מוצר חדש שיוצר תוצרי למידה דיגיטליים עם AI. נשמח לשמוע ממך
          ב<span className="font-semibold">סקר קצר</span> — ובתמורה תקבל/י{" "}
          <span className="font-semibold">שובר 15% הנחה</span> למימוש על 5 שיעורים
          פרטיים, לאחר מילוי הסקר והרשמה באתר{" "}
          <a
            href="https://www.learnin-go.com"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            www.learnin-go.com
          </a>
          .
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button className="btn btn--ghost" onClick={onClose}>
            לא עכשיו
          </button>
          <button className="btn" onClick={onCTA}>
            למילוי הסקר
          </button>
        </div>

        <p className="mt-3 text-xs text-white/60">
          *השובר נשלח ישירות למייל לאחר מילוי הסקר והרשמה לאתר.
        </p>
      </div>
    </div>
  );
}
