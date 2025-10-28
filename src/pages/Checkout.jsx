export default function Checkout() {
  const params = new URLSearchParams(window.location.search);
  const amount = Number(params.get("amount") || "0");
  const bookingId = params.get("booking_id");

  function pay() {
    // כרגע מדומה: מעביר ל-success. בהמשך יוחלף ב-Grow (iframe/redirect).
    window.location.href = `/aviv_teacher/success?booking_id=${bookingId}&amount=${amount}`;
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-xl mx-auto glass-card p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">תשלום מקדמה</h2>
        <p className="text-center">סכום לתשלום: <b>{amount} ₪</b></p>
        <p className="text-[var(--color-text-muted)] text-center">(דף מדומה עד חיבור Grow)</p>
        <button className="btn w-full mt-4" onClick={pay}>לתשלום</button>
      </div>
    </section>
  );
}
