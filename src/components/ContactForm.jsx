// =====================
// src/components/ContactForm.jsx (UPDATED DESIGN with Styled Status)
// =====================
import { useState } from "react";
import emailjs from "@emailjs/browser"; // npm i @emailjs/browser

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "idle", msg: "" });

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const { fullName, phone, email, subject, message } = data;

    if (!fullName || !phone || !email || !subject) {
      setStatus({ type: "error", msg: "נא למלא שם מלא, טלפון, אימייל ונושא." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", msg: "כתובת האימייל אינה תקינה." });
      return;
    }
    if (!/^0\d{8,9}$/.test(phone)) {
      setStatus({ type: "error", msg: "מספר הטלפון אינו תקין. יש להזין מספר ישראלי בפורמט 05XXXXXXXX." });
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { fullName, phone, email, subject, message: message || "", submittedAt: new Date().toLocaleString("he-IL"), pageUrl: window.location.href },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setStatus({ type: "success", msg: "הפרטים נשלחו בהצלחה!" });
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", msg: "אירעה שגיאה בשליחה. נסו שוב בעוד רגע." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-[var(--color-bg-alt)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gradient-purple">צור קשר</h2>
        <p className="text-[var(--color-text-muted)] mb-10">מלא/י את הפרטים ואחזור אליך בהקדם.</p>

        <form onSubmit={handleSubmit} className="glass-card-alt premium-border p-8 text-left space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="fullName" type="text" placeholder="שם מלא" className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            <input name="phone" type="tel" placeholder="טלפון" className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>

          <input name="email" type="email" placeholder="אימייל" className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          <input name="subject" type="text" placeholder="נושא או קורס בו נדרשת עזרה" className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          <textarea name="message" rows="5" placeholder="פירוט הבקשה" className="w-full rounded-lg p-3 bg-[var(--color-bg)] text-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"></textarea>

          <button type="submit" disabled={loading} className="w-full font-bold py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:scale-[1.02] transition disabled:opacity-60">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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