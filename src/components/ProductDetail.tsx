import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductDetail() {
  const {
    lang, selectedProduct, setSelectedProduct,
    addToCart, addToWishlist, removeFromWishlist, isInWishlist, addFlyingHeart
  } = useStore();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const inWishlist = isInWishlist(selectedProduct.id);
  const similar = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4);

  const handleAddToCart = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    addFlyingHeart(rect.left + rect.width / 2, rect.top);
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setSelectedProduct(null); setCurrentImage(0); setQuantity(1); }}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-16 z-50 bg-midnight-dark rounded-2xl overflow-hidden border border-velvet/20 flex flex-col">
            <button onClick={() => { setSelectedProduct(null); setCurrentImage(0); setQuantity(1); }}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 p-2 glass-effect rounded-full hover:bg-velvet/20 transition-colors">
              <X size={18} className="text-soft-white" />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        src={selectedProduct.images?.[currentImage] || selectedProduct.image} alt={lang === 'ar' ? selectedProduct.name : selectedProduct.nameEn}
                        className="w-full h-full object-cover" />
                    </AnimatePresence>
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                      <>
                        <button onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 glass-effect rounded-full flex items-center justify-center hover:bg-velvet/30 transition-colors">
                          <ChevronLeft size={16} className="text-soft-white" />
                        </button>
                        <button onClick={() => setCurrentImage(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 glass-effect rounded-full flex items-center justify-center hover:bg-velvet/30 transition-colors">
                          <ChevronRight size={16} className="text-soft-white" />
                        </button>
                      </>
                    )}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2">
                      {selectedProduct.isNew && <span className="bg-velvet text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-bold">{lang === 'ar' ? 'جديد' : 'NEW'}</span>}
                      {selectedProduct.isOffer && selectedProduct.discount && <span className="bg-deep-red text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-bold">-{selectedProduct.discount}%</span>}
                    </div>
                  </div>
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="flex gap-2 p-3 sm:p-4 overflow-x-auto">
                      {selectedProduct.images.map((img, i) => (
                        <button key={i} onClick={() => setCurrentImage(i)}
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === currentImage ? 'border-velvet' : 'border-transparent opacity-50'}`}>
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-velvet-light text-xs sm:text-sm font-medium mb-2">{lang === 'ar' ? selectedProduct.category : selectedProduct.categoryEn}</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-soft-white font-heading">{lang === 'ar' ? selectedProduct.name : selectedProduct.nameEn}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.floor(selectedProduct.rating) ? 'text-gold fill-gold' : 'text-soft-white/20'} />)}</div>
                    <span className="text-soft-white/40 text-sm">({selectedProduct.rating})</span>
                    <span className="text-soft-white/20">|</span>
                    <span className="text-velvet-light text-sm">{selectedProduct.stock > 0 ? lang === 'ar' ? `متوفر (${selectedProduct.stock})` : `In Stock (${selectedProduct.stock})` : lang === 'ar' ? 'غير متوفر' : 'Out of Stock'}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-rose-gold">{selectedProduct.price} {lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                    {selectedProduct.oldPrice && <span className="text-lg text-soft-white/30 line-through">{selectedProduct.oldPrice} {lang === 'ar' ? 'ج.م' : 'EGP'}</span>}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-soft-white/70 mb-2">{lang === 'ar' ? 'الوصف' : 'Description'}</h4>
                    <p className="text-soft-white/50 text-sm leading-relaxed">{lang === 'ar' ? selectedProduct.description : selectedProduct.descriptionEn}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-soft-white/60 text-sm">{lang === 'ar' ? 'الكمية' : 'Quantity'}</span>
                    <div className="flex items-center gap-3 bg-midnight-light/50 rounded-xl px-3 py-2 border border-velvet/20">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg bg-velvet/20 flex items-center justify-center hover:bg-velvet/40 transition-colors text-soft-white font-bold">-</button>
                      <span className="text-soft-white font-bold w-8 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))} className="w-8 h-8 rounded-lg bg-velvet/20 flex items-center justify-center hover:bg-velvet/40 transition-colors text-soft-white font-bold">+</button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddToCart}
                      className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-velvet to-velvet-light rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-velvet/30">
                      <ShoppingCart size={18} />{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => inWishlist ? removeFromWishlist(selectedProduct.id) : addToWishlist(selectedProduct)}
                      className={`w-12 sm:w-14 rounded-xl flex items-center justify-center border transition-all ${inWishlist ? 'bg-rose-pink/20 border-rose-pink/50' : 'bg-midnight-light/50 border-velvet/20 hover:border-rose-pink/50'}`}>
                      <Heart size={20} className={inWishlist ? 'text-rose-pink' : 'text-soft-white/60'} fill={inWishlist ? '#f0a6ca' : 'none'} />
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-4 border-t border-velvet/10">
                    <div className="text-center p-2 sm:p-3 bg-midnight-light/30 rounded-xl"><p className="text-lg sm:text-xl mb-1">📦</p><p className="text-[10px] sm:text-xs text-soft-white/40">{lang === 'ar' ? 'شحن سري' : 'Discreet Shipping'}</p></div>
                    <div className="text-center p-2 sm:p-3 bg-midnight-light/30 rounded-xl"><p className="text-lg sm:text-xl mb-1">✅</p><p className="text-[10px] sm:text-xs text-soft-white/40">{lang === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}</p></div>
                  </div>
                </div>
              </div>

              {similar.length > 0 && (
                <div className="p-4 sm:p-6 md:p-8 border-t border-velvet/10">
                  <h3 className="text-lg sm:text-xl font-bold text-rose-gold mb-4 sm:mb-6">{lang === 'ar' ? '✨ منتجات مشابهة' : '✨ Similar Products'}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">{similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
