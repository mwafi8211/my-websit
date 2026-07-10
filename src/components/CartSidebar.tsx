import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartSidebar() {
  const { lang, cart, showCart, setShowCart, removeFromCart, updateQuantity, setShowCheckout, setShowLogin, user } = useStore();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {showCart && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCart(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
          <motion.div initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 left-0 w-[min(100vw,360px)] h-full bg-midnight-dark border-l border-velvet/20 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-velvet/20 bg-midnight/40">
              <h3 className="text-[1.15rem] font-extrabold text-rose-gold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                {lang === 'ar' ? 'السلة' : 'Cart'}
                <span className="text-[0.85rem] text-soft-white/50">({cart.length})</span>
              </h3>
              <button onClick={() => setShowCart(false)} className="w-10 h-10 hover:bg-velvet/20 rounded-xl transition-colors flex items-center justify-center active:scale-95">
                <X className="w-5 h-5 text-soft-white/70" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-[clamp(0.6rem,2.5vw,1.1rem)] space-y-[clamp(0.4rem,1.2vw,0.65rem)]">
              {cart.length === 0 ? (
                <div className="text-center py-[clamp(2rem,8vw,4rem)]">
                  <p className="text-[clamp(1.8rem,7vw,2.8rem)] mb-[clamp(0.4rem,1.2vw,0.6rem)]">🛒</p>
                  <p className="text-soft-white/40 text-[clamp(0.7rem,1.8vw,0.85rem)]">{lang === 'ar' ? 'السلة فارغة' : 'Cart is empty'}</p>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map(item => (
                    <motion.div key={item.product.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 bg-midnight-light/40 rounded-[clamp(0.7rem,2vw,1rem)] p-3 border border-velvet/15 shadow-sm">
                      <img src={item.product.image} alt={lang === 'ar' ? item.product.name : item.product.nameEn}
                        className="w-[72px] h-[72px] rounded-xl object-cover flex-shrink-0 border border-velvet/10" />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[0.95rem] leading-5 font-bold text-soft-white line-clamp-2">{lang === 'ar' ? item.product.name : item.product.nameEn}</h4>
                          <p className="text-rose-gold font-extrabold text-[1.05rem] mt-1">{item.product.price * item.quantity} {lang === 'ar' ? 'ج.م' : 'EGP'}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-9 h-9 rounded-lg bg-velvet/25 border border-velvet/20 flex items-center justify-center hover:bg-velvet/40 transition-colors active:scale-95">
                            <Minus className="w-4 h-4 text-soft-white" />
                          </button>
                          <span className="text-soft-white text-[0.95rem] font-bold w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-9 h-9 rounded-lg bg-velvet/25 border border-velvet/20 flex items-center justify-center hover:bg-velvet/40 transition-colors active:scale-95">
                            <Plus className="w-4 h-4 text-soft-white" />
                          </button>
                          <button onClick={() => removeFromCart(item.product.id)} className="mr-auto w-9 h-9 rounded-lg bg-deep-red/10 border border-deep-red/20 flex items-center justify-center hover:bg-deep-red/20 transition-colors active:scale-95">
                            <Trash2 className="w-4 h-4 text-rose-warm" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-velvet/20 space-y-3 bg-midnight/50">
                <div className="flex items-end justify-between">
                  <span className="text-soft-white/65 text-[0.95rem]">{lang === 'ar' ? 'المجموع' : 'Total'}</span>
                  <span className="text-[1.6rem] leading-none font-extrabold text-rose-gold">{total} {lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                </div>
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => { if (!user) { setShowLogin(true); } else { setShowCheckout(true); } setShowCart(false); }}
                  className="w-full min-h-[50px] py-3 bg-gradient-to-r from-velvet-dark via-velvet to-velvet-light rounded-2xl text-white font-extrabold text-[1rem] shadow-lg shadow-velvet/30 border border-velvet-light/20">
                  {lang === 'ar' ? 'إتمام الشراء' : 'Checkout'}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
