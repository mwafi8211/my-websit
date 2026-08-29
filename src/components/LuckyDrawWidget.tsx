import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export default function LuckyDrawWidget() {
  const { lang, cart, luckyDrawMinOrder, fetchLuckyDrawMinOrder } = useStore();

  useEffect(() => { fetchLuckyDrawMinOrder(); }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remaining = luckyDrawMinOrder - subtotal;
  const qualified = remaining <= 0;

  return (
    <div className="fixed bottom-[clamp(0.6rem,2vw,1.5rem)] right-[clamp(0.6rem,2vw,1.5rem)] z-40 bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl px-4 py-2 shadow-lg shadow-purple-700/30">
      <p className="text-[clamp(0.65rem,1.8vw,0.8rem)] text-white font-bold text-center">
        {qualified
          ? (lang === 'ar' ? '🎁 طلبك مؤهل للسحب الشهري!' : '🎁 Your order qualifies for the lucky draw!')
          : (lang === 'ar' ? `🎁 ناقصك ${remaining} ج.م وتدخل السحب الشهري` : `🎁 ${remaining} EGP left to join the lucky draw`)}
      </p>
    </div>
  );
}