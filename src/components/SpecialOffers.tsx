import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

export default function SpecialOffers() {
  const { lang } = useStore();
  const { products } = useProducts();
  const offers = products.filter(p => p.isOffer).slice(0, 4);

  return (
    <section className="fluid-section">
      <div className="fluid-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-[clamp(1rem,4vw,2.5rem)]">
          <div className="inline-flex items-center gap-[clamp(0.4rem,0.9vw,0.5rem)] bg-deep-red/20 border border-deep-red/30 rounded-full px-[clamp(0.8rem,2.1vw,1.1rem)] py-[clamp(0.35rem,0.8vw,0.45rem)] mb-[clamp(0.4rem,1.2vw,0.6rem)]">
            <Flame className="w-[clamp(0.9rem,2.2vw,1.1rem)] h-[clamp(0.9rem,2.2vw,1.1rem)] text-rose-warm" />
            <span className="text-rose-warm text-[clamp(1rem,2.2vw,1.15rem)] font-bold">{lang === 'ar' ? 'عروض محدودة' : 'Limited Offers'}</span>
            <Flame className="w-[clamp(0.9rem,2.2vw,1.1rem)] h-[clamp(0.9rem,2.2vw,1.1rem)] text-rose-warm" />
          </div>
          <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading">{lang === 'ar' ? 'العروض الخاصة' : 'Special Offers'}</h2>
        </motion.div>

        <div className="grid grid-cols-2 min-[768px]:grid-cols-4 gap-[clamp(0.4rem,1.8vw,1.2rem)]">
          {offers.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </div>
    </section>
  );
}
