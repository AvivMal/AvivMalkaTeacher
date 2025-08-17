import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white min-h-screen flex items-center justify-center px-6">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 max-w-4xl text-center">
        {/* כותרת ראשית */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          לומדים אחרת, מצליחים יותר 🚀
        </motion.h1>

        {/* טקסט משנה */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-100"
        >
          שיעורים מותאמים אישית בליווי צמוד – מתיכון ועד אקדמיה.  
          המטרה? להפוך את החומר המפחיד לפשוט, ברור ואפילו מהנה.
        </motion.p>

        {/* קריאה לפעולה */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
          >
            אני רוצה לשפר ציונים
          </a>
          <a
            href="#about"
            className="bg-transparent border border-white hover:bg-white hover:text-black font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            איך זה עובד?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
