import { motion } from 'framer-motion';
import { Lock, Truck, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function TrustBadges() {
  const { lang } = useStore();
  const badges = [
    { icon: Lock, titleAr: 'خصوصية تامة', titleEn: 'Complete Privacy', descAr: 'تغليف سري 100%', descEn: '100% discreet' },
    { icon: Truck, titleAr: 'توصيل سريع', titleEn: 'Fast Delivery', descAr: '2-5 أيام عمل', descEn: '2-5 days' },
    { icon: Shield, titleAr: 'ضمان الجودة', titleEn: 'Quality Guarantee', descAr: 'منتجات أصلية', descEn: '100% authentic' },
  ];

  return (
    <section className="py-[clamp(1.2rem,4vw,2.5rem)] border-y border-velvet/10 bg-midnight-light/10">
      <div className="fluid-wrap">
        <div className="grid grid-cols-3 gap-[clamp(0.6rem,3vw,2rem)]">
          {badges.map((badge, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} whileHover={{ y: -3 }} className="text-center group">
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-[clamp(2.2rem,7vw,3.5rem)] h-[clamp(2.2rem,7vw,3.5rem)] rounded-[clamp(0.5rem,1.8vw,0.9rem)] bg-velvet/10 border border-velvet/20 flex items-center justify-center mx-auto mb-[clamp(0.4rem,1.2vw,0.6rem)] group-hover:bg-velvet/20 transition-colors">
                <badge.icon className="w-[clamp(0.9rem,3vw,1.4rem)] h-[clamp(0.9rem,3vw,1.4rem)] text-velvet-light" />
              </motion.div>
              <h4 className="text-[clamp(0.65rem,1.8vw,0.9rem)] font-bold text-soft-white mb-[clamp(0.1rem,0.4vw,0.2rem)]">{lang === 'ar' ? badge.titleAr : badge.titleEn}</h4>
              <p className="text-[clamp(0.5rem,1.4vw,0.7rem)] text-soft-white/40">{lang === 'ar' ? badge.descAr : badge.descEn}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
