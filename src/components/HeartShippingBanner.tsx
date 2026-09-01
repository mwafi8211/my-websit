import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function HeartShippingBanner() {
  const { lang, cart, freeShippingThreshold, fetchFreeShippingThreshold } = useStore();

  useEffect(() => { fetchFreeShippingThreshold(); }, []);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remaining = Math.max(freeShippingThreshold - total, 0);
  const percent = Math.min((total / freeShippingThreshold) * 100, 100);
  const isComplete = total >= freeShippingThreshold;

  return (
    <div className="w-full bg-midnight-light/60 border-b border-velvet/15 backdrop-blur-sm">
      <div className="px-[clamp(0.8rem,3vw,1.3rem)] py-[clamp(0.6rem,2vw,0.9rem)]">
        <div className="flex items-center gap-[clamp(0.7rem,2.5vw,1.3rem)]">
          <div className="relative w-[clamp(2.4rem,6.5vw,3.1rem)] h-[clamp(2.4rem,6.5vw,3.1rem)] flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <clipPath id="heartClipBanner">
                  <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.2 1.4 6.8 4.2 5.1c2.4-1.45 5.1-.6 6.8 1.4 1.7-2 4.4-2.85 6.8-1.4 2.8 1.7 3.3 5.1 1.5 7.8C18.7 16.65 12 21 12 21z" />
                </clipPath>
                <linearGradient id="heartGradientBanner" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#EC008C" />
                  <stop offset="100%" stopColor="#FF1493" />
                </linearGradient>
              </defs>
              <path
                d="M12 21s-6.7-4.35-9.3-8.1C.9 10.2 1.4 6.8 4.2 5.1c2.4-1.45 5.1-.6 6.8 1.4 1.7-2 4.4-2.85 6.8-1.4 2.8 1.7 3.3 5.1 1.5 7.8C18.7 16.65 12 21 12 21z"
                fill="none" stroke="#FF1493" strokeWidth="1" opacity="0.35"
              />
              <g clipPath="url(#heartClipBanner)">
                <motion.rect
                  x="0" width="24" fill="url(#heartGradientBanner)"
                  initial={{ height: 0, y: 24 }}
                  animate={{ height: `${percent}%`, y: 24 - (24 * percent) / 100 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </g>
            </svg>
            {isComplete && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full" style={{ filter: 'drop-shadow(0 0 10px rgba(255,20,147,0.9))' }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <motion.p
              key={isComplete ? 'done' : remaining}
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className={`text-[clamp(0.68rem,1.9vw,0.85rem)] font-extrabold leading-tight ${isComplete ? 'text-velvet-light' : 'text-soft-white'}`}
            >
              {isComplete
                ? (lang === 'ar' ? '💖 قلبك اكتمل والشحن بقى علينا!' : '💖 Your heart is full — shipping is on us!')
                : (lang === 'ar' ? `لسه ${remaining}ج وقلبك يكتمل والشحن يبقى علينا` : `${remaining} EGP left to complete your heart & get free shipping`)}
            </motion.p>
            <div className="w-full h-[clamp(0.3rem,0.8vw,0.4rem)] bg-midnight-dark/60 rounded-full mt-[clamp(0.25rem,0.8vw,0.35rem)] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #EC008C, #FF1493)', boxShadow: '0 0 8px rgba(255,20,147,0.6)' }}
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}