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
    <div>
      <div className="grid grid-cols-3 gap-[clamp(0.8rem,3vw,2rem)]">
          {badges.map((badge, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} whileHover={{ y: -3 }}
              className="text-center group bg-velvet/5 border border-velvet/20 rounded-[clamp(0.8rem,2.5vw,1.2rem)] p-[clamp(0.8rem,3vw,1.5rem)] flex flex-col items-center justify-center">
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-[clamp(3.2rem,10vw,5rem)] h-[clamp(3.2rem,10vw,5rem)] rounded-[clamp(0.6rem,2vw,1rem)] bg-velvet/10 border border-velvet/20 flex items-center justify-center mx-auto mb-[clamp(0.5rem,1.5vw,0.8rem)] group-hover:bg-velvet/20 transition-colors">
                <badge.icon className="w-[clamp(1.5rem,4.5vw,2.2rem)] h-[clamp(1.5rem,4.5vw,2.2rem)] text-velvet-light" />
              </motion.div>
              <h4 className="text-[clamp(0.8rem,2.2vw,1.05rem)] font-bold text-soft-white mb-[clamp(0.15rem,0.5vw,0.25rem)]">{lang === 'ar' ? badge.titleAr : badge.titleEn}</h4>
              <p className="text-[clamp(0.6rem,1.7vw,0.8rem)] text-soft-white/40">{lang === 'ar' ? badge.descAr : badge.descEn}</p>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
