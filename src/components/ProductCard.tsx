import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck } from 'lucide-react';
import { useStore, Product } from '../store/useStore';

interface Props { product: Product; index?: number; }

export default function ProductCard({ product, index = 0 }: Props) {
  const { lang, addToCart, addToWishlist, removeFromWishlist, isInWishlist, setSelectedProduct, addFlyingHeart } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    addFlyingHeart(rect.left + rect.width / 2, rect.top);
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <motion.div ref={cardRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }} whileHover={{ y: -4 }}
      className="group relative bg-midnight-light/50 rounded-2xl overflow-hidden border border-velvet/10 hover:border-velvet/30 transition-all duration-500 cursor-pointer"
      onClick={() => setSelectedProduct(product)}>
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-midnight-light animate-pulse" />}
        <img src={product.image} alt={lang === 'ar' ? product.name : product.nameEn}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/80 via-transparent to-transparent" />

        {product.free_shipping && (
          <div className="absolute top-0 left-0 z-20 w-28 h-28 overflow-hidden pointer-events-none">
            <div className="absolute top-[22px] -left-[38px] w-[170px] rotate-[-45deg] origin-center bg-gradient-to-r from-gold via-rose-gold to-gold text-midnight-dark text-[0.72rem] md:text-[0.78rem] font-extrabold tracking-tight py-[6px] flex items-center justify-center gap-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.4)]">
              <Truck className="w-[0.85rem] h-[0.85rem]" strokeWidth={2.75} />
              <span>{lang === 'ar' ? 'شحن مجاني' : 'Free Ship'}</span>
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.isNew && <span className="bg-velvet text-white text-[0.7rem] md:text-[0.78rem] px-2.5 py-1 rounded-full font-bold">{lang === 'ar' ? 'جديد' : 'NEW'}</span>}
          {product.isOffer && product.discount && <span className="bg-deep-red text-white text-[0.7rem] md:text-[0.78rem] px-2.5 py-1 rounded-full font-bold">-{product.discount}%</span>}
        </div>

        <button onClick={handleWishlist}
          className="absolute top-3 left-3 w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-rose-pink/20 transition-colors z-10 active:scale-90">
          <Heart className="w-5 h-5 text-soft-white" fill={inWishlist ? '#f0a6ca' : 'none'} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 z-10">
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddToCart}
            className="w-full py-2.5 bg-gradient-to-r from-velvet to-velvet-light rounded-xl text-white text-[0.82rem] md:text-[0.9rem] font-bold flex items-center justify-center gap-2 shadow-lg shadow-velvet/30 active:scale-98">
            <ShoppingCart className="w-[1.05rem] h-[1.05rem]" />
            <span>{lang === 'ar' ? 'أضف' : 'Add'}</span>
          </motion.button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-[0.75rem] md:text-[0.82rem] text-velvet-light font-bold">
          {lang === 'ar' ? product.category : product.categoryEn}
        </p>
        <h3 className="text-[0.95rem] md:text-[1.05rem] leading-5 font-bold text-soft-white line-clamp-1 group-hover:text-rose-gold transition-colors">
          {lang === 'ar' ? product.name : product.nameEn}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-[1.08rem] h-[1.08rem] ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-soft-white/20'}`} />
            ))}
          </div>
          <span className="text-[0.94rem] md:text-[1rem] text-soft-white/45">({product.rating})</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[1.12rem] md:text-[1.22rem] font-extrabold text-rose-gold">{product.price}</span>
          <span className="text-[0.72rem] md:text-[0.78rem] text-rose-gold/70">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
          {product.oldPrice && <span className="text-[0.75rem] md:text-[0.82rem] text-soft-white/30 line-through mr-1.5">{product.oldPrice}</span>}
        </div>
      </div>
    </motion.div>
  );
}