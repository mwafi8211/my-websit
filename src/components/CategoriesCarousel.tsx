import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCategories } from '../hooks/useCategories';

export default function CategoriesCarousel() {
  const { lang, setActivePage } = useStore();
  const { categories } = useCategories();
  const displayCategories = categories.filter(c => c.id !== 'all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 160;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="bg-midnight-light/20 border border-velvet/15 rounded-[clamp(1rem,3vw,1.5rem)] p-[clamp(0.8rem,2.5vw,1.3rem)]">
      <div className="flex items-center justify-between mb-[clamp(0.6rem,2vw,1rem)]">
        <h3 className="text-[clamp(0.9rem,2.4vw,1.15rem)] font-bold text-soft-white">
          {lang === 'ar' ? 'تصفح الأقسام' : 'Browse Categories'}
        </h3>
        <div className="flex gap-2">
          <button onClick={() => scroll('right')}
            className="w-[clamp(1.8rem,5vw,2.3rem)] h-[clamp(1.8rem,5vw,2.3rem)] rounded-full bg-velvet/20 border border-velvet/30 flex items-center justify-center hover:bg-velvet/40 transition-colors">
            <ChevronRight className="w-[1rem] h-[1rem] text-soft-white" />
          </button>
          <button onClick={() => scroll('left')}
            className="w-[clamp(1.8rem,5vw,2.3rem)] h-[clamp(1.8rem,5vw,2.3rem)] rounded-full bg-velvet/20 border border-velvet/30 flex items-center justify-center hover:bg-velvet/40 transition-colors">
            <ChevronLeft className="w-[1rem] h-[1rem] text-soft-white" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-[clamp(0.6rem,2vw,1rem)] overflow-x-auto scrollbar-hide pb-1">
        {displayCategories.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('products')}
            className="flex-shrink-0 w-[calc(33.333%-0.6rem)] flex flex-col items-center gap-2.5 bg-midnight-light/40 border border-velvet/10 hover:border-velvet-light/50 rounded-[clamp(0.9rem,2.8vw,1.3rem)] p-[clamp(1rem,3vw,1.4rem)] transition-all"
          >
            <span className="w-[clamp(3rem,9vw,3.8rem)] h-[clamp(3rem,9vw,3.8rem)] rounded-2xl bg-gradient-to-br from-velvet to-velvet-light flex items-center justify-center text-[clamp(1.5rem,4.2vw,1.9rem)] shadow-lg shadow-velvet/30">
              {cat.icon}
            </span>
            <span className="text-[clamp(0.78rem,2.2vw,0.92rem)] font-bold text-soft-white text-center leading-tight line-clamp-1">
              {lang === 'ar' ? cat.name : cat.nameEn}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}