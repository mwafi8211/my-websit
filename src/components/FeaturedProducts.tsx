import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { lang, setActivePage } = useStore();
  const { products } = useProducts();
  const featured = products.filter(p => p.isNew || p.rating >= 4.8).slice(0, 8);

  return (
    <section className="fluid-section">
      <div className="fluid-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-[clamp(1rem,4vw,2.5rem)]">
          <div className="inline-flex items-center gap-[clamp(0.35rem,0.8vw,0.45rem)] bg-velvet/10 border border-velvet/20 rounded-full px-[clamp(0.8rem,2.1vw,1.1rem)] py-[clamp(0.35rem,0.8vw,0.45rem)] mb-[clamp(0.5rem,1.3vw,0.7rem)]">
            <Sparkles className="w-[clamp(0.8rem,2vw,0.95rem)] h-[clamp(0.8rem,2vw,0.95rem)] text-rose-gold" />
            <span className="text-rose-gold text-[clamp(0.78rem,1.9vw,0.92rem)] font-bold">{lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}</span>
            <Sparkles className="w-[clamp(0.8rem,2vw,0.95rem)] h-[clamp(0.8rem,2vw,0.95rem)] text-rose-gold" />
          </div>
          <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading mb-[clamp(0.3rem,1vw,0.5rem)]">
            {lang === 'ar' ? 'منتجات مميزة' : 'Featured Products'}
          </h2>
          <p className="text-soft-white/40 text-[clamp(0.65rem,1.8vw,0.85rem)]">{lang === 'ar' ? 'اكتشف أفضل منتجاتنا' : 'Discover our best products'}</p>
        </motion.div>

        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 min-[768px]:grid-cols-4 gap-[clamp(0.4rem,1.8vw,1.2rem)]">
          {featured.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-[clamp(1rem,4vw,2rem)]">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActivePage('products')}
            className="px-[clamp(1.35rem,4.2vw,2.35rem)] py-[clamp(0.65rem,2vw,0.9rem)] border border-velvet/30 rounded-full text-velvet-light hover:bg-velvet/10 font-semibold text-[clamp(1.05rem,2.4vw,1.2rem)] transition-all">
            {lang === 'ar' ? 'عرض الكل →' : 'View All →'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
