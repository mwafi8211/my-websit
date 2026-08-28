import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function HeartShippingProgress() {
  const { lang, cart, freeShippingThreshold, fetchFreeShippingThreshold } = useStore();

  useEffect(() => { fetchFreeShippingThreshold(); }, []);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remaining = Math.max(freeShippingThreshold - total, 0);
  const percent = Math.min((total / freeShippingThreshold) * 100, 100);
  const isComplete = total >= freeShippingThreshold;

  return (
    <div className="px-[clamp(0.7rem,2.5vw,1.1rem)] pt-3 pb-1">
      <div className="flex items-center gap-3 bg-midnight-light/40 border border-velvet/15 rounded-2xl p-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <clipPath id="heartClip">
                <path d="M12 21s-6.7-4.35-9.3-8.1C.9 10.2 1.4 6.8 4.2 5.1c2.4-1.45 5.1-.6 6.8 1.4 1.7-2 4.4-2.85 6.8-1.4 2.8 1.7 3.3 5.1 1.5 7.8C18.7 16.65 12 21 12 21z" />
              </clipPath>
            </defs>
            {/* outline heart */}
            <path
              d="M12 21s-6.7-4.35-9.3-8.1C.9 10.2 1.4 6.8 4.2 5.1c2.4-1.45 5.1-.6 6.8 1.4 1.7-2 4.4-2.85 6.8-1.4 2.8 1.7 3.3 5.1 1.5 7.8C18.7 16.65 12 21 12 21z"
              fill="none"
              stroke="#FF1493"
              strokeWidth="0.8"
              opacity="0.35"
            />
            {/* filled portion, clipped to heart shape, animates height from bottom */}
            <g clipPath="url(#heartClip)">
              <motion.rect
                x="0"
                width="24"
                fill="url(#heartGradient)"
                initial={{ height: 0, y: 24 }}
                animate={{ height: `${percent}%`, y: 24 - (24 * percent) / 100 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </g>
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#EC008C" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
          </svg>
          {isComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,20,147,0.8))' }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-[0.8rem] font-bold leading-tight ${isComplete ? 'text-velvet-light' : 'text-soft-white/75'}`}>
            {isComplete
              ? (lang === 'ar' ? '🎉 قلبك اكتمل! شحن مجاني' : '🎉 Heart complete! Free shipping')
              : (lang === 'ar' ? `لسه ${remaining}ج وقلبك اكتمل` : `${remaining} EGP left to fill your heart`)}
          </p>
          <div className="w-full h-1.5 bg-midnight-dark/60 rounded-full mt-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #EC008C, #FF1493)' }}
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}