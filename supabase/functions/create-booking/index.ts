// supabase/functions/create-booking/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Payload = {
  full_name: string;
  email: string;
  phone: string;          // בפורמט ישראלי 05XXXXXXXX (ננרמל)
  slot_ids: string[];     // מערך UUID של public.slots.id
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return json({}, 204);
  if (req.method !== "POST") return json({ ok: false, error: "Method Not Allowed" }, 405);

  let body: Payload | null = null;
  try { body = await req.json(); } catch { /* ignore */ }

  if (
    !body ||
    !body.full_name?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim() ||
    !Array.isArray(body.slot_ids) ||
    body.slot_ids.length === 0
  ) {
    return json({ ok: false, error: "invalid payload" }, 400);
  }

  // URL מוזרק אוטומטית ע"י Supabase; מוסיפים fallback ליתר ביטחון
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "https://psppryrkyxxhmtcpbone.supabase.co";
  // השם החדש והמותאם לסוד ב-CLI (אין להשתמש בקידומת SUPABASE_)
  const SERVICE_KEY  = Deno.env.get("SERVICE_ROLE_KEY");
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return json({ ok: false, error: "missing service env" }, 500);
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY);

  // 1) אימות בסיסי + נרמול
  const full_name = body.full_name.trim();
  const email = body.email.trim().toLowerCase();
  const phone = body.phone.replace(/[^\d+]/g, "");

  // 2) ודא שהמשבצות עדיין פעילות ולא תפוסות
  const { data: openSlots, error: checkErr } = await sb
    .from("slots")
    .select("id")
    .in("id", body.slot_ids)
    .eq("is_active", true)
    .eq("is_booked", false);

  if (checkErr) return json({ ok: false, error: checkErr.message }, 400);
  if (!openSlots || openSlots.length !== body.slot_ids.length) {
    return json({ ok: false, error: "one or more slots are not available" }, 409);
  }

  // 3) נעילה אטומית: עדכן רק משבצות שעדיין לא תפוסות והחזר כמה עודכנו
  const { data: lockedRows, error: lockErr } = await sb
    .from("slots")
    .update({ is_booked: true })
    .in("id", body.slot_ids)
    .eq("is_booked", false)
    .select("id"); // מחזיר את השורות שננעלו בפועל

  if (lockErr) return json({ ok: false, error: lockErr.message }, 400);
  if (!lockedRows || lockedRows.length !== body.slot_ids.length) {
    // מישהו הקדים אותנו על חלק מהמשבצות -> שחרור מנעולים חלקיים (אם ננעלו)
    if (lockedRows && lockedRows.length > 0) {
      await sb.from("slots").update({ is_booked: false }).in("id", lockedRows.map(r => r.id));
    }
    return json({ ok: false, error: "slots just got booked by someone else" }, 409);
  }

  // 4) צור הזמנה (pending)
  const deposit = 40 * body.slot_ids.length;
  const { data: booking, error: bookingErr } = await sb
    .from("bookings")
    .insert({
      full_name,
      email,
      phone,
      deposit_ils: deposit,
      status: "pending",
    })
    .select("id")
    .single();

  if (bookingErr || !booking) {
    // אם יצירת הזמנה נכשלה, שחרר מנעולים
    await sb.from("slots").update({ is_booked: false }).in("id", body.slot_ids);
    return json({ ok: false, error: bookingErr?.message || "booking insert failed" }, 400);
  }

  // 5) קשר הזמנה ↔ משבצות
  const linkRows = body.slot_ids.map(slot_id => ({ booking_id: booking.id, slot_id }));
  const { error: linkErr } = await sb.from("booking_slots").insert(linkRows);
  if (linkErr) {
    // אם נכשל הקישור, שחרר מנעולים ועדכן סטטוס
    await sb.from("slots").update({ is_booked: false }).in("id", body.slot_ids);
    await sb.from("bookings").update({ status: "canceled" }).eq("id", booking.id);
    return json({ ok: false, error: linkErr.message }, 400);
  }

  // 6) החזרת payment_url מדומה (עד Grow)
  const payment_url = `https://www.learnin-go.com/aviv_teacher/checkout?booking_id=${booking.id}&amount=${deposit}`;

  return json({ ok: true, booking_id: booking.id, payment_url }, 200);
});
