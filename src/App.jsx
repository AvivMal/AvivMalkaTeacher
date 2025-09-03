  import React, { useState, useEffect, useRef } from "react";
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation, A11y } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import heroBackgroundImage from './pictures/47dd701a-860b-4a13-aea7-ac0ef6b68bd7.jpg';
  import ContactForm from "./components/ContactForm";
  import assessmentImage from "./pictures/personal_assesments.png";
  import materialsImage from "./pictures/Live Session2.png";
  import lessonImage from "./pictures/Tailored Materials.png";
  import trackingImage from "./pictures/Tracking & Improvement.png";
  import howSectionImg from './pictures/how section.png';
  import aboutMe from './pictures/About-me.jpg';

  const testimonials = [
    {
      quote:
        '״אביב זיהה את הקשיים ונתן פתרונות שעובדים. פעם ראשונה בחיים ניגשתי למבחן רגוע, והציון קפץ מעבר למה שציפיתי.״',
      name: 'דניאל',
      role: 'תלמיד תיכון',
      result: 'מ־68 ל־92 תוך חודש',
      stars: 5,
    },
    {
      quote:
        '״אביב הצליח להפוך לי את החומר המורכב להרבה יותר ברור ומובן, סוף סוף הרגשתי שאני בשליטה ובקצב ולא צריכה להדביק את כל החומר לפני המבחן.״',
      name: 'שירה',
      role: 'סטודנטית למערכות מידע',
      result: 'סיימה בהצטיינות קורס שנכשלה בו פעמיים',
      stars: 5,
    },
    {
      quote:
        '״הגעתי לאביב כדי להכין את עצמי לראיון עבודה באנגלית, היה לי פחד ותחושה שאני לא מצליח לדבר רצוף. תוך חודשיים עם התרגול והשיטות שקיבלתי חיזקתי את הביטחון והרמה, עברתי את הראיון והייתי גאה בתוצאה״',
      name: 'רועי כהן',
      role: 'בוגר תואר מערכות מידע',
      result: 'עבר ראיון עבודה באנגלית והתקבל למשרה בהייטק',
      stars: 5,
    },
    {
      quote:
        '״בגלל שירות מילואים לא נכחתי כמעט בכלל בשיעורי מאקרו כלכלה, בסדרה קצרה של 5 שיעורים עם אביב סגרתי את כל הפערים, ובסוף עברתי את הקורס בציון שלא דמיינתי שאפשרי במצב שלי.״',
      name: 'שחר',
      role: 'סטודנטית למנהל עסקים',
      result: 'למרות היעדרותה מהקורס, עברה בציון 90',
      stars: 5,
    },
  ];

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
  {
    question: "תוך כמה זמן רואים תוצאות?",
    answer:
      "ברוב המקרים מרגישים בהירות וביטחון כבר אחרי מספר מצומצם של מפגשים. קצב ההתקדמות תלוי בקצב האישי שלך, ברמת הפערים איתם אתה מגיע, בתרגול שלנו יחד וכמובן בתרגול העצמאי שלך. המטרה שלי היא לייצר יחד איתך תוצאות מדידות כמה שיותר מהר ומבלי לבזבז זמן."
  },
  {
    question: "איך לבחור בין שיעור בזום לשיעור פרונטלי?",
    answer:
  (<>
   <p>זום חוסך נסיעות, מאפשר שיתוף מסך והקלטה, ולכן מתאים לרוב הלומדים.</p>
      <p>פרונטלי עדיף למי שמתרכז טוב יותר בחדר לימוד פיזי.</p>
      <p>הכי מומלץ להתחיל בזום, לבדוק התאמה ולשלב פרונטלי לפי צורך.</p></>)
  },
  {
    question: "איך אדע איזו חבילה מתאימה לי?",
    answer: (<>
      <p>
        כלל אצבע לבחירת מסלול:
      </p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong>שיעור ממוקד</strong> – מתאים לחידוד או השלמה של נושא מסוים לפני מבחן.</li>
        <li><strong>מסלול התקדמות (4)</strong> – סדרה של ארבעה מפגשים לחזרה מסודרת, הכנה מקצועית ותרגול עד הבחינה.</li>
        <li><strong>מסלול הצלחה (8)</strong> – חזרה מלאה ומקיפה על כל חומר הקורס מאפס, או הכנה לשני קורסים במקביל, כולל חזרות ותרגולים ממוקדים.</li>
        <li><strong>מסלול מאסטר (שנתי)</strong> – ליווי רציף לאורך השנה, בכל הקורסים או הנושאים שתצטרך.</li>
      </ul>
      <p className="mt-3">
        בכל מקרה, נבצע שיחת היכרות קצרה כדי להתאים לך את המסלול המדויק ביותר למטרות האישיות שלך.
      </p>
    </>
    )
  },
  {
    question: "מה קורה אם עדיין לא הצלחתי במבחן או שהחומר לא מספיק ברור?",
    answer:
      "לא מוותרים. ננתח יחד את המבחן, נזהה פערים, נבנה חיזוק ממוקד ונקבע תרגול נוסף עד שהכול יושב. המטרה היא להבין כמו שצריך, לרכוש ביטחון ולהגיע לתוצאה גבוהה ללא פשרות."
  },
  {
    question: "מה כלול בין שיעור לשיעור?",
    answer:
      "בין המפגשים תקבלו גישה מלאה לספריית סיכומים ומצגות, תרגולים ומבחני דמה, הקלטות של שיעורים שכבר התקיימו, וליווי אישי בוואטסאפ לשאלות שעולות בזמן התרגול העצמי."
  },
  {
    question: "האם ניתן לבטל או להזיז שיעור לאחר שקבעתי?",
    answer:
      "התיאום גמיש ומהיר, ניתן לשנות מועד שיעור בהתראה של 24 שעות מראש. בתקופות מבחנים הביקוש גבוה במיוחד, לכן מומלץ לשריין מקומות מראש כדי להבטיח את המועד שהכי מתאים לך."
  }
];


    return (
    <div dir="rtl" className="bg-[var(--color-bg)] text-[var(--color-text)] font-assistant overflow-x-hidden">
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
                נתקעתם בחומר? המבחן מתקרב?<br /> זה הזמן ללמוד איך להגיע לציון שתמיד רציתם
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <p className="text-lg md:text-xl mb-8 text-[var(--color-text-muted)]">
                עם שיטה מותאמת אישית, ליווי צמוד וחומר ממוקד, גם לך יהיה בדיוק את מה שצריך כדי להצליח.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn pulse-glow"
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
  <section className="py-20 px-6 max-w-6xl mx-auto relative overflow-visible" dir="rtl">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-right mb-6 text-gradient-purple drop-shadow-lg">
          מרגישים אבודים לפני המבחן?
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed text-center md:text-right">
          אני יודע איך זה מרגיש לשבת מול חומר לימודי במשך שעות, להשקיע זמן וכוח ועדיין להרגיש תקוע ומתוסכל לפני מבחן.
          <br /><br />
          גם אני הייתי שם. ההבנה ששיטת הלמידה היא הבעיה, ולא היכולת שלי, שינתה לי את הכל. ברגע שפיתחתי לעצמי דרך פשוטה וברורה ללמוד – הציונים החלו לעלות, והביטחון חזר.
          <br /><br />
          זו הסיבה שאני עושה את מה שאני עושה היום: אני מאמין שאף תלמיד לא צריך לעבור את הדרך הזו לבד, כל אחד יכול להצליח ברגע שהוא לומד את השיטה שמתאימה לו,
          ואין תחושה מספקת יותר עבורי מלראות תלמיד שמצליח ומספר על ציונים שלא האמין שיוכל להגיע אליהם.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <img 
          src={howSectionImg} 
          alt="סטודנט מרוצה אחרי למידה" 
          className="rounded-2xl shadow-xl mx-auto"
        />
      </AnimatedSection>
    </div>
  </section>

  {/* HOW SECTION */}
  <section className="bg-[var(--color-bg-alt)] py-20 px-6">
    <AnimatedSection>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
        איך מתקדמים לציון גבוה - צעד אחר צעד
      </h2>
      <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[var(--color-text-muted)]">
        מסלול למידה מדויק וגמיש, מותאם אישית עבורך, שמספק תוצאות ברורות ומייצר ביטחון לפני כל מבחן.
      </p>
    </AnimatedSection>

    <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {[
        {
          img: assessmentImage, alt:'אבחון אישי',
          title:'אבחון שמתרגם בלבול לתוכנית פעולה',
          text:'כבר אחרי השיעור הראשון יש לך מפת דרך אישית: איפה הפערים, מה ללמוד ומתי. ממפים חוזקות וחולשות ובונים סדר עדיפויות ברור.'
        },
        {
          img: lessonImage, alt:'שיעור חי',
          title:'שיעור שמחבר נקודות ומייצר בהירות',
          text:'מפגש זום או פרונטלי ממוקד עם הסברים פשוטים, דוגמאות ותרגול בזמן אמת, כדי שהחומר יתיישב בראש כבר במהלך השיעור.'
        },
        {
          img: materialsImage, alt:'חומר מותאם',
          title:'סיכומים ותרגולים שמקנים שליטה מלאה',
          text:'סיכומים ממוקדים, הקלטות שיעורים וסט תרגולים שמאפשרים ללמוד בקצב שלך, להתקדם עצמאית ולבנות ביטחון בין השיעורים.'
        },
        {
          img: trackingImage, alt:'מעקב ושיפור',
          title:'ווידוא התקדמות ליעד',
          text:'בדיקות ממוקדות ומשוב קצר שומרים אותך במסלול הנכון, כך נתקדם צעד-צעד עד המטרה.'
        }
      ].map((card, i) => (
        <AnimatedSection key={i} delay={i*200}>
          <div className="glass-card-alt hover-lift p-6 text-center h-full">
            <img src={card.img} alt={card.alt} className="rounded-lg mb-4 object-cover h-40 w-full shadow-md" />
            <h3 className="font-bold text-xl mb-2 text-gradient-purple">{card.title}</h3>
            <p className="text-[var(--color-text-muted)]">{card.text}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>

    <AnimatedSection delay={800}>
  <div className="mt-12 text-center">
    <button
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      className="btn"
    >
      שריינו את השיעור הקרוב הבא
    </button>
    <div className="mt-3 text-sm text-[var(--color-text-muted)]"></div>
  </div>
</AnimatedSection>
  </section>


  {/* TESTIMONIALS */}
  <section className="py-20 px-6 max-w-6xl mx-auto" dir="rtl">
    <AnimatedSection>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gradient-gold">
        מה אומרים התלמידים?
      </h2>
    </AnimatedSection>

    <Swiper
    modules={[Navigation, A11y]}
    navigation
    spaceBetween={28}
    slidesPerView={1}
    breakpoints={{
      768:  { slidesPerView: 2, spaceBetween: 28 },
      1024: { slidesPerView: 2, spaceBetween: 32 }, // רחב ונושם יותר בדסקטופ
      1440: { slidesPerView: 3, spaceBetween: 32 }, // 3 שקופיות רק במסכים רחבים
    }}
    dir="rtl"
    className="overflow-visible"   // שומר על האייקון והחיצים גלויים
  >
    {testimonials.map((t, i) => (
      <SwiperSlide key={i} className="flex">
        <AnimatedSection delay={i * 150} className="flex-1">
          <div className="flex w-full">
            <blockquote
              className="relative glass-card p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                        card-strong-border flex flex-col justify-between w-full min-h-[360px]  // גובה אחיד
                        md:min-h-[400px]"
            >
              {/* אייקון ציטוט – ממוקם בלי חיתוך */}
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                              h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600
                              text-white grid place-items-center shadow-lg z-20">
                <span className="text-2xl leading-none">“</span>
              </div>

              {/* טקסט */}
              <p className="italic text-lg leading-relaxed mb-4">{t.quote}</p>

              {/* רצועת תוצאה + פוטר */}
              <div className="mt-auto">
                {t.result && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                                  bg-[color-mix(in_oklab,var(--color-primary),#000_85%)]/10
                                  text-[var(--color-primary)] font-semibold text-sm">
                    🎯 {t.result}
                  </div>
                )}
                <footer className="mt-4 flex items-center justify-between">
                  <div className="font-semibold text-[var(--color-text-muted)]">
                    {t.name} · <span className="font-normal">{t.role}</span>
                  </div>
                  <div aria-label={`${t.stars} כוכבים`} className="text-yellow-400">
                    {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
                  </div>
                </footer>
              </div>
            </blockquote>
          </div>
        </AnimatedSection>
      </SwiperSlide>
    ))}
  </Swiper>

    {/* מיני-CTA מתחת לקרוסלה */}
    <AnimatedSection delay={600}>
      <div className="text-center mt-12">
       <button className="btn">
        בדיקת זמינות לשיעור עכשיו 
      </button>
        <div className="mt-3 text-sm text-[var(--color-text-muted)]">
          ⭐️ מעל 50 תלמידים מרוצים
        </div>
      </div>
    </AnimatedSection>
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
             <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn">
                  רוצה להיות סיפור ההצלחה הבא? קבע שיעור עכשיו!
                </button>
            </AnimatedSection>
          </div>
        </section>

      {/* WHO IS IT FOR? */}
  <section className="py-20 px-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40" dir="rtl">
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <div className="glass-card p-8 md:p-10 premium-border">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            זה מתאים במיוחד ל…
          </h2>

          {/* רשימת bullets רספונסיבית */}
          <ul className="grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              'סטודנטים במערכות מידע או מנהל עסקים',
              'סטודנטים במכינה קדם־אקדמית באנגלית או מתמטיקה',
              'תלמידי תיכון שרוצים ציון גבוה בבגרויות באנגלית או מתמטיקה',
              'מי שצריך ביטחון לקראת מצגת או ראיון באנגלית',
              'תלמידים שרוצים ללמוד שיטות למידה יעילות להצלחה',
              'מי שזקוק לסגירת פערים מהירה (מילואים, היעדרויות וכו׳)',
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <li className="flex items-start gap-3 bg-white/5 hover:bg-white/7 transition rounded-xl p-4">
                  {/* אייקון צ׳ק מעוגל */}
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full
                              bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm shrink-0 mt-0.5 shadow-md">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              </AnimatedSection>
            ))}
          </ul>

          {/* מיני־CTA אופציונלי מתחת לרשימה */}
          <div className="text-center mt-10">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn">
            בדיקת זמינות לשיעור עכשיו
          </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>

  {/* WHAT I OFFER */}
  <section className="py-20 px-6" dir="rtl">
    <AnimatedSection>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gradient-cyan">מה אני מציע?</h2>
      <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-[var(--color-text-muted)]">
        מסלול למידה ממוקד תוצאות באמצעות שיעורים פרטיים אחד על אחד או בקבוצה קטנה, בזום או פרונטלי, עם גישה לחומרים שיחסכו זמן ויעלו את הביטחון לפני כל מבחן.
      </p>
    </AnimatedSection>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {[
        {
          id: 1,
          ribbon: '',
          label: '',
          labelColor: '',
          title: 'שיעור ממוקד',
          subtitle: 'מפגש חד־פעמי לדיוק והבהרה',
          color: 'from-purple-600 to-purple-500',
          bullets: [
            '60 דקות של שיעור ממוקד',
            'הקלטת השיעור לצפייה חוזרת',
          ],
          cta: 'בדיקת זמינות לשיעור ממוקד',
        },
        {
          id: 2,
          ribbon: 'מומלץ',
          label: 'מיקוד למבחן',
          labelColor: 'bg-blue-500/90 text-white',
          title: 'מסלול התקדמות (4)',
          subtitle: 'ארבעה שיעורים לבניית שליטה וביטחון',
          color: 'from-blue-600 to-blue-500',
          bullets: [
            '4×60 דקות - תוכנית קצב אישית',
            'גישה לספריית סיכומים',
            'תרגולים ומבחני דמה בין שיעורים',
            'ליווי ומשוב קצר בין המפגשים',
          ],
          cta: 'בדיקת זמינות למסלול התקדמות',
        },
        {
          id: 3,
          ribbon: 'הכי משתלם',
          label: 'מיקוד למבחן',
          labelColor: 'bg-blue-500/90 text-white',
          title: 'מסלול הצלחה (8)',
          subtitle: 'שמונה שיעורים להבטחת הצלחה וציונים מרשימים',
          color: 'from-orange-500 to-amber-400',
          bullets: [
            '8×60 דקות - שיטה מלאה וצעד־צעד',
            'עד שני קורסים במסלול אחד',
            'ספריית סיכומים + מצגות + שיעורים מוקלטים',
            'סט תרגול מתקדם ומבחני דמה',
            'ליווי רציף בוואטסאפ עד ליום הבחינה',
          ],
          cta: 'בדיקת זמינות למסלול הצלחה',
        },
        {
          id: 4,
          ribbon: 'פרימיום',
          label: 'ליווי קבוע',
          labelColor: 'bg-emerald-500/90 text-white',
          title: 'מסלול מאסטר (שנתי)',
          subtitle: 'ליווי מלא - 4 שיעורים בחודש',
          color: 'from-emerald-500 to-teal-500',
          bullets: [
            '4×60 דקות בכל חודש ובקצב עקבי כל השנה',
            ' כל הקורסים כלולים - ללא הגבלה',
            'גישה מלאה לספרייה: סיכומים, מצגות והקלטות',
            'תרגול מתמשך + מבחני דמה לאורך השנה',
            'ליווי שוטף בוואטסאפ',
          ],
          cta: 'בדיקת זמינות למסלול השנתי',
        },
      ].map((card, i) => (
        <AnimatedSection key={card.id} delay={i * 200}>
          <div className="relative glass-card p-8 text-right premium-border h-full flex flex-col">
            {/* מספר כרטיס */}
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold bg-gradient-to-br ${card.color}`}>
              {card.id}
            </div>

            {/* ריבון + לייבל באותה פינה */}
            {(card.ribbon || card.label) && (
              <div className="absolute -top-4 right-4 flex flex-col gap-1 items-end">
                {card.ribbon && (
                  <div className="bg-yellow-300/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                    {card.ribbon}
                  </div>
                )}
                {card.label && (
                  <div className={`${card.labelColor} text-xs font-semibold px-3 py-1 rounded-full shadow`}>
                    {card.label}
                  </div>
                )}
              </div>
            )}

          <h3 className="font-bold text-2xl mt-4 mb-4 text-center">{card.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">
            {card.subtitle}
            </p>
            <ul className="space-y-2 mb-6">
              {card.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">✓</span>
                  <span className="text-[var(--color-text)]/90">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn w-full"
              >
                {card.cta}
              </button>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>

    <AnimatedSection delay={650}>
      <div className="text-center mt-6 text-sm text-[var(--color-text-muted)]">
        מספר המקומות למסלולים מוגבל בכל חודש כדי לשמור על ליווי אישי וצמוד.
      </div>
    </AnimatedSection>
  </section>
  {/* ABOUT */}
<section id="about" className="py-20 px-6" dir="rtl">
  <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 items-center">
    
    {/* טקסט */}
    <div className="md:col-span-7">
      <div className="glass-card p-8 md:p-10 premium-border">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-right mb-4 text-gradient-purple">
          קצת עליי
        </h2>

        <p className="text-lg md:text-xl font-semibold text-center md:text-right text-[var(--color-text)]/90 mb-4">
          היי, אני <span className="text-gradient-gold">אביב מלכה</span>, מרצה־מתגבר במכללה וסטודנט למערכות מידע. <br/>
          המטרה שלי? לעזור לכל תלמיד להפוך בלבול - לביטחון והצלחה אמיתית בציונים.
        </p>

        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-5 text-center md:text-right">
          פעם גם אני הייתי מתוסכל מהלימודים; יוצא מריכוז, מתקשה להבין חומר ומרגיש שזה גדול עליי. בשלב מסוים הבנתי שהבעיה היא לא בי, אלא בדרך שבה אני ניגש לחומר. פיתחתי שיטה ברורה וממוקדת שהחזירה לי את הביטחון והביאה להצלחות. היום אני מלמד תלמידים וסטודנטים את אותה שיטה, כי אני מאמין שאין דבר כזה "קשה מדי" – עם גישה נכונה ושיטה נכונה, כל אחד יכול להצליח.        </p>
        {/* ערך מוסף */}
        <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-[var(--color-text)]/90">
          <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">✓</span> התאמה אישית מלאה וקצב שמתאים לך</li>
          <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">✓</span> ספרייה ייעודית: סיכומים, מצגות, שיעורים מוקלטים</li>
          <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">✓</span> תרגול ממוקד + מבחני דמה עד ליום הבחינה</li>
          <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">✓</span> ליווי זמין ושקוף – גם בין שיעורים</li>
        </ul>

{/* באדג'ים קטנים לבניית אמון */}
<div className="flex flex-wrap gap-2 mb-6">
  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">מרצה־מתגבר</span>
  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">מערכות מידע</span>
  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">מנהל עסקים</span>
  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">בגרויות מתמטיקה ואנגלית</span>
  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">100% התאמה אישית</span>
  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">+50 תלמידים מרוצים</span>
</div>


        {/* שורה אישית + חזון */}
       <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 text-center md:text-right">
  אוהב התפתחות אישית (וקפה ☕) ומאמין שבכל אחד מסתתר הרבה יותר ממה שהוא מדמיין. 
  החזון שלי: להביא שיטות למידה עדכניות לעידן ה־AI ולתת לכל תלמיד את הכלים להצטיין.
</p>

        <div className="text-center md:text-right">
          <button
            className="btn"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            בואו נבדוק זמינות לשיעור ראשון
          </button>
        </div>
      </div>
    </div>

    {/* תמונה */}
    <div className="md:col-span-5">
      <div className="relative mx-auto w-[min(420px,90vw)]">
        <img
          src={aboutMe}
          alt="אביב מלכה"
          className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl ring-1 ring-white/10"
        />
        {/* הילה עדינה */}
        <div className="pointer-events-none absolute -z-10 -inset-4 rounded-[2rem] blur-3xl opacity-30 bg-gradient-to-br from-purple-600/40 to-blue-600/40"></div>
      </div>
    </div>
  </div>
</section>

{/* FAQ SECTION */}
<section className="py-20 px-6">
  <AnimatedSection>
    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gradient-purple">
      שאלות נפוצות
    </h2>
    <p className="text-center text-[var(--color-text-muted)] mb-10">
      קיצרנו את המידע כדי לעזור לך להחליט מהר ובביטחון.
    </p>
  </AnimatedSection>

  <div className="max-w-5xl mx-auto space-y-4">
    {faqs.map((faq, index) => {
      const open = openFAQ === index;
      return (
        <AnimatedSection key={index} delay={index * 80}>
          <div
            className={`faq-item glass-card-alt premium-border p-5 md:p-6 transition-all duration-300
              ${open ? "bg-white/[.035] border-white/25" : "hover:bg-white/[.02]"}
            `}
          >
            {/* כותרת האקורדיון */}
            <button
              className="w-full flex items-center justify-between text-right"
              onClick={() => toggleFAQ(index)}
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
            >
              <div className="flex items-center gap-3">
                {/* Chip עדין במקום גרדיאנט בוהק */}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full 
                                 border border-white/15 text-[var(--color-text-muted)] text-sm bg-white/5">
                  ?
                </span>
                <h3 className="font-bold text-lg md:text-xl text-[var(--color-text)]">
                  {faq.question}
                </h3>
              </div>

              <svg
                className={`w-6 h-6 transition-transform duration-300 ${open ? "rotate-180" : ""} text-[var(--color-text-muted)]`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* הגוף */}
            <div
              id={`faq-panel-${index}`}
              className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                {/* אם answer הוא מחרוזת */}
                {typeof faq.answer === "string" ? (
                  <p className="leading-relaxed text-[var(--color-text-muted)]">{faq.answer}</p>
                ) : (
                  /* ואם הוא JSX (כמו ה־<p>…</p> + <ul>…</ul>) */
                  <div className="prose prose-invert prose-sm max-w-none text-[var(--color-text-muted)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      );
    })}
  </div>

  {/* CTA קצר בסוף ה-FAQ */}
  <AnimatedSection delay={480}>
    <div className="text-center mt-10">
      <button
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        className="btn"
      >
        עדיין מתלבטים? דברו איתי ונבחר יחד את המסלול המתאים
      </button>
    </div>
  </AnimatedSection>
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
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn pulse-glow"
            >
              שריין שיעור היכרות
            </button>
            </div>
          </AnimatedSection>
        </section>

        <footer className="py-6 text-center text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} אביב מלכה – כל הזכויות שמורות.
        </footer>
      </div>
    );
  }
