import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ZAP_URL = "https://hooks.zapier.com/hooks/catch/25101713/ui2gd2w/"; // להחליף ל-URL האמיתי

const SUBJECTS = [
  "תכנות מונחה עצמים","מתמטיקה","אנגלית","בסיסי נתונים","ניהול מערכות מידע",
  "מבוא למשפט","מבוא לשיווק","סטטיסטיקה והסתברות","מתמטיקה בדידה","יסודות הניהול",
  "אתיקה בניהול","ניהול משאבי אנוש","אפיון ותכן מערכות מידע","כלכלה","חשבונאות",
  "ניתוח דוחות כספיים","יסודות המימון","אחר"
];
const LEVELS = ["ללמוד הכל מהיסוד","רמה בסיסית","רמה בינונית","רמה גבוהה - מעוניינ.ת להתמקצע"];

const normalizePhone = (p) => (p || "").replace(/[^\d+]/g, "");

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    subjects: [],
    level: ""
  });
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  // ✦ בחירת תאריך ותצוגת שעות — ממוקם בתוך הקומפוננטה ✦
const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD

// רשימת ימים זמינים מתוך ה-slots
const uniqueDays = useMemo(() => {
  const set = new Set();
  for (const s of slots) {
    const d = new Date(s.start_at);
    const iso = d.toISOString().slice(0,10); // YYYY-MM-DD
    set.add(iso);
  }
  return Array.from(set).sort();
}, [slots]);

// ברירת מחדל: היום הראשון הזמין
useEffect(() => {
  if (!selectedDate && uniqueDays.length) setSelectedDate(uniqueDays[0]);
}, [uniqueDays, selectedDate]);

// משבצות לפי התאריך הנבחר
const slotsForSelectedDay = useMemo(() => {
  if (!selectedDate) return [];
  return slots.filter(
    s => new Date(s.start_at).toISOString().slice(0,10) === selectedDate
  );
}, [slots, selectedDate]);


  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("slots")
        .select("id,start_at,end_at,is_booked,is_active")
        .eq("is_active", true)
        .eq("is_booked", false)
        .order("start_at", { ascending: true });
      if (error) console.error(error);
      setSlots(data || []);
    })();
  }, []);

const deposit = useMemo(() => 30 * selected.size, [selected.size]);

  // קיבוץ לפי יום להצגה נקייה
  const byDay = useMemo(() => {
    const m = new Map();
    for (const s of slots) {
      const key = new Date(s.start_at).toLocaleDateString("he-IL", {
        weekday: "long", day: "2-digit", month: "2-digit"
      });
      if (!m.has(key)) m.set(key, []);
      m.get(key).push(s);
    }
    for (const arr of m.values()) arr.sort((a,b)=> new Date(a.start_at)-new Date(b.start_at));
    return m;
  }, [slots]);

  function validateStep1() {
    if (!form.full_name?.trim()) return "נא להזין שם מלא";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || "")) return "אימייל לא תקין";
    const p = normalizePhone(form.phone);
    if (!/^0\d{8,9}$/.test(p)) return "טלפון בפורמט 05XXXXXXXX";
    if (!form.subjects.length) return "בחר/י לפחות נושא אחד";
    if (!form.level) return "בחר/י רמת ידע";
    return null;
  }

  function toggleSlot(id) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function nextStep() {
    if (step === 1) {
      const err = validateStep1();
      if (err) return setStatus({ type: "error", msg: err });
      setStatus({ type: "idle", msg: "" });
      setStep(2);
    } else if (step === 2) {
      if (!selected.size) return setStatus({ type: "error", msg: "בחר/י לפחות שיעור אחד" });
      setStatus({ type: "idle", msg: "" });
      setStep(3);
    }
  }

 async function createBooking() {
  try {
    setLoading(true);
    setStatus({ type: "idle", msg: "" });

    const res = await fetch("https://psppryrkyxxhmtcpbone.functions.supabase.co/create-booking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: normalizePhone(form.phone),
        subjects: form.subjects,
        level: form.level,
        slot_ids: Array.from(selected),
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data?.error || "שגיאה ביצירת הזמנה");

    // שולחים ל-Zapier את פרטי ההזמנה כדי שיצור לינק תשלום וישלח בוואטסאפ
await fetch(ZAP_URL, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    booking_id: data.booking_id,
    amount: deposit,                    // יש לך כבר const deposit = 30 * selected.size
    customer: {
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: (form.phone || "").replace(/[^\d+]/g, "")
    },
    details: {
      subjects: form.subjects,
      level: form.level,
      slot_ids: Array.from(selected)
    }
  }),
});

// עוברים למסך הצלחה עם דגל "ממתין לתשלום"
window.location.href = `/success?booking_id=${data.booking_id}&pending=1`;
  } catch (e) {
    setStatus({ type: "error", msg: e.message });
  } finally {
    setLoading(false);
  }
}


  // ===== UI HELPERS =====
  const inputClass =
    "w-full rounded-xl p-3 bg-[var(--color-bg)]/90 text-white placeholder-white/40 " +
    "border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]";

  const chipBase =
    "rounded-xl border px-3 py-2 text-right transition select-none";
  const chipActive =
    "bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-blue-400/60 text-white ring-1 ring-blue-300/50";
  const chipIdle =
    "bg-white/5 border-white/10 text-white/90 hover:bg-white/10";

  const levelBase =
    "rounded-xl border px-3 py-2 transition select-none";
  const levelActive =
    "bg-purple-600/40 border-purple-400/60 ring-1 ring-purple-300/50";
  const levelIdle =
    "bg-white/5 border-white/10 hover:bg-white/10";

  const timeBase =
    "rounded-xl border px-3 py-2 transition select-none";
  const timeActive =
    "bg-blue-600/35 border-blue-400/60 ring-1 ring-blue-300/50";
  const timeIdle =
    "bg-white/5 border-white/10 hover:bg-white/10";

  return (
    <section className="py-10 px-6" id="booking" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className={`h-8 px-3 rounded-full border flex items-center gap-2 ${step>=1 ? "bg-white/10 border-white/25" : "bg-white/5 border-white/10"}`}>
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${step>=1 ? "bg-purple-600 text-white" : "bg-white/10 text-white/60"}`}>1</span>
              פרטים
            </div>
            <div className={`h-px w-10 ${step>=2 ? "bg-purple-400/70" : "bg-white/15"}`} />
            <div className={`h-8 px-3 rounded-full border flex items-center gap-2 ${step>=2 ? "bg-white/10 border-white/25" : "bg-white/5 border-white/10"}`}>
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${step>=2 ? "bg-purple-600 text-white" : "bg-white/10 text-white/60"}`}>2</span>
              תזמון שיעורים
            </div>
            <div className={`h-px w-10 ${step>=3 ? "bg-purple-400/70" : "bg-white/15"}`} />
            <div className={`h-8 px-3 rounded-full border flex items-center gap-2 ${step>=3 ? "bg-white/10 border-white/25" : "bg-white/5 border-white/10"}`}>
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${step>=3 ? "bg-purple-600 text-white" : "bg-white/10 text-white/60"}`}>3</span>
              סיכום
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center">זימון שיעור</h2>

        {/* שלב 1 – פרטים + נושאים + רמת ידע */}
        {step === 1 && (
          <div className="glass-card p-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                className={inputClass}
                placeholder="שם מלא"
                value={form.full_name}
                onChange={e=>setForm(f=>({...f, full_name:e.target.value}))}
              />
              <input
                className={inputClass}
                placeholder="אימייל"
                type="email"
                value={form.email}
                onChange={e=>setForm(f=>({...f, email:e.target.value}))}
              />
              <input
                className={inputClass}
                placeholder="טלפון (05XXXXXXXX)"
                inputMode="tel"
                value={form.phone}
                onChange={e=>setForm(f=>({...f, phone:e.target.value}))}
              />
            </div>

            {/* נושאים */}
            <div>
              <label className="block mb-2 font-semibold">נושא/ים לשיעור</label>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {SUBJECTS.map(s => {
                  const active = form.subjects.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={()=> setForm(f => {
                        const next = new Set(f.subjects);
                        active ? next.delete(s) : next.add(s);
                        return {...f, subjects: Array.from(next)};
                      })}
                      className={`${chipBase} ${active ? chipActive : chipIdle} flex items-center justify-between`}
                    >
                      <span>{s}</span>
                      {active && (
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* תגיות תמציתיות של בחירות */}
              <div className="mt-3 flex flex-wrap gap-2">
                {form.subjects.map(s => (
                  <span key={s} className="text-xs rounded-full px-2 py-1 bg-blue-500/20 text-blue-200 border border-blue-400/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* רמת ידע */}
<div>
  <label className="block mb-2 font-semibold">רמת הידע שלי בחומר</label>
  <div className="flex flex-wrap gap-2">
    {LEVELS.map(l => {
      const active = form.level===l;
      return (
        <button
          key={l}
          type="button"
          onClick={()=>setForm(f=>({...f, level: l}))}
          className={`rounded-xl border px-3 py-2 transition select-none flex items-center gap-2
            ${active
              ? "bg-purple-600/40 border-purple-400/60 ring-1 ring-purple-300/50 text-white"
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white/90"}`}
          aria-pressed={active}
        >
          {/* תג סימון כשנבחר */}
          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs
            ${active ? "bg-purple-500 text-white" : "bg-white/10 text-white/60"}`}>
            {active ? "✓" : "•"}
          </span>
          <span>{l}</span>
        </button>
      );
    })}
  </div>
</div>


            {/* שורת סטטוס / שגיאה */}
            {status.type==="error" && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/15 p-3 text-red-200 text-sm">
                {status.msg}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button className="btn" onClick={nextStep}>המשך לבחירת מועדים</button>
            </div>
          </div>
        )}

        {/* שלב 2 – בחירת מועדים (מקובצים לפי יום) + סל צדדי */}
        {step === 2 && (
  <div className="glass-card p-6 space-y-4" dir="rtl">
    {/* בחירת תאריך בראש המסך */}
   {/* בחירת תאריך יציבה */}
<div className="mb-3 space-y-2">
  <label className="block font-semibold">בחר/י תאריך</label>

  {/* או בחירת תאריך ידנית – מסונכרן עם ה־select */}
  <div className="text-sm text-white/60">
    או הזינו תאריך:
    <input
      type="date"
      className="ml-2 rounded-xl bg-white/5 border border-white/10 p-2 text-white"
      value={selectedDate || ""}
      onChange={(e)=>setSelectedDate(e.target.value)}
    />
  </div>
</div>

    <div className="grid md:grid-cols-[1fr,320px] gap-6 items-start">
      {/* רשימת השעות של התאריך הנבחר */}
      <div>
        {(!selectedDate || slotsForSelectedDay.length === 0) ? (
          <div className="text-white/70 text-sm">אין מועדים בתאריך זה. נסה/י תאריך אחר.</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {slotsForSelectedDay
              .sort((a,b)=> new Date(a.start_at)-new Date(b.start_at))
              .map(s => {
                const dt = new Date(s.start_at);
                const time = dt.toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"});
                const active = selected.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={()=>toggleSlot(s.id)}
                    className={`rounded-xl border px-3 py-2 transition select-none flex items-center justify-between
                      ${active
                        ? "bg-blue-600/35 border-blue-400/60 ring-1 ring-blue-300/50 text-white"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-white/90"}`}
                  >
                    <span>{time} · 60 ד׳</span>
                    {active && (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs">✓</span>
                    )}
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>

<aside className="bg-white/5 rounded-xl p-4 border border-white/10 sticky top-6">
  <p className="font-semibold mb-2">הסל שלי</p>

  <ul className="space-y-2 max-h-[260px] overflow-auto pr-1">
    {Array.from(selected).map(id => {
      const s = slots.find(x => x.id===id);
      if (!s) return null;
      const dt = new Date(s.start_at);
      const d = dt.toLocaleDateString("he-IL",{weekday:"short", day:"2-digit", month:"2-digit"});
      const t = dt.toLocaleTimeString("he-IL",{hour:"2-digit", minute:"2-digit"});
      return (
        <li key={id} className="flex items-center justify-between text-sm">
          <span>{d} · {t}</span>
          <button className="text-red-300" onClick={()=>toggleSlot(id)}>הסר</button>
        </li>
      );
    })}
    {!selected.size && (
      <li className="text-sm text-white/60">עוד לא נבחרו שיעורים.</li>
    )}
  </ul>

  <div className="mt-3 text-sm">סה״כ שיעורים: <b>{selected.size}</b></div>
  <div className="text-sm">מקדמה: <b>{30*selected.size} ₪</b></div>

  {/* כפתורי פעולה דביקים כחלק מהסל */}
  <div className="mt-4 flex gap-3">
    <button className="btn-secondary w-full" onClick={()=>setStep(1)}>חזרה</button>
    <button className="btn w-full" onClick={nextStep} disabled={!selected.size}>לסיכום</button>
  </div>
</aside>

  </div>
)}


        {/* שלב 3 – סיכום הזמנה לפני יצירה */}
        {step === 3 && (
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold">סיכום הזמנה</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold mb-2">פרטים</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>שם: <b className="text-white">{form.full_name}</b></li>
                  <li>אימייל: <b className="text-white">{form.email}</b></li>
                  <li>טלפון: <b className="text-white">{form.phone}</b></li>
                  <li>נושאים: <b className="text-white">{form.subjects.join(" · ")}</b></li>
                  <li>רמה: <b className="text-white">{form.level}</b></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">שיעורים שנבחרו</p>
                <ul className="space-y-2 max-h-[220px] overflow-auto pr-1">
                  {Array.from(selected).map(id => {
                    const s = slots.find(x => x.id===id);
                    if (!s) return null;
                    const dt = new Date(s.start_at);
                    const d = dt.toLocaleDateString("he-IL",{weekday:"short", day:"2-digit", month:"2-digit"});
                    const t = dt.toLocaleTimeString("he-IL",{hour:"2-digit", minute:"2-digit"});
                    return (
                      <li key={id} className="flex items-center justify-between text-sm">
                        <span>{d} · {t}</span>
                        <button className="text-red-300" onClick={()=>toggleSlot(id)}>הסר</button>
                      </li>
                    );
                  })}
                  {!selected.size && (
                    <li className="text-sm text-white/60">אין שיעורים בסל.</li>
                  )}
                </ul>
                <div className="mt-2 text-sm">סה״כ שיעורים: <b>{selected.size}</b> • מקדמה: <b>{deposit} ₪</b></div>
              </div>
            </div>

            {status.type==="error" && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/15 p-3 text-red-200 text-sm">
                {status.msg}
              </div>
            )}

            <div className="flex justify-between">
              <button className="btn-secondary" onClick={()=>setStep(2)}>חזרה לבחירה</button>
              <button className="btn" onClick={createBooking} disabled={loading}>
                {loading ? "שולח הזמנה..." : "אישור והמשך לתשלום"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
