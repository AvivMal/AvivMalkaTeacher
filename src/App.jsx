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
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = endValue;
      const incrementTime = (duration / end);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [endValue, duration, isVisible]);

  return (
    <p ref={ref} className="text-3xl font-bold text-[#F49F0A]">
      {count}
      {suffix}
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
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
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
  const [openFAQ, setOpenFAQ] = useState(null); // State to manage open FAQ item

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "מתי רואים תוצאות?",
      answer:
        "רוב התלמידים מדווחים על שיפור בהבנה ובביטחון כבר לאחר מספר שיעורים בודדים. התוצאות הסופיות תלויות בהתמדה אישית, אך אנחנו שואפים לשיפור מהיר ומשמעותי.",
    },
    {
      question: "איך לבחור בין זום לפרונטלי?",
      answer:
        "שיעורי הזום מציעים גמישות מרבית ונוחות, ללא צורך לצאת מהבית. שיעורים פרונטליים מתאימים למי שמחפש מגע למימוד ממוקד. נשמח לייעץ לך במה הכי מתאים עבורך!",
    },
    {
      question: "האם יש שיעור ניסיון?",
      answer:
        "כן, השיעור הראשון הוא שיעור היכרות, שבו נכיר, נאבחן את הצרכים שלך ונבנה יחד תוכנית. זהו שיעור מצוין להרגיש את השיטה ולהחליט אם היא מתאימה לך.",
    },
    {
      question: "מה קורה אם שיעור לא מוצלח?",
      answer:
        "נציין שזה קורה לעיתים רחוקות, אבל שביעות הרצון שלך חשובה לי מכל. אם אינך מרוצה משיעור מסוים, נדאג למצוא פתרון מתאים, כולל אפשרות לשיעור חלופי או זיכוי.",
    },
  ];

 return (
    <div dir="rtl" className="bg-white text-gray-900 font-[Heebo] overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center text-white py-24 px-6 text-center overflow-hidden"
        style={{
          // השתמש במשתנה שייבאת
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${heroBackgroundImage})`,
        }}
      >
        <div className="relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              מפסיקים להילחץ לפני מבחנים <br /> ומתחילים להרגיש בטוחים בחומר
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow">
              עם שיטה אישית, ליווי צמוד וחומר מותאם, גם לך יהיה בדיוק את מה שצריך כדי להצליח.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#F49F0A] text-[#0D1B2A] font-bold px-10 py-4 rounded-xl shadow-xl hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              השיגו תוצאות. קבעו שיעור כעת
            </button>
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <div className="mt-8 text-sm md:text-base opacity-90 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl mx-auto">
              <span className="flex items-center">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span> 50+ תלמידים מרוצים
              </span>
              <span>| 2 שנות ניסיון בהוראה</span>
              <span>| 100% התאמה אישית לכל תלמיד</span>
              <span>| זמינות גם בזום</span>
            </div>
          </AnimatedSection>
        </div>
              <a
        href="https://wa.me/972528794257?text=שלום%20אביב,%20אני%20מעוניין%20לקבל%20פרטים%20על%20השיעורים%20שלך"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 right-6 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transform transition duration-300"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-8 h-8"
        />
      </a>
      </section>

      {/* WHY SECTION - מרגישים אבודים לפני המבחן? */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-gray-900">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
            מרגישים אבודים לפני המבחן?
          </h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12">
            לא מספיקים את כל החומר בזמן? לומדים שעות ועדין מרגישים שזה לא נכנס?<br />
            הבעיה לא בכם, הבעיה היא שעד עכשיו פשוט לא למדתם נכון. <br />
            אני מאמין שכל תלמיד יכול להצליח כשלומדים אותו בצורה הנכונה והמתאימה עבורו. <br />
            בשנים האחרונות עזרתי לתלמידים לעבור מבחן ביטחון אל תחושת שליטה מלאה והצלחה אמיתית במבחנים.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection delay={0}>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4 text-[#0D1B2A]">⏱️</div> {/* Time icon */}
              <h3 className="font-bold text-xl mb-2">לא מבזבזים זמן</h3>
              <p className="text-gray-700">
                שיעורים ממוקדים בנושאים הדרושים בלבד, במטרה להשלים פערים בזמן קצר ולהגיע מוכנים למבחן.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4 text-[#0D1B2A]">🧠</div> {/* Brain/Understanding icon */}
              <h3 className="font-bold text-xl mb-2">החומר לא יושב כמו שצריך?</h3>
              <p className="text-gray-700">
                החומר בשיעורים הרגילים לא תמיד ברור? נפשט יחד נושאים מורכבים ונהפוך אותם לנגישים.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4 text-[#0D1B2A]">📈</div> {/* Growth/Results icon */}
              <h3 className="font-bold text-xl mb-2">נמאס מציונים נמוכים?</h3>
              <p className="text-gray-700">
                הגיע הזמן לעבור מציונים להצטיינות – עם אסטרטגיה אישית שתשדרג את הביצועים ותביא תוצאות.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HOW SECTION - איך אנחנו עושים את זה? */}
      <section className="bg-gray-100 py-20 px-6 text-gray-900">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">איך אנחנו עושים את זה?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12">
            השיטה משלבת מבנה למידה ברור, אווירה תומכת, ותוכן לימודי מותאמים אישית כדי להבטיח הבנה מלאה של החומר,
            <br />
            ביטחון עצמי גבוה, ויכולת ליישם כל מה שנלמד בפועל. הנה איך זה קורה בפועל:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <AnimatedSection delay={0}>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <img
              src={assessmentImage}
              alt="אבחון אישי"
              className="rounded-lg mb-4 object-cover h-40 w-full"
            />
              <h3 className="font-bold text-xl mb-2">אבחון אישי</h3>
              <p className="text-gray-700">
                נתחיל בזיהוי נקודות החוזק והחולשה, ונבנה תוכנית מותאמת אישית כדי לבנות תוכנית לשיפור מדורג ובטוח.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <img
        src={materialsImage}
        alt="חומר מותאם"
        className="rounded-lg mb-4 object-cover h-40 w-full"
      />
              <h3 className="font-bold text-xl mb-2">שיעור חי</h3>
              <p className="text-gray-700">
                מפגש ממוקד ומהנה, בזום או פרונטלי, המשלב הסברים ברורים, דוגמאות ותרגול מעשי בזמן אמת.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <img
              src={lessonImage}
              alt="שיעור חי"
              className="rounded-lg mb-4 object-cover h-40 w-full"
            />
              <h3 className="font-bold text-xl mb-2">חומר מותאם</h3>
              <p className="text-gray-700">
                סיכומים, הקלטות ותרגולים ממוקדים, מותאמים אישית לקצב ולצרכים, להמשך תרגול ולמידה עצמאית.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <img
              src={trackingImage}
              alt="מעקב ושיפור"
              className="rounded-lg mb-4 object-cover h-40 w-full"
            />
              <h3 className="font-bold text-xl mb-2">מעקב ושיפור</h3>
              <p className="text-gray-700">
                בחינת ההתקדמות במבחני דמה ומשוב קבוע, עם התאמות מתמשכות עד להשגת המטרה.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-gray-900">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">מה אומרים התלמידים?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12">
            סיפורי ההצלחה האמיתיים של תלמידים וסטודנטים שהפכו את האתגרים להישגים ומימשו את הפוטנציאל שלהם:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection delay={0}>
            <blockquote className="bg-white border-r-4 border-[#F49F0A] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full">
              <p className="italic text-lg text-gray-800">
                "אביב ידע לזהות את הקשיים ולתת פתרונות אמיתיים שעבדו. הציונים השתפרו משמעותית וניגשתי למבחן עם ביטחון מלא."
              </p>
              <footer className="mt-4 font-semibold text-[#0D1B2A] text-left">דניאל, תלמיד תיכון</footer>
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <blockquote className="bg-white border-r-4 border-[#F49F0A] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full">
              <p className="italic text-lg text-gray-800">
                "השיעורים נתנו לי שיטות עבודה וכלים פרקטיים. החומר המורכב הפך לברור והביטחון שלי גדל בצורה משמעותית."
              </p>
              <footer className="mt-4 font-semibold text-[#0D1B2A] text-left">שירה, סטודנטית למערכות מידע</footer>
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <blockquote className="bg-white border-r-4 border-[#F49F0A] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full">
              <p className="italic text-lg text-gray-800">
                "התאמה אישית מלאה וקצב נכון. סוף סוף הבנתי את מה שהיה נראה בלתי אפשרי."
              </p>
              <footer className="mt-4 font-semibold text-[#0D1B2A] text-left">רועי כהן, סטודנט למערכות מידע ניהוליות</footer>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

        {/* NUMBERS + CTA SECTION */}
<section className="relative bg-gradient-to-r from-purple-700 to-blue-800 text-white py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
    {/* Title */}
    <AnimatedSection delay={0}>
      <h3 className="text-3xl md:text-4xl font-extrabold mb-12">
        המספרים מדברים בעד עצמם
      </h3>
    </AnimatedSection>

    {/* Counters */}
    <div className="grid md:grid-cols-4 gap-10 mb-12">
      <AnimatedSection delay={100}>
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <NumberCounter endValue={500} suffix="+" />
          <p className="text-lg mt-2">שיעורים שהתקיימו</p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={200}>
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <NumberCounter endValue={2} suffix="" />
          <p className="text-lg mt-2">שנות ניסיון בהוראה</p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={300}>
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <NumberCounter endValue={9} suffix="+" />
          <p className="text-lg mt-2">קורסים נלמדים באקדמיה</p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={400}>
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <NumberCounter endValue={50} suffix="+" />
          <p className="text-lg mt-2">תלמידים מרוצים</p>
        </div>
      </AnimatedSection>
    </div>

    {/* CTA */}
    <AnimatedSection delay={500}>
      <button
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-[#F49F0A] text-[#0D1B2A] font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
      >
        רוצה להיות סיפור ההצלחה הבא? קבע שיעור עכשיו!
      </button>
    </AnimatedSection>
  </div>
</section>

      {/* WHAT I OFFER SECTION - מה אני מציע? */}
      <section className="bg-gray-50 py-20 px-6 text-gray-900">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">מה אני מציע?</h2>
          <p className="text-center text-lg max-w-3xl mx-auto mb-12">
            אני מציע שיעורים פרטיים אחד על אחד או בקבוצות קטנות, בזום או פרונטלי, באורך 60 דקות, עם אפשרות לחבילות מוזלות:
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatedSection delay={0}>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center border-t-8 border-purple-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-2xl mt-4 mb-4">שיעור חד-פעמי</h3>
              <p className="text-gray-700 text-lg mb-6">
                בזום: 150₪ | פרונטלי: 200₪
              </p>
              <p className="text-gray-600 mb-6">
                מושלם להפחתת ראשוניות או לחיזוק נקודתי.
              </p>
              <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-purple-700 transition w-full">
                קבע שיעור
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center border-t-8 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-2xl mt-4 mb-4">חבילת 4 שיעורים</h3>
              <p className="text-gray-700 text-lg mb-6">
                הנחה 10%
              </p>
              <p className="text-gray-600 mb-6">
                פתרון מעולה למי שרוצה להתקדם בקצב יציב.
              </p>
              <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition w-full">
                בחר חבילה
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg text-center border-t-8 border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-2xl mt-4 mb-4">חבילת 8 שיעורים</h3>
              <p className="text-gray-700 text-lg mb-6">
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold ml-2">הכי משתלם!</span>
                הנחה 15%
              </p>
              <p className="text-gray-600 mb-6">
                המסלול המומלץ להצלחה ארוכת טווח ושיפור משמעותי.
              </p>
              <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition w-full">
                בחר חבילה
              </button>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={600}>
          <div className="text-center mt-12">
            <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#0D1B2A] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              בדוק זמינות והתחל בשיעור היכרות
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* WHO IS IT FOR? SECTION - למי זה מתאים? */}
      <section className="bg-gradient-to-r from-purple-700 to-blue-800 py-20 px-6 text-white">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">למי זה מתאים?</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatedSection delay={0}>
            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
              <img
                src="https://placehold.co/400x300/505050/FFFFFF?text=סטודנטים"
                alt="סטודנטים"
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/505050/FFFFFF?text=תמונה+חסרה"; }}
              />
              <h3 className="font-bold text-2xl mb-2">סטודנטים</h3>
              <p className="text-gray-700">
                אם אתם לומדים מערכות מידע, מנהל עסקים או מקצועות דומים ורוצים לא רק ללמוד, אלא גם להצטיין בחשיבה – השיטה שלי תפורה עבורכם.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
              <img
                src="https://placehold.co/400x300/505050/FFFFFF?text=תלמידי+תיכון"
                alt="תלמידי תיכון"
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/505050/FFFFFF?text=תמונה+חסרה"; }}
              />
              <h3 className="font-bold text-2xl mb-2">תלמידי תיכון</h3>
              <p className="text-gray-700">
                לתלמידי כיתות י'-י"ב המעוניינים בהבנה יסודית וממוקדת לבגרויות במתמטיקה ואנגלית, כדי להגיע לציון האקדמי שלי להצלחה.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>/

      {/* FAQ SECTION */}
      <section className="bg-gray-50 py-20 px-6 text-gray-900">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">שאלות נפוצות</h2>
        </AnimatedSection>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300">
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-bold text-xl flex items-center">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-7 w-7 flex items-center justify-center text-sm ml-3">
                      ℹ️
                    </span>
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                {openFAQ === index && (
                  <p className="mt-4 text-gray-700 leading-relaxed animate-fade-in-down">
                    {faq.answer}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      <ContactForm />
      {/* FINAL CTA SECTION */}
      <section
        className="bg-gradient-to-r from-purple-800 to-blue-900 text-white py-20 px-6 text-center overflow-hidden"
      >
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            בואו נתחיל את הצעד הראשון להצלחה שלך
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 drop-shadow">
            אני מאמין שכל אחד יכול להצטיין כשיש לו את התמיכה, הכלים וההכוונה הנכונה. השיעור הראשון שלך מחכה – זו ההזדמנות שלך להתחיל!
          </p>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <div className="flex flex-col md:flex-row justify-center gap-6">
    <a
    href="https://wa.me/972528794257?text=שלום%20אביב,%20אני%20מעוניין%20לקבל%20פרטים%20על%20השיעורים%20שלך"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center bg-[#25D366] text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-[#1EBE5C] transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      className="w-6 h-6 mr-2"
    />
    אפשר לדבר איתי ב- WhatsApp
    </a>
            <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#F49F0A] text-[#0D1B2A] font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              שריין שיעור היכרות
            </button>
          </div>
        </AnimatedSection>
      </section>
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} אביב מלכה – כל הזכויות שמורות.
      </footer>
    </div>
  );
}
