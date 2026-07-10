import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function HeroSection() {
  const { lang, setActivePage } = useStore();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-[clamp(3rem,7vw,4.5rem)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.pexels.com/photos/6207825/pexels-photo-6207825.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-dark/90 via-midnight/80 to-midnight-dark/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-velvet-dark/30 to-deep-red/20" />
      </div>

      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute w-[clamp(2px,0.5vw,4px)] h-[clamp(2px,0.5vw,4px)] bg-rose-gold/40 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [-15, 15, -15], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
      ))}

      <div className="relative z-10 text-center px-[clamp(1rem,4vw,2rem)] w-[min(96vw,800px)] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-flex items-center gap-[clamp(0.2rem,0.8vw,0.4rem)] bg-velvet/20 border border-velvet/30 rounded-full px-[clamp(0.6rem,2vw,1.1rem)] py-[clamp(0.3rem,1vw,0.45rem)] mb-[clamp(0.8rem,3vw,1.5rem)]"
            whileHover={{ scale: 1.05 }}>
            <Sparkles className="w-[clamp(0.65rem,1.8vw,0.9rem)] h-[clamp(0.65rem,1.8vw,0.9rem)] text-rose-gold" />
            <span className="text-[clamp(0.55rem,1.4vw,0.7rem)] text-rose-gold">{lang === 'ar' ? 'مرحباً بكم' : 'Welcome'}</span>
            <Sparkles className="w-[clamp(0.65rem,1.8vw,0.9rem)] h-[clamp(0.65rem,1.8vw,0.9rem)] text-rose-gold" />
          </motion.div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(1.8rem,7vw,4.5rem)] font-bold mb-[clamp(0.6rem,2vw,1.2rem)] font-heading leading-tight">
          <span className="text-gradient">{lang === 'ar' ? 'السعادة الزوجية' : 'Marital Happiness'}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[clamp(0.8rem,2.8vw,1.4rem)] text-rose-gold/90 mb-[clamp(0.4rem,1.5vw,0.7rem)] font-medium leading-relaxed">
          {lang === 'ar' ? 'مش مجرد منتجات... دي أول خطوة في ليلة مش هتتنسى' : "Not just products... It's the first step to an unforgettable night"}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[clamp(0.65rem,1.8vw,0.9rem)] text-soft-white/50 mb-[clamp(1.2rem,4vw,2.2rem)] max-w-[min(90%,550px)] mx-auto">
          {lang === 'ar' ? 'اكتشف مجموعة حصرية من المنتجات المصممة خصيصاً لإضافة لمسة سحرية على حياتكم الزوجية' : 'Discover an exclusive collection designed to add magic to your married life'}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-[clamp(0.6rem,2vw,1rem)]">
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(107, 47, 160, 0.5)' }} whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('products')}
            className="w-full sm:w-auto px-[clamp(1.2rem,4vw,2.2rem)] py-[clamp(0.6rem,2vw,0.9rem)] bg-gradient-to-r from-velvet to-velvet-light rounded-full text-white font-bold text-[clamp(0.8rem,2vw,0.95rem)] shadow-lg shadow-velvet/30">
            {lang === 'ar' ? '🛍️ تسوق الآن' : '🛍️ Shop Now'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('products')}
            className="w-full sm:w-auto px-[clamp(1.2rem,4vw,2.2rem)] py-[clamp(0.6rem,2vw,0.9rem)] border border-rose-gold/40 rounded-full text-rose-gold hover:bg-rose-gold/10 font-medium text-[clamp(0.8rem,2vw,0.95rem)] transition-all">
            {lang === 'ar' ? '🎁 العروض' : '🎁 Offers'}
          </motion.button>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-[clamp(0.8rem,3vw,1.8rem)] left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ArrowDown className="text-rose-gold/40 w-[clamp(0.9rem,2.5vw,1.4rem)] h-[clamp(0.9rem,2.5vw,1.4rem)]" />
      </motion.div>
    </section>
  );
}
