import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { damping: 25, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const move = (clientX: number, clientY: number) => {
      x.set(clientX);
      y.set(clientY);
    };
    const handleMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <div
        className="w-[clamp(150px,25vw,320px)] h-[clamp(150px,25vw,320px)] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,20,147,0.35) 0%, rgba(236,0,140,0.15) 40%, rgba(0,0,0,0) 70%)',
          mixBlendMode: 'screen',
          filter: 'blur(4px)',
        }}
      />
    </motion.div>
  );
}