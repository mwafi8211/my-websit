import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Wallet, CheckCircle, Tag, Upload, Copy, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useSettings } from '../hooks/useSettings';

const egyptGovernorates = [
  { ar: 'القاهرة', en: 'Cairo' }, { ar: 'الجيزة', en: 'Giza' }, { ar: 'الإسكندرية', en: 'Alexandria' },
  { ar: 'الدقهلية', en: 'Dakahlia' }, { ar: 'البحيرة', en: 'Beheira' }, { ar: 'الغربية', en: 'Gharbia' },
  { ar: 'الإسماعيلية', en: 'Ismailia' }, { ar: 'المنوفية', en: 'Menofia' }, { ar: 'القليوبية', en: 'Qalyubia' },
  { ar: 'السويس', en: 'Suez' }, { ar: 'أسوان', en: 'Aswan' }, { ar: 'بورسعيد', en: 'Port Said' },
  { ar: 'الشرقية', en: 'Sharkia' }, { ar: 'كفر الشيخ', en: 'Kafr El Sheikh' }, { ar: 'الأقصر', en: 'Luxor' },
  { ar: 'سوهاج', en: 'Sohag' }, { ar: 'المنيا', en: 'Minya' }, { ar: 'الفيوم', en: 'Fayoum' },
];

export default function CheckoutModal() {
  const { lang, cart, showCheckout, setShowCheckout, user, discountCode, discountPercentage, applyDiscount, clearDiscount, clearCart, addOrder } = useStore();
  const { settings } = useSettings();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'wallet'>('cod');
  const [address, setAddress] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [transferImage, setTransferImage] = useState<string | null>(null);
  const [transferImageFile, setTransferImageFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const hasFreeShippingItem = cart.some(item => item.product.free_shipping);
  const shipping = (hasFreeShippingItem || subtotal > settings.free_shipping_threshold) ? 0 : settings.default_shipping_cost;
  const total = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => { const success = applyDiscount(couponInput); if (!success) setCouponError(lang === 'ar' ? 'كود خصم غير صالح' : 'Invalid discount code'); else setCouponError(''); };
  const handleCopyNumber = () => { navigator.clipboard.writeText(settings.wallet_number); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { setTransferImageFile(file); const reader = new FileReader(); reader.onloadend = () => setTransferImage(reader.result as string); reader.readAsDataURL(file); } };

  const handlePlaceOrder = () => {
    if (!address || !governorate) return;
    if (paymentMethod === 'wallet' && !transferImage) return;
    const id = 'ORD-' + Date.now().toString(36).toUpperCase();
    setOrderId(id);
    addOrder(
      { id, items: [...cart], total, status: 'ordered', date: new Date().toLocaleDateString('ar-EG'), paymentMethod: paymentMethod === 'cod' ? (lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery') : (lang === 'ar' ? 'محفظة إلكترونية' : 'E-Wallet'), governorate, address },
      paymentMethod === 'wallet' ? transferImageFile ?? undefined : undefined
    );
    clearCart(); clearDiscount(); setOrderPlaced(true);
  };

  const handleClose = () => { setShowCheckout(false); setOrderPlaced(false); setOrderId(''); setAddress(''); setGovernorate(''); setCouponInput(''); setCouponError(''); setTransferImage(null); setTransferImageFile(null); };
  const canPlaceOrder = address && governorate && (paymentMethod === 'cod' || (paymentMethod === 'wallet' && transferImage));

  return (
    <AnimatePresence>
      {showCheckout && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-[clamp(0.5rem,2vw,1rem)] z-50 bg-midnight-dark rounded-[clamp(0.8rem,2.5vw,1.5rem)] border border-velvet/20 overflow-y-auto"
            style={{ maxWidth: 'min(96vw, 550px)', margin: 'auto', maxHeight: '95vh' }}>
            <div className="p-[clamp(1rem,4vw,2rem)]">
              <div className="flex items-center justify-between mb-[clamp(1rem,3vw,1.5rem)]">
                <h3 className="text-[clamp(1.1rem,3.5vw,1.5rem)] font-bold text-rose-gold font-heading">
                  {orderPlaced ? (lang === 'ar' ? '✅ تم الطلب بنجاح' : '✅ Order Placed!') : (lang === 'ar' ? '💳 إتمام الشراء' : '💳 Checkout')}
                </h3>
                <button onClick={handleClose} className="p-[clamp(0.3rem,1vw,0.5rem)] hover:bg-velvet/20 rounded-lg">
                  <X className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] text-soft-white/60" />
                </button>
              </div>

              {orderPlaced ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-[clamp(1.5rem,5vw,2.5rem)]">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                    className="w-[clamp(4rem,12vw,6rem)] h-[clamp(4rem,12vw,6rem)] bg-velvet/20 rounded-full flex items-center justify-center mx-auto mb-[clamp(1rem,3vw,1.5rem)]">
                    <CheckCircle className="w-[clamp(2rem,6vw,2.5rem)] h-[clamp(2rem,6vw,2.5rem)] text-velvet-light" />
                  </motion.div>
                  <h4 className="text-[clamp(1rem,3vw,1.5rem)] font-bold text-soft-white mb-2">{lang === 'ar' ? 'شكراً لطلبك!' : 'Thank you!'}</h4>
                  <p className="text-soft-white/50 text-[clamp(0.75rem,2vw,0.9rem)] mb-2">{lang === 'ar' ? 'رقم الطلب' : 'Order ID'}: <span className="text-rose-gold font-bold">{orderId}</span></p>
                  <p className="text-soft-white/60 text-[clamp(0.7rem,2vw,0.85rem)] bg-midnight-light/30 rounded-xl p-4 mt-4">{lang === 'ar' ? `مرحباً ${user?.name}، تم تأكيد الأوردر يا فندم 🔥
مدة التوصيل من 3 لـ 4 أيام عمل 🚚💗

وسيتم التواصل مع حضرتك بمكالمة تليفون قبل الوصول للتسليم 📞

الأوردر بيتم توصيله مغلف بشكل كامل لضمان الخصوصية التامة ✨
ومتاح المعاينة قبل الاستلام، وفي حالة الاسترجاع يتم دفع مصاريف الشحن فقط للمندوب.` : `Hello ${user?.name}! Your order is on the way 💜`}</p>
                </motion.div>
              ) : (
                <div className="space-y-[clamp(0.75rem,2.5vw,1.25rem)]">
                  <div className="bg-midnight-light/30 rounded-xl p-[clamp(0.6rem,2vw,1rem)] border border-velvet/10">
                    <p className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-soft-white/60 mb-1">{lang === 'ar' ? 'الاسم' : 'Name'}: <span className="text-soft-white font-bold">{user?.name}</span></p>
                    <p className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-soft-white/60">{lang === 'ar' ? 'الهاتف' : 'Phone'}: <span className="text-soft-white font-bold" dir="ltr">{user?.phone}</span></p>
                  </div>

                  <div>
                    <label className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-soft-white/70 block mb-2">🏛️ {lang === 'ar' ? 'المحافظة' : 'Governorate'}</label>
                    <select value={governorate} onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full bg-midnight-light/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white focus:outline-none focus:border-velvet text-[clamp(0.7rem,2vw,0.85rem)]">
                      <option value="" className="bg-midnight-dark">{lang === 'ar' ? 'اختر المحافظة...' : 'Select...'}</option>
                      {egyptGovernorates.map((gov, i) => <option key={i} value={gov.ar} className="bg-midnight-dark">{lang === 'ar' ? gov.ar : gov.en}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-soft-white/70 block mb-2">📍 {lang === 'ar' ? 'العنوان التفصيلي' : 'Address'}</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder={lang === 'ar' ? 'الشارع، المنطقة...' : 'Street, area...'}
                      className="w-full bg-midnight-light/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-[clamp(0.7rem,2vw,0.85rem)] resize-none h-20" />
                  </div>

                  <div>
                    <label className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-soft-white/70 block mb-2">💰 {lang === 'ar' ? 'طريقة الدفع' : 'Payment'}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-xl border transition-all text-center ${paymentMethod === 'cod' ? 'border-velvet bg-velvet/10 text-rose-gold' : 'border-velvet/10 text-soft-white/50'}`}>
                        <Truck className="mx-auto mb-2 w-5 h-5" /><p className="text-[clamp(0.6rem,1.7vw,0.8rem)] font-medium">{lang === 'ar' ? 'عند الاستلام' : 'COD'}</p>
                      </button>
                      <button onClick={() => setPaymentMethod('wallet')} className={`p-4 rounded-xl border transition-all text-center ${paymentMethod === 'wallet' ? 'border-velvet bg-velvet/10 text-rose-gold' : 'border-velvet/10 text-soft-white/50'}`}>
                        <Wallet className="mx-auto mb-2 w-5 h-5" /><p className="text-[clamp(0.6rem,1.7vw,0.8rem)] font-medium">{lang === 'ar' ? 'محفظة' : 'E-Wallet'}</p>
                      </button>
                    </div>
                    {paymentMethod === 'wallet' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 space-y-3">
                        <div className="bg-velvet/10 border border-velvet/30 rounded-xl p-4">
                          <p className="text-xs text-soft-white/60 mb-2">{lang === 'ar' ? '📱 حوّل على الرقم ده:' : '📱 Transfer to:'}</p>
                          <div className="flex items-center justify-between bg-midnight-dark/50 rounded-lg p-3">
                            <span className="text-lg font-bold text-rose-gold" dir="ltr">{settings.wallet_number}</span>
                            <button onClick={handleCopyNumber} className="p-2 bg-velvet/20 rounded-lg hover:bg-velvet/40 transition-colors">
                              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-velvet-light" />}
                            </button>
                          </div>
                        </div>
                        <label className="block cursor-pointer">
                          <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${transferImage ? 'border-green-500/50' : 'border-velvet/30'}`}>
                            {transferImage ? (
                              <div><img src={transferImage} alt="" className="max-h-24 mx-auto rounded-lg" /><p className="text-xs text-green-400 mt-2">✅ {lang === 'ar' ? 'الصورة اترفعت هنراجع عليها ونأكد الأوردر' : 'Uploaded'}</p></div>
                            ) : (
                              <div><Upload className="mx-auto mb-2 w-6 h-6 text-velvet-light" /><p className="text-sm text-soft-white/60">{lang === 'ar' ? 'ارفع صورة التحويل' : 'Upload screenshot'}</p></div>
                            )}
                          </div>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-soft-white/70 flex items-center gap-1 mb-2"><Tag className="w-3.5 h-3.5" />{lang === 'ar' ? 'كود الخصم' : 'Discount'}</label>
                    <div className="flex gap-2">
                      <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder={lang === 'ar' ? 'كود الخصم...' : 'Code...'} dir="ltr"
                        className="flex-1 bg-midnight-light/50 border border-velvet/20 rounded-xl px-4 py-2 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm" />
                      <button onClick={handleApplyCoupon} className="px-4 bg-velvet/30 border border-velvet/50 rounded-xl text-velvet-light text-sm font-medium hover:bg-velvet/50 transition-colors">{lang === 'ar' ? 'تطبيق' : 'Apply'}</button>
                    </div>
                    {couponError && <p className="text-rose-warm text-xs mt-1">{couponError}</p>}
                    {discountCode && <p className="text-velvet-light text-xs mt-1">✅ {lang === 'ar' ? `خصم ${discountPercentage}%` : `${discountPercentage}% off`}</p>}
                  </div>

                  <div className="bg-midnight-light/30 rounded-xl p-4 space-y-2 border border-velvet/10">
                    <h4 className="text-sm font-bold text-soft-white/70">{lang === 'ar' ? 'ملخص الطلب' : 'Summary'}</h4>
                    {cart.map(item => (
                      <div key={item.product.id} className="flex justify-between text-xs">
                        <span className="text-soft-white/50 truncate flex-1">{lang === 'ar' ? item.product.name : item.product.nameEn} × {item.quantity}</span>
                        <span className="text-soft-white mr-2">{item.product.price * item.quantity} {lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                      </div>
                    ))}
                    <div className="border-t border-velvet/10 pt-2 space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-soft-white/50">{lang === 'ar' ? 'المجموع' : 'Subtotal'}</span><span className="text-soft-white">{subtotal} {lang === 'ar' ? 'ج.م' : 'EGP'}</span></div>
                      {discountAmount > 0 && <div className="flex justify-between text-xs"><span className="text-velvet-light">{lang === 'ar' ? 'الخصم' : 'Discount'}</span><span className="text-velvet-light">-{discountAmount} {lang === 'ar' ? 'ج.م' : 'EGP'}</span></div>}
                      <div className="flex justify-between text-xs"><span className="text-soft-white/50">{lang === 'ar' ? 'الشحن' : 'Shipping'}</span><span className={shipping === 0 ? 'text-velvet-light' : 'text-soft-white'}>{shipping === 0 ? (lang === 'ar' ? 'مجاني' : 'Free') : `${shipping} ${lang === 'ar' ? 'ج.م' : 'EGP'}`}</span></div>
                      <div className="flex justify-between text-lg font-bold border-t border-velvet/10 pt-2"><span className="text-soft-white">{lang === 'ar' ? 'الإجمالي' : 'Total'}</span><span className="text-rose-gold">{total} {lang === 'ar' ? 'ج.م' : 'EGP'}</span></div>
                    </div>
                  </div>

                  <motion.button whileTap={{ scale: 0.98 }} onClick={handlePlaceOrder} disabled={!canPlaceOrder}
                    className="w-full py-3 bg-gradient-to-r from-velvet to-velvet-light rounded-xl text-white font-bold text-lg shadow-lg shadow-velvet/30 disabled:opacity-50 disabled:cursor-not-allowed">
                    {lang === 'ar' ? '✨ تأكيد الطلب' : '✨ Place Order'}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}