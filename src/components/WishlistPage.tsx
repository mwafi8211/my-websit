import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

export default function WishlistPage() {
  const { lang, wishlist, setActivePage } = useStore();

  return (
    <section className="pt-[clamp(4rem,10vw,6.5rem)] pb-[clamp(2rem,5vw,4rem)]">
      <div className="fluid-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-[clamp(1rem,4vw,2.5rem)]">
          <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading mb-[clamp(0.3rem,1vw,0.5rem)] flex items-center justify-center gap-[clamp(0.4rem,1.5vw,0.7rem)]">
            <Heart className="w-[clamp(1.4rem,5vw,2rem)] h-[clamp(1.4rem,5vw,2rem)] text-rose-pink" fill="#f0a6ca" />
            {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
          </h2>
          <p className="text-soft-white/50 text-[clamp(0.65rem,1.8vw,0.85rem)]">{lang === 'ar' ? 'المنتجات اللي حفظتها' : 'Products you saved'}</p>
        </motion.div>
        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-[clamp(2rem,8vw,4rem)]">
            <p className="text-[clamp(2.2rem,8vw,3.5rem)] mb-[clamp(0.6rem,2vw,0.9rem)]">💔</p>
            <p className="text-soft-white/40 text-[clamp(0.8rem,2.2vw,1rem)] mb-[clamp(0.8rem,3vw,1.4rem)]">{lang === 'ar' ? 'لسه ما أضفت حاجة للمفضلة' : "You haven't added anything yet"}</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setActivePage('products')}
              className="px-[clamp(1.2rem,4vw,2rem)] py-[clamp(0.5rem,1.8vw,0.75rem)] bg-gradient-to-r from-velvet to-velvet-light rounded-full text-white font-bold text-[clamp(0.75rem,2vw,0.9rem)] shadow-lg shadow-velvet/30">
              {lang === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 min-[480px]:grid-cols-3 min-[768px]:grid-cols-4 gap-[clamp(0.4rem,1.8vw,1.2rem)]">
            {wishlist.map((item, index) => <ProductCard key={item.product.id} product={item.product} index={index} />)}
          </div>
        )}
      </div>
    </section>
  );
}
