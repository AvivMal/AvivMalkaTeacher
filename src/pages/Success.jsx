// src/pages/Success.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Success() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const pending = urlParams.get("pending") === "1";

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const booking_id = params.get("booking_id");
        if (!booking_id) return setLoading(false);

        // 1) שלוף את ההזמנה
        const { data: booking, error: bErr } = await supabase
          .from("bookings")
          .select("id, full_name, email, phone, deposit_ils, status, created_at")
          .eq("id", booking_id)
          .single();
        if (bErr || !booking) return setLoading(false);

        // 2) שלוף את המשבצות הקשורות
        const { data: bs, error: bsErr } = await supabase
          .from("booking_slots")
          .select("slot_id, slots!inner(id, start_at, end_at)")
          .eq("booking_id", booking_id);
        if (bsErr) return setLoading(false);

        const slots = (bs || []).map(r => r.slots);

        setSummary({ booking, slots });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="py-16 px-6"><div className="max-w-2xl mx-auto">טוען…</div></section>;

  if (!summary) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto glass-card p-6">
          {pending && (
                      <div className="mb-4 rounded-xl border border-yellow-400/40 bg-yellow-500/10 p-3 text-yellow-200 text-sm">
                        שלחנו אליך קישור לתשלום בוואטסאפ. לאחר התשלום העמוד יתעדכן אוטומטית ותישלח קבלה בוואטסאפ
                      </div>
                    )}
          <h2 className="text-2xl font-bold mb-2">לא נמצאה הזמנה</h2>
          <p className="text-white/70">ייתכן שהקישור שגוי או שפג תוקפו.</p>
        </div>
      </section>
    );
  }

  const { booking, slots } = summary;

  return (
    <section className="py-16 px-6" dir="rtl">
      <div className="max-w-2xl mx-auto glass-card p-6">
        <h2 className="text-2xl font-bold mb-2">ההזמנה התקבלה 🎉</h2>
        <p className="text-white/80 mb-4">
          תודה, {booking.full_name}. המועדים שסימנת ננעלו עבורך. נחזור אליך בהקדם לאישור סופי.
        </p>

        <div className="rounded-xl border border-white/10 p-4 mb-4">
          <p className="font-semibold mb-2">פרטי הזמנה</p>
          <ul className="text-sm text-white/80 space-y-1">
            <li>מס׳ הזמנה: <b className="text-white">{booking.id}</b></li>
            <li>אימייל: <b className="text-white">{booking.email}</b></li>
            <li>טלפון: <b className="text-white">{booking.phone}</b></li>
            <li>מקדמה (לפי 30₪ לשיעור): <b className="text-white">{booking.deposit_ils} ₪</b></li>
            <li>סטטוס: <b className="text-white">{booking.status}</b></li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="font-semibold mb-2">שיעורים שנבחרו</p>
          <ul className="space-y-2">
            {slots.map(s => {
              const dt = new Date(s.start_at);
              const d  = dt.toLocaleDateString("he-IL",{weekday:"short", day:"2-digit", month:"2-digit"});
              const t  = dt.toLocaleTimeString("he-IL",{hour:"2-digit", minute:"2-digit"});
              return <li key={s.id} className="text-sm">{d} · {t} (60 ד׳)</li>;
            })}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a href="/aviv_teacher" className="btn">חזרה לדף הראשי</a>
        </div>
      </div>
    </section>
  );
}
