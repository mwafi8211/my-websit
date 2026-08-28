import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, Plus } from 'lucide-react';
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
          <div className="absolute top-0 left-0 z-20 w-36 h-36 overflow-hidden pointer-events-none">
            <div className="absolute top-[30px] -left-[42px] w-[190px] rotate-[-45deg] origin-center bg-gradient-to-r from-gold via-rose-gold to-gold text-midnight-dark text-[0.68rem] md:text-[0.74rem] font-extrabold tracking-tight py-[6px] flex items-center justify-center gap-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.4)] whitespace-nowrap">
              <Truck className="w-[0.8rem] h-[0.8rem] flex-shrink-0" strokeWidth={2.75} />
              <span>{lang === 'ar' ? 'شحن مجاني' : 'Free Ship'}</span>
            </div>
          </div>
        )}

        {/* Badges - now with glowing outline style instead of solid fill */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-midnight-dark/70 backdrop-blur-sm border border-velvet-light text-velvet-light text-[0.7rem] md:text-[0.78rem] px-2.5 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(255,20,147,0.5)]">
              {lang === 'ar' ? 'جديد' : 'NEW'}
            </span>
          )}
          {product.isOffer && product.discount && (
            <span className="bg-midnight-dark/70 backdrop-blur-sm border border-deep-red text-deep-red text-[0.7rem] md:text-[0.78rem] px-2.5 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(199,21,133,0.5)]">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist icon - bigger, glowing ring, scales up on hover */}
        <button onClick={handleWishlist}
          className={`absolute top-3 left-3 w-11 h-11 rounded-full glass-effect flex items-center justify-center transition-all duration-300 z-30 active:scale-90 hover:scale-110 ${inWishlist ? 'shadow-[0_0_16px_rgba(255,20,147,0.7)] border border-velvet-light' : 'hover:shadow-[0_0_12px_rgba(255,20,147,0.4)]'}`}>
          <Heart className="w-5 h-5 text-soft-white transition-transform" fill={inWishlist ? '#FF1493' : 'none'} strokeWidth={2} />
        </button>

        {/* Add to cart - floating circular button, expands to show label on hover */}
        <div className="absolute bottom-3 right-3 z-10">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleAddToCart}
            className="group/btn flex items-center gap-0 overflow-hidden h-11 rounded-full bg-gradient-to-r from-velvet to-velvet-light shadow-lg shadow-velvet/40 active:scale-95 transition-all duration-300 hover:pl-4">
            <span className="max-w-0 group-hover/btn:max-w-[80px] overflow-hidden whitespace-nowrap transition-all duration-300 text-white text-[0.82rem] font-bold">
              {lang === 'ar' ? 'أضف' : 'Add'}
            </span>
            <span className="w-11 h-11 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-[1.2rem] h-[1.2rem] text-white" />
            </span>
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
              <Star key={i} className={`w-[1.08rem] h-[1.08rem] transition-all ${i < Math.floor(product.rating) ? 'text-gold fill-gold drop-shadow-[0_0_4px_rgba(255,20,147,0.6)]' : 'text-soft-white/20'}`} />
            ))}
          </div>
          <span className="text-[0.94rem] md:text-[1rem] text-soft-white/45">({product.rating})</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[1.12rem] md:text-[1.22rem] font-extrabold text-rose-gold">{product.price}</span>
          <span className="text-[0.72rem] md:text-[0.78rem] text-rose-gold/70">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
          {product.oldPrice && <span className="text-[1.12rem] md:text-[1.22rem] font-bold text-soft-white/35 line-through mr-1.5">{product.oldPrice}</span>}
        </div>
      </div>
    </motion.div>
  );
}