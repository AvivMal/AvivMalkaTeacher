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

    // ולידציה בסיסית
    if (!fullName || !phone || !email || !subject) {
      setStatus({
        type: "error",
        msg: "נא למלא שם מלא, טלפון, אימייל ונושא.",
      });
      return;
    }

        // ולידציה לאימייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        msg: "כתובת האימייל אינה תקינה.",
      });
      return;
    }

    const phoneRegex = /^0\d{8,9}$/;
      if (!phoneRegex.test(phone)) {
      setStatus({
        type: "error",
        msg: "מספר הטלפון אינו תקין. יש להזין מספר ישראלי בפורמט 05XXXXXXXX.",
      });
      return;
    }

    setLoading(true);
    try {
      // --- שלב 1: שליחת מייל חובה (EmailJS) ---
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

      // --- שלב 2: שליחה לגוגל שיטס (לא קריטי למשתמש) ---
      if (import.meta.env.VITE_LEADS_ENDPOINT) {
        fetch(import.meta.env.VITE_LEADS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            fullName,
            phone,
            email,
            subject,
            message: message || "",
            source: window.location.href,
          }),
        })
          .then((res) => console.log("Sheets status:", res.status))
          .catch((err) => console.error("Sheets error:", err));
      }

      // --- שלב 3: פינג ל־Webhook / וואטסאפ / טלגרם (לא קריטי) ---
      if (import.meta.env.VITE_NOTIFY_WEBHOOK_URL) {
        fetch(import.meta.env.VITE_NOTIFY_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "lead",
            text: `Lead: ${fullName} | ${phone} | ${email} | ${subject}`,
            payload: { fullName, phone, email, subject, message },
          }),
        })
          .then((res) => console.log("Webhook status:", res.status))
          .catch((err) => console.error("Webhook error:", err));
      }

      // --- הצלחה למשתמש ---
      setStatus({
        type: "success",
        msg: "הפרטים נשלחו בהצלחה!",
      });
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        type: "error",
        msg: "אירעה שגיאה בשליחה. נסו שוב בעוד רגע.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
          צור קשר
        </h2>
        <p className="text-center text-gray-600 mb-10">
          מלא/י את הפרטים ואחזור אליך בהקדם.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="fullName"
              type="text"
              placeholder="שם מלא"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              name="phone"
              type="tel"
              placeholder="טלפון"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="אימייל"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="subject"
            type="text"
            placeholder="נושא או קורס בו נדרשת עזרה"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="פירוט הבקשה"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F49F0A] text-[#0D1B2A] font-semibold py-3 rounded-lg shadow-lg hover:bg-orange-500 transition disabled:opacity-60"
          >
            {loading ? "שולח..." : "שלח"}
          </button>

          {status.type !== "idle" && (
            <div
              className={`text-center font-medium ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.msg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
