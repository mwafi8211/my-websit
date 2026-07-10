import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Send, MapPin, Clock, Mail } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useSettings } from '../hooks/useSettings';

export default function ContactPage() {
  const { lang } = useStore();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const { settings } = useSettings();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setFormData({ name: '', phone: '', message: '' }); };

  const contactInfo = [
    { icon: Phone, labelAr: 'اتصل بنا', labelEn: 'Call Us', value: settings.wallet_number, href: `tel:${settings.wallet_number}` },
    { icon: MessageCircle, labelAr: 'واتساب', labelEn: 'WhatsApp', value: settings.whatsapp_number, href: `https://wa.me/${settings.whatsapp_number}` },
    { icon: Mail, labelAr: 'البريد', labelEn: 'Email', value: 'info@marital.com', href: 'mailto:info@marital.com' },
  ];

  return (
    <section className="pt-[clamp(4rem,10vw,6.5rem)] pb-[clamp(2rem,5vw,4rem)]">
      <div className="fluid-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-[clamp(1.2rem,4vw,2.5rem)]">
          <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading mb-[clamp(0.3rem,1vw,0.5rem)]">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h2>
          <p className="text-soft-white/50 text-[clamp(0.65rem,1.8vw,0.85rem)]">{lang === 'ar' ? 'نحن هنا لمساعدتك!' : "We're here to help!"}</p>
        </motion.div>
        <div className="grid min-[768px]:grid-cols-2 gap-[clamp(1.2rem,4vw,2.5rem)]">
          <div className="space-y-[clamp(0.6rem,2vw,1.1rem)]">
            {contactInfo.map((info, index) => (
              <motion.a key={index} href={info.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-[clamp(0.6rem,2vw,0.9rem)] bg-midnight-light/30 rounded-[clamp(0.6rem,2vw,0.9rem)] p-[clamp(0.7rem,2.5vw,1.1rem)] border border-velvet/10 hover:border-velvet/30 transition-all group">
                <div className="w-[clamp(2.2rem,7vw,3.2rem)] h-[clamp(2.2rem,7vw,3.2rem)] rounded-[clamp(0.5rem,1.8vw,0.9rem)] bg-velvet/20 flex items-center justify-center group-hover:bg-velvet/40 transition-colors flex-shrink-0">
                  <info.icon className="w-[clamp(1rem,3.2vw,1.4rem)] h-[clamp(1rem,3.2vw,1.4rem)] text-velvet-light" />
                </div>
                <div><p className="text-[clamp(0.55rem,1.5vw,0.7rem)] text-soft-white/40">{lang === 'ar' ? info.labelAr : info.labelEn}</p><p className="text-soft-white font-bold text-[clamp(0.7rem,2vw,0.85rem)]" dir="ltr">{info.value}</p></div>
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-midnight-light/30 rounded-[clamp(0.6rem,2vw,0.9rem)] p-[clamp(0.7rem,2.5vw,1.1rem)] border border-velvet/10">
              <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-velvet-light" /><h3 className="text-sm font-bold text-rose-gold">{lang === 'ar' ? 'ساعات العمل' : 'Hours'}</h3></div>
              <div className="space-y-1 text-xs"><div className="flex justify-between"><span className="text-soft-white/50">{lang === 'ar' ? 'السبت - الخميس' : 'Sat - Thu'}</span><span className="text-soft-white">10 AM - 11 PM</span></div><div className="flex justify-between"><span className="text-soft-white/50">{lang === 'ar' ? 'الجمعة' : 'Friday'}</span><span className="text-soft-white">2 PM - 11 PM</span></div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-2 bg-midnight-light/30 rounded-xl p-[clamp(0.7rem,2.5vw,1.1rem)] border border-velvet/10">
              <MapPin className="w-5 h-5 text-velvet-light flex-shrink-0" /><p className="text-soft-white/60 text-xs">{lang === 'ar' ? 'نعمل أونلاين - التوصيل لجميع المحافظات 🇪🇬' : 'Online - Delivery all Egypt 🇪🇬'}</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="bg-midnight-light/20 rounded-2xl p-[clamp(0.8rem,3.5vw,1.8rem)] border border-velvet/10 space-y-4">
              <h3 className="text-lg font-bold text-rose-gold">{lang === 'ar' ? '✉️ أرسل رسالة' : '✉️ Send Message'}</h3>
              <div><label className="text-xs text-soft-white/60 block mb-1">{lang === 'ar' ? 'الاسم' : 'Name'}</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-midnight-dark/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm" /></div>
              <div><label className="text-xs text-soft-white/60 block mb-1">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required dir="ltr" className="w-full bg-midnight-dark/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm" /></div>
              <div><label className="text-xs text-soft-white/60 block mb-1">{lang === 'ar' ? 'رسالتك' : 'Message'}</label><textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} className="w-full bg-midnight-dark/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm resize-none" /></div>
              <motion.button type="submit" whileTap={{ scale: 0.98 }} className="w-full py-3 bg-gradient-to-r from-velvet to-velvet-light rounded-xl text-white font-bold shadow-lg shadow-velvet/30 flex items-center justify-center gap-2"><Send className="w-4 h-4" />{lang === 'ar' ? 'إرسال' : 'Send'}</motion.button>
              {sent && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-velvet-light text-sm text-center">✅ {lang === 'ar' ? 'تم إرسال رسالتك!' : 'Message sent!'}</motion.p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
