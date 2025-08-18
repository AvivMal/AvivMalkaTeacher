import React, { useState, useEffect, useRef } from "react";
import heroBackgroundImage from './pictures/47dd701a-860b-4a13-aea7-ac0ef6b68bd7.jpg';
import ContactForm from "./components/ContactForm";
import assessmentImage from "./pictures/personal_assesments.png";
import materialsImage from "./pictures/Live Session2.png";
import lessonImage from "./pictures/Tailored Materials.png";
import trackingImage from "./pictures/Tracking & Improvement.png";

// Component for animating numbers on scroll
const NumberCounter = ({ endValue, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

  if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = endValue;
      const incrementTime = (duration / end);
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [endValue, duration, isVisible]);

  return (
    <p ref={ref} className="text-3xl font-bold text-gradient-gold">
      {count}{suffix}
    </p>
  );
};

// Component for animating sections on scroll
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const animationClasses = `transition-all duration-1000 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={animationClasses}>
      {children}
    </div>
  );
};

export default function TutoringLandingPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  const faqs = [
    { question: "מתי רואים תוצאות?", answer: "רוב התלמידים מדווחים על שיפור בהבנה ובביטחון כבר לאחר מספר שיעורים בודדים. התוצאות הסופיות תלויות בהתמדה אישית, אך אנחנו שואפים לשיפור מהיר ומשמעותי." },
    { question: "איך לבחור בין זום לפרונטלי?", answer: "שיעורי הזום מציעים גמישות מרבית ונוחות, ללא צורך לצאת מהבית. שיעורים פרונטליים מתאימים למי שמחפש מגע למימוד ממוקד. נשמח לייעץ לך במה הכי מתאים עבורך!" },
    { question: "האם יש שיעור ניסיון?", answer: "כן, השיעור הראשון הוא שיעור היכרות, שבו נכיר, נאבחן את הצרכים שלך ונבנה יחד תוכנית. זהו שיעור מצוין להרגיש את השיטה ולהחליט אם היא מתאימה לך." },
    { question: "מה קורה אם שיעור לא מוצלח?", answer: "נציין שזה קורה לעיתים רחוקות, אבל שביעות הרצון שלך חשובה לי מכל. אם אינך מרוצה משיעור מסוים, נדאג למצוא פתרון מתאים, כולל אפשרות לשיעור חלופי או זיכוי." },
  ];

  return (
   <div dir="rtl" className="bg-[var(--color-bg)] text-[var(--color-text)] font-assistant overflow-hidden">
      {/* --- GLOBAL BACKGROUND FX (blurred purple/blue orbs) --- */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-purple-700/40 to-blue-600/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-blue-500/30 via-cyan-400/20 to-purple-600/30 blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center text-[var(--color-text)] py-24 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10,10,15,0.6), rgba(10,10,15,0.7)), url(${heroBackgroundImage})`,
        }}
      >
        {/* decorative grid/particles overlay */}
        <div className="absolute inset-0 pattern-grid opacity-30" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(600px circle at 70% 20%, rgba(124,58,237,0.10), transparent 60%)'
        }} />

        <div className="relative z-10 max-w-4xl mx-auto glass-card p-8 shadow-2xl premium-border">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight gradient-text">
              מפסיקים להילחץ לפני מבחנים <br /> ומתחילים להרגיש בטוחים בחומר
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl mb-8 text-[var(--color-text-muted)]">
              עם שיטה אישית, ליווי צמוד וחומר מותאם, גם לך יהיה בדיוק את מה שצריך כדי להצליח.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="pulse-glow"
            >
              השיגו תוצאות. קבעו שיעור כעת
            </button>
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <div className="mt-8 text-sm md:text-base text-[var(--color-text-muted)] flex flex-wrap justify-center gap-x-4 gap-y-2">
              <span className="flex items-center"><span className="text-yellow-400">⭐⭐⭐⭐⭐</span> 50+ תלמידים מרוצים</span>
              <span>| 2 שנות ניסיון בהוראה</span>
              <span>| 100% התאמה אישית לכל תלמיד</span>
              <span>| זמינות גם בזום</span>
            </div>
          </AnimatedSection>
        </div>

        {/* WhatsApp */}
        <a
          href="https://wa.me/972528794257?text=שלום%20אביב,%20אני%20מעוניין%20לקבל%20פרטים%20על%20השיעורים%20שלך"
          target="_blank" rel="noopener noreferrer"
          className="absolute bottom-6 right-6 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transform transition duration-300"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
        </a>
      </section>

      {/* WHY SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gradient-purple drop-shadow-lg">מרגישים אבודים לפני המבחן?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[var(--color-text-muted)]">
            לא מספיקים את כל החומר בזמן? לומדים שעות ועדין מרגישים שזה לא נכנס?<br />
            הבעיה לא בכם, הבעיה היא שעד עכשיו פשוט לא למדתם נכון. <br />
            אני מאמין שכל תלמיד יכול להצליח כשלומדים אותו בצורה הנכונה והמתאימה עבורו. <br />
            בשנים האחרונות עזרתי לתלמידים לעבור מבחן ביטחון אל תחושת שליטה מלאה והצלחה אמיתית במבחנים.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[{
            icon:'⏱️', title:'לא מבזבזים זמן', text:'שיעורים ממוקדים בנושאים הדרושים בלבד, במטרה להשלים פערים בזמן קצר ולהגיע מוכנים למבחן.'
          },{
            icon:'🧠', title:'החומר לא יושב כמו שצריך?', text:'החומר בשיעורים הרגילים לא תמיד ברור? נפשט יחד נושאים מורכבים ונהפוך אותם לנגישים.'
          },{
            icon:'📈', title:'נמאס מציונים נמוכים?', text:'הגיע הזמן לעבור מציונים להצטיינות – עם אסטרטגיה אישית שתשדרג את הביצועים ותביא תוצאות.'
          }].map((c, i) => (
            <AnimatedSection key={i} delay={i*200}>
              <div className="glass-card interactive-card p-6 text-center">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-bold text-xl mb-2">{c.title}</h3>
                <p className="text-[var(--color-text-muted)]">{c.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* HOW SECTION */}
      <section className="bg-[var(--color-bg-alt)] py-20 px-6">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">איך אנחנו עושים את זה?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[var(--color-text-muted)]">
            השיטה משלבת מבנה למידה ברור, אווירה תומכת, ותוכן לימודי מותאמים אישית כדי להבטיח הבנה מלאה של החומר,
            <br />
            ביטחון עצמי גבוה, ויכולת ליישם כל מה שנלמד בפועל. הנה איך זה קורה בפועל:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[{
            img: assessmentImage, alt:'אבחון אישי', title:'אבחון אישי', text:'נתחיל בזיהוי נקודות החוזק והחולשה, ונבנה תוכנית מותאמת אישית כדי לבנות תוכנית לשיפור מדורג ובטוח.'
          },{
            img: materialsImage, alt:'חומר מותאם', title:'שיעור חי', text:'מפגש ממוקד ומהנה, בזום או פרונטלי, המשלב הסברים ברורים, דוגמאות ותרגול מעשי בזמן אמת.'
          },{
            img: lessonImage, alt:'שיעור חי', title:'חומר מותאם', text:'סיכומים, הקלטות ותרגולים ממוקדים, מותאמים אישית לקצב ולצרכים, להמשך תרגול ולמידה עצמאית.'
          },{
            img: trackingImage, alt:'מעקב ושיפור', title:'מעקב ושיפור', text:'בחינת ההתקדמות במבחני דמה ומשוב קבוע, עם התאמות מתמשכות עד להשגת המטרה.'
          }].map((card, i) => (
            <AnimatedSection key={i} delay={i*200}>
              <div className="glass-card-alt hover-lift p-6 text-center">
                <img src={card.img} alt={card.alt} className="rounded-lg mb-4 object-cover h-40 w-full shadow-md" />
                <h3 className="font-bold text-xl mb-2 text-gradient-purple">{card.title}</h3>
                <p className="text-[var(--color-text-muted)]">{card.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gradient-gold">מה אומרים התלמידים?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[var(--color-text-muted)]">
            סיפורי ההצלחה האמיתיים של תלמידים וסטודנטים שהפכו את האתגרים להישגים ומימשו את הפוטנציאל שלהם:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[{
            text: '"אביב ידע לזהות את הקשיים ולתת פתרונות אמיתיים שעבדו. הציונים השתפרו משמעותית וניגשתי למבחן עם ביטחון מלא."', who: 'דניאל, תלמיד תיכון'
          },{
            text: '"השיעורים נתנו לי שיטות עבודה וכלים פרקטיים. החומר המורכב הפך לברור והביטחון שלי גדל בצורה משמעותית."', who: 'שירה, סטודנטית למערכות מידע'
          },{
            text: '"התאמה אישית מלאה וקצב נכון. סוף סוף הבנתי את מה שהיה נראה בלתי אפשרי."', who: 'רועי כהן, סטודנט למערכות מידע ניהוליות'
          }].map((t, i) => (
            <AnimatedSection key={i} delay={i*200}>
              <blockquote className="glass-card p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full border border-[var(--color-border)]">
                <p className="italic text-lg">{t.text}</p>
                <footer className="mt-4 font-semibold text-[var(--color-text-muted)] text-left">{t.who}</footer>
              </blockquote>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* NUMBERS + CTA */}
      <section className="relative bg-gradient-to-r from-purple-800/60 to-blue-900/60 text-white py-20 px-6">
        <div className="absolute inset-0 backdrop-blur-2xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection delay={0}>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-12">המספרים מדברים בעד עצמם</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <AnimatedSection delay={100}><div className="glass-card p-6"><NumberCounter endValue={500} suffix="+" /><p className="text-lg mt-2">שיעורים שהתקיימו</p></div></AnimatedSection>
            <AnimatedSection delay={200}><div className="glass-card p-6"><NumberCounter endValue={2} /><p className="text-lg mt-2">שנות ניסיון בהוראה</p></div></AnimatedSection>
            <AnimatedSection delay={300}><div className="glass-card p-6"><NumberCounter endValue={9} suffix="+" /><p className="text-lg mt-2">קורסים נלמדים באקדמיה</p></div></AnimatedSection>
            <AnimatedSection delay={400}><div className="glass-card p-6"><NumberCounter endValue={50} suffix="+" /><p className="text-lg mt-2">תלמידים מרוצים</p></div></AnimatedSection>
          </div>
          <AnimatedSection delay={500}>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>רוצה להיות סיפור ההצלחה הבא? קבע שיעור עכשיו!</button>
          </AnimatedSection>
        </div>
      </section>

      {/* WHAT I OFFER */}
      <section className="py-20 px-6">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gradient-cyan">מה אני מציע?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[var(--color-text-muted)]">
            אני מציע שיעורים פרטיים אחד על אחד או בקבוצות קטנות, בזום או פרונטלי, באורך 60 דקות, עם אפשרות לחבילות מוזלות:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { id:1, title:'שיעור חד-פעמי', price:'בזום: 150₪ | פרונטלי: 200₪', desc:'מושלם להפחתת ראשוניות או לחיזוק נקודתי.', color:'from-purple-600 to-purple-500'},
            { id:2, title:'חבילת 4 שיעורים', price:'הנחה 10%', desc:'פתרון מעולה למי שרוצה להתקדם בקצב יציב.', color:'from-blue-600 to-blue-500'},
            { id:3, title:'חבילת 8 שיעורים', price:'הכי משתלם! הנחה 15%', desc:'המסלול המומלץ להצלחה ארוכת טווח ושיפור משמעותי.', color:'from-orange-500 to-amber-400'},
          ].map((card, i) => (
            <AnimatedSection key={card.id} delay={i*200}>
              <div className="relative glass-card p-8 text-center premium-border">
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold bg-gradient-to-br ${card.color}`}>{card.id}</div>
                <h3 className="font-bold text-2xl mt-4 mb-4">{card.title}</h3>
                <p className="text-lg mb-6">{card.price.includes('הכי משתלם!') ? <><span className="bg-yellow-200/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-bold ml-2">הכי משתלם!</span> {card.price.replace('הכי משתלם! ', '')}</> : card.price}</p>
                <p className="text-[var(--color-text-muted)] mb-6">{card.desc}</p>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>בחר חבילה</button>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={650}>
          <div className="text-center mt-12">
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>בדוק זמינות והתחל בשיעור היכרות</button>
          </div>
        </AnimatedSection>
      </section>

      {/* WHO IS IT FOR? */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">למי זה מתאים?</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[{
            title:'סטודנטים', img:'https://placehold.co/400x300/505050/FFFFFF?text=סטודנטים', text:'אם אתם לומדים מערכות מידע, מנהל עסקים או מקצועות דומים ורוצים לא רק ללמוד, אלא גם להצטיין בחשיבה – השיטה שלי תפורה עבורכם.'
          },{
            title:'תלמידי תיכון', img:'https://placehold.co/400x300/505050/FFFFFF?text=תלמידי+תיכון', text:'לתלמידי כיתות י\'-י"ב המעוניינים בהבנה יסודית וממוקדת לבגרויות במתמטיקה ואנגלית, כדי להגיע לציון האקדמי שלי להצלחה.'
          }].map((c, i) => (
            <AnimatedSection key={i} delay={i*200}>
              <div className="glass-card hover-lift p-8 text-center">
                <img src={c.img} alt={c.title} className="w-full h-64 object-cover rounded-lg mb-6" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/505050/FFFFFF?text=תמונה+חסרה'; }} />
                <h3 className="font-bold text-2xl mb-2">{c.title}</h3>
                <p className="text-[var(--color-text-muted)]">{c.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">שאלות נפוצות</h2>
        </AnimatedSection>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="glass-card p-6 cursor-pointer interactive-card">
                <div className="flex justify-between items-center" onClick={() => toggleFAQ(index)}>
                  <h3 className="font-bold text-xl flex items-center">
                    <span className="rounded-full h-7 w-7 flex items-center justify-center text-sm ml-3 bg-white/10">ℹ️</span>
                    {faq.question}
                  </h3>
                  <svg className={`w-6 h-6 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                {openFAQ === index && (
                  <p className="mt-4 leading-relaxed text-[var(--color-text-muted)] animate-fade-in-up">{faq.answer}</p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <ContactForm />

      {/* FINAL CTA */}
      <section className="relative bg-gradient-to-r from-purple-800 to-blue-900 text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">בואו נתחיל את הצעד הראשון להצלחה שלך</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-[var(--color-text-muted)]">אני מאמין שכל אחד יכול להצטיין כשיש לו את התמיכה, הכלים וההכוונה הנכונה. השיעור הראשון שלך מחכה – זו ההזדמנות שלך להתחיל!</p>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="https://wa.me/972528794257?text=שלום%20אביב,%20אני%20מעוניין%20לקבל%20פרטים%20על%20השיעורים%20שלך" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#25D366] text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 mr-2" />
              אפשר לדבר איתי ב- WhatsApp
            </a>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="pulse-glow">שריין שיעור היכרות</button>
          </div>
        </AnimatedSection>
      </section>

      <footer className="py-6 text-center text-sm text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} אביב מלכה – כל הזכויות שמורות.
      </footer>
    </div>
  );
}
