import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import ProductCard from './ProductCard';

export default function ProductsPage() {
  const { lang, searchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const { products } = useProducts();
  const { categories } = useCategories();

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (showOffersOnly) filtered = filtered.filter(p => p.isOffer);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.categoryEn.toLowerCase().includes(q));
    }
    return filtered;
  }, [selectedCategory, showOffersOnly, searchQuery, products]);

  return (
    <section className="pt-[clamp(4rem,10vw,6.5rem)] pb-[clamp(2rem,5vw,4rem)]">
      <div className="fluid-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-[clamp(1rem,4vw,2.5rem)]">
          <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading mb-[clamp(0.3rem,1vw,0.5rem)]">
            {lang === 'ar' ? 'منتجاتنا' : 'Our Products'}
          </h2>
          <p className="text-soft-white/50 text-[clamp(0.65rem,1.8vw,0.85rem)]">{lang === 'ar' ? 'اكتشف مجموعتنا الحصرية' : 'Discover our exclusive collection'}</p>
        </motion.div>

        <div className="mb-[1rem] -mx-[clamp(0.75rem,3vw,2rem)] px-[clamp(0.75rem,3vw,2rem)]">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <motion.button key={cat.id} whileTap={{ scale: 0.97 }} onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 h-[41px] px-5 rounded-[999px] text-[0.95rem] font-medium transition-all duration-300 ${
                  selectedCategory === cat.id ? 'bg-gradient-to-r from-velvet to-velvet-light text-white shadow-lg shadow-velvet/30' : 'bg-midnight-light/50 text-soft-white/80 border border-velvet/10'
                }`}>
                <span className="text-[1rem] leading-none">{cat.icon}</span>
                <span className="whitespace-nowrap">{lang === 'ar' ? cat.name : cat.nameEn}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-[1rem] gap-3">
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowOffersOnly(!showOffersOnly)}
            className={`flex items-center gap-2 h-[41px] px-5 rounded-[999px] text-[0.95rem] transition-all whitespace-nowrap ${
              showOffersOnly ? 'bg-deep-red/30 text-rose-pink border border-deep-red/50' : 'bg-midnight-light/50 text-soft-white/80 border border-velvet/10'
            }`}>
            <Filter className="w-[1rem] h-[1rem]" />
            {lang === 'ar' ? '🔥 العروض' : '🔥 Offers'}
          </motion.button>
          <span className="text-soft-white/40 text-[clamp(0.6rem,1.6vw,0.75rem)]">{filteredProducts.length} {lang === 'ar' ? 'منتج' : 'items'}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={selectedCategory + showOffersOnly + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 min-[480px]:grid-cols-3 min-[768px]:grid-cols-4 gap-[clamp(0.4rem,1.8vw,1.2rem)]">
            {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-[clamp(2rem,8vw,4rem)]">
            <p className="text-[clamp(1.8rem,6vw,3rem)] mb-[clamp(0.4rem,1.2vw,0.6rem)]">😔</p>
            <p className="text-soft-white/50 text-[clamp(0.75rem,2vw,0.95rem)]">{lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}