import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";

export default function LuckyDrawWidget() {
  const { lang, cart, luckyDrawMinOrder, fetchLuckyDrawMinOrder } = useStore();

  useEffect(() => {
    fetchLuckyDrawMinOrder();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const remaining = Math.max(luckyDrawMinOrder - subtotal, 0);
  const percent = Math.min((subtotal / luckyDrawMinOrder) * 100, 100);
  const qualified = remaining <= 0;

  return (
    <div className="relative z-40 flex items-center gap-3 bg-gradient-to-r from-purple-700 to-pink-600 px-[clamp(0.8rem,3vw,1.5rem)] py-2 shadow-lg shadow-purple-700/30 w-full">
      <div className="relative w-[clamp(1.8rem,5vw,2.4rem)] h-[clamp(1.8rem,5vw,2.4rem)] flex-shrink-0 flex items-center justify-center">
        <span className="text-[clamp(1rem,3vw,1.3rem)]">🎁</span>
      </div>

      <div className="min-w-0 flex-1">
        <motion.p
          key={qualified ? "done" : remaining}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(0.65rem,1.8vw,0.85rem)] text-white font-bold leading-tight"
        >
          {qualified
            ? lang === "ar"
              ? "🎉 طلبك مؤهل للسحب!"
              : "🎉 You qualify!"
            : lang === "ar"
              ? `ناقصك ${remaining} ج.م للسحب`
              : `${remaining} EGP to enter`}
        </motion.p>
        <div className="w-full h-[clamp(0.3rem,0.8vw,0.4rem)] bg-black/25 rounded-full mt-1 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gray-300"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}