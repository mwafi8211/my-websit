import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function FlyingHearts() {
  const { flyingHearts } = useStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {flyingHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ x: heart.x, y: heart.y, scale: 1, opacity: 1 }}
            animate={{ x: heart.x - 80 + Math.random() * 60, y: heart.y - 180, scale: 0.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="fixed text-rose-pink text-xl"
            style={{ left: 0, top: 0 }}
          >
            💜
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
