import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function StatsSection() {
  const { lang } = useStore();
  const stats = [
    { value: '10K+', labelAr: 'عميل سعيد', labelEn: 'Customers', icon: '😍' },
    { value: '500+', labelAr: 'منتج', labelEn: 'Products', icon: '🎁' },
    { value: '99%', labelAr: 'رضا', labelEn: 'Satisfaction', icon: '⭐' },
    { value: '24/7', labelAr: 'دعم', labelEn: 'Support', icon: '💬' },
  ];

  return (
    <section className="py-[clamp(1.2rem,4vw,2.5rem)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-velvet-dark/20 via-deep-red/10 to-velvet-dark/20" />
      <div className="fluid-wrap relative z-10">
        <div className="grid grid-cols-4 gap-[clamp(0.4rem,2vw,1.5rem)]">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} className="text-center">
              <span className="text-[clamp(1.1rem,3.5vw,1.8rem)] block mb-[clamp(0.1rem,0.4vw,0.2rem)]">{stat.icon}</span>
              <p className="text-[clamp(0.9rem,3.5vw,1.8rem)] font-bold text-gradient font-heading">{stat.value}</p>
              <p className="text-soft-white/40 text-[clamp(0.45rem,1.3vw,0.65rem)] mt-[clamp(0.05rem,0.2vw,0.1rem)]">{lang === 'ar' ? stat.labelAr : stat.labelEn}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
