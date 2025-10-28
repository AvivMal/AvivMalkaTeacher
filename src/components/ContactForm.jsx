// =====================
// src/components/ContactForm.jsx (Supabase + optional EmailJS notify)
// =====================
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import emailjs from "@emailjs/browser";      // אופציונלי: התראה במייל

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  // מנרמל טלפון: מאפשר 052-1234567 או 0521234567 וכו'
  const normalizePhone = (p) => (p || "").replace(/[^\d+]/g, "");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const {
      fullName,
      phone: rawPhone,
      email,
      subject,
      message,
      consent,
      company, // honeypot (נגד בוטים)
    } = data;

    // חסימת בוטים: אם honeypot מולא – לא שולחים
    if (company) {
      setStatus({ type: "success", msg: "תודה! הפרטים התקבלו." });
      form.reset();
      return;
    }

    // ולידציות בסיס
    if (!fullName || !rawPhone || !email || !subject) {
      setStatus({
        type: "error",
        msg: "נא למלא שם מלא, טלפון, אימייל ונושא.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", msg: "כתובת האימייל אינה תקינה." });
      return;
    }

    const phone = normalizePhone(rawPhone);
    // מספר ישראלי: מתחיל ב-0 ובסה״כ 9–10 ספרות אחרי הנירמול
    if (!/^0\d{8,9}$/.test(phone)) {
      setStatus({
        type: "error",
        msg: "מספר הטלפון אינו תקין. יש להזין מספר ישראלי בפורמט 05XXXXXXXX.",
      });
      return;
    }

    // בניית מטא־דאטה
    const qs = new URLSearchParams(window.location.search);
    const payload = {
      full_name: fullName,
      email: email.trim().toLowerCase(),
      phone,
      // נשלב את ה-subject בתחילת ההודעה לשמירת העיקר (אפשר גם להוסיף עמודה subject בטבלה אם תרצה)
      message:
        (subject ? `נושא: ${subject}\n` : "") + (message || "").trim(),
      source_path: window.location.pathname,
      utm_source: qs.get("utm_source"),
      utm_medium: qs.get("utm_medium"),
      utm_campaign: qs.get("utm_campaign"),
      consent: consent === "on",
    };

    setLoading(true);
    try {
      // 1) שליחה ל-Supabase
      const { error } = await supabase.from("leads").insert(payload);
      if (error) throw error;

      // 2) (אופציונלי) שליחת התראה פנימית במייל דרך EmailJS
      //    אם לא צריך – מחק את כל הבלוק try/catch הזה.
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            fullName,
            phone,
            email,
            subject,
            message: message || "",
            submittedAt: new Date().toLocaleString("he-IL"),
            pageUrl: window.location.href,
          },
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
        );
      } catch (notifyErr) {
        // לא מפיל את המשתמש — רק לוג. הליד כבר נשמר ב-DB.
        console.warn("EmailJS notify failed:", notifyErr);
      }

      setStatus({ type: "success", msg: "הפרטים נשלחו בהצלחה!" });
      form.reset();
    } catch (err) {
      console.error("Submit error:", err);
      setStatus({
        type: "error",
        msg: "אירעה שגיאה בשליחה. נסו שוב בעוד רגע.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gradient-purple">
          צור קשר
        </h2>
        <p className="text-[var(--color-text-muted)] mb-10">
          מלא/י את הפרטים ואחזור אליך בהקדם.
        </p>

        <form
          onSubmit={handleSubmit}
          className="glass-card-alt premium-border p-8 text-left space-y-4"
        >
          {/* honeypot נגד ספאם */}
          <input
            type="text"
            name="company"
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 gap-4" dir="rtl">
            <input
              name="fullName"
              type="text"
              placeholder="שם מלא"
              className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="טלפון (למשל 052-1234567)"
              className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="אימייל"
            className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            required
          />
          <input
            name="subject"
            type="text"
            placeholder="נושא או קורס בו נדרשת עזרה"
            className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="פירוט הבקשה"
            className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          ></textarea>

          <label className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <input type="checkbox" name="consent" className="scale-110" />
            אני מאשר/ת יצירת קשר
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full font-bold py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "שולח..." : "שלח"}
          </button>

          {status.type !== "idle" && (
            <div
              className={`mt-4 p-4 rounded-2xl shadow-lg glass-card-alt flex items-center gap-3 transition-all duration-500 ${
                status.type === "success"
                  ? "bg-green-500/20 text-green-300 border border-green-500/40"
                  : "bg-red-500/20 text-red-300 border border-red-500/40"
              }`}
            >
              {status.type === "success" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{status.msg}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
