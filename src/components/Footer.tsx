import { motion } from 'framer-motion';
import { Heart, Phone, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const { lang, setActivePage } = useStore();
  const { settings } = useSettings();

  return (
    <footer className="bg-midnight-dark border-t border-velvet/10">
      <div className="fluid-wrap py-[clamp(1.2rem,4vw,2.5rem)]">
        <div className="grid grid-cols-2 min-[640px]:grid-cols-3 gap-[clamp(1rem,3vw,2rem)]">
          <div className="col-span-2 min-[640px]:col-span-1">
            <div className="flex items-center gap-2 mb-2"><span className="text-xl">💜</span><h3 className="text-sm font-bold text-gradient font-heading">{lang === 'ar' ? 'السعادة الزوجية' : 'Marital Happiness'}</h3></div>
            <p className="text-soft-white/40 text-xs leading-relaxed">{lang === 'ar' ? 'مش مجرد منتجات... دي أول خطوة في ليلة مش هتتنسى' : "Not just products... It's the first step to an unforgettable night"}</p>
          </div>
          <div>
            <h4 className="text-rose-gold font-bold text-xs mb-2">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <div className="space-y-1">
              {[{ id: 'home', ar: 'الرئيسية', en: 'Home' }, { id: 'products', ar: 'المنتجات', en: 'Products' }, { id: 'contact', ar: 'تواصل معنا', en: 'Contact' }].map(link => (
                <button key={link.id} onClick={() => setActivePage(link.id)} className="block text-soft-white/40 text-xs hover:text-rose-gold transition-colors">{lang === 'ar' ? link.ar : link.en}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-rose-gold font-bold text-xs mb-2">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
            <div className="space-y-2">
              <a href={`tel:${settings.wallet_number}`} className="flex items-center gap-2 text-soft-white/40 text-xs hover:text-rose-gold transition-colors"><Phone className="w-3 h-3" /><span dir="ltr">{settings.wallet_number}</span></a>
              <a href={`https://wa.me/${settings.whatsapp_number}`} className="flex items-center gap-2 text-soft-white/40 text-xs hover:text-rose-gold transition-colors"><MessageCircle className="w-3 h-3" /><span>WhatsApp</span></a>
            </div>
          </div>
        </div>
        <div className="border-t border-velvet/10 mt-4 pt-4 flex flex-col min-[640px]:flex-row items-center justify-between gap-2">
          <p className="text-soft-white/20 text-[10px] text-center">© 2025 {lang === 'ar' ? 'السعادة الزوجية' : 'Marital Happiness'}</p>
          <motion.p className="text-soft-white/20 text-[10px] flex items-center gap-1" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
            {lang === 'ar' ? 'صنع بـ' : 'Made with'} <Heart className="w-2.5 h-2.5 text-rose-pink fill-rose-pink" />
          </motion.p>
        </div>
      </div>
    </footer>
  );
}