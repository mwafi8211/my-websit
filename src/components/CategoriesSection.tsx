import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useCategories } from '../hooks/useCategories';

export default function CategoriesSection() {
  const { lang, setActivePage } = useStore();
  const { categories } = useCategories();
  const displayCategories = categories.filter(c => c.id !== 'all');

  return (
    <section className="fluid-section">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-[clamp(1rem,4vw,2.5rem)]">
        <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading mb-[clamp(0.3rem,1vw,0.5rem)]">
          {lang === 'ar' ? 'تصفح الأقسام' : 'Browse Categories'}
        </h2>
        <p className="text-soft-white/40 text-[clamp(0.65rem,1.8vw,0.85rem)]">{lang === 'ar' ? 'اختر القسم اللي يعجبك' : 'Choose your favorite category'}</p>
      </motion.div>

      <div className="fluid-wrap">
        <div className="grid grid-cols-4 min-[640px]:grid-cols-7 gap-[clamp(0.6rem,2.2vw,1.3rem)]">
          {displayCategories.map((cat, index) => (
            <motion.button key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.05 }} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.95 }}
              onClick={() => setActivePage('products')}
              className="relative group bg-midnight-light/30 rounded-[clamp(0.7rem,2.2vw,1.25rem)] p-[clamp(0.95rem,2.8vw,1.6rem)] border border-velvet/10 hover:border-velvet/30 transition-all duration-500 overflow-hidden min-h-[92px]">
              <div className="absolute inset-0 bg-gradient-to-br from-velvet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                <motion.span className="text-[clamp(1.65rem,4.4vw,2.15rem)] block mb-[clamp(0.38rem,0.9vw,0.6rem)]" whileHover={{ scale: 1.2 }}>{cat.icon}</motion.span>
                <h3 className="text-[clamp(0.78rem,2vw,0.95rem)] font-bold text-soft-white group-hover:text-rose-gold transition-colors leading-tight">{lang === 'ar' ? cat.name : cat.nameEn}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}