import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function NewsletterSection() {
  const { lang, setUser, user } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError(lang === 'ar' ? 'الاسم مطلوب' : 'Name required'); return; }
    if (!phone.trim() || phone.length < 10) { setError(lang === 'ar' ? 'رقم هاتف صحيح' : 'Valid phone required'); return; }
    if (!age || parseInt(age) < 18) { setError(lang === 'ar' ? 'يجب أن يكون العمر 18+' : 'Must be 18+'); return; }
    setUser({ name: name.trim(), phone: phone.trim(), age: parseInt(age) });
    setSubscribed(true);
    setName(''); setPhone(''); setAge('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  if (user) {
    return (
      <section className="fluid-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mx-auto" style={{ maxWidth: 'min(92vw, 440px)' }}>
          <div className="bg-gradient-to-br from-midnight-light/50 to-velvet-dark/30 rounded-3xl p-7 border border-velvet/20">
            <p className="text-[1.85rem] mb-3">💜</p>
            <h3 className="text-[1.25rem] font-bold text-gradient font-heading mb-2">
              {lang === 'ar' ? `مرحباً ${user.name}!` : `Welcome ${user.name}!`}
            </h3>
            <p className="text-soft-white/40 text-[0.92rem]">{lang === 'ar' ? 'استمتع بالتسوق!' : 'Enjoy shopping!'}</p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="fluid-section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mx-auto" style={{ maxWidth: 'min(92vw, 440px)' }}>
        <div className="bg-gradient-to-br from-midnight-light/50 to-velvet-dark/30 rounded-3xl p-7 border border-velvet/20 relative overflow-visible">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-velvet/15 rounded-full blur-3xl pointer-events-none" />

          {/* Emoji Icon - مع مسافة كافية تحته لمنع التداخل */}
          <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-velvet/25 border border-velvet/30 mx-auto mb-5 mt-1">
            <span className="text-[1.75rem] leading-none">🎁</span>
          </motion.div>

          <h3 className="text-[1.25rem] font-bold text-gradient font-heading mb-2">
            {lang === 'ar' ? 'سجل معنا!' : 'Register Now!'}
          </h3>
          <p className="text-soft-white/45 text-[0.9rem] mb-6 leading-relaxed">
            {lang === 'ar' ? 'سجل واستمتع بتجربة تسوق مميزة' : 'Register and enjoy shopping'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
            <div className="relative">
              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-velvet-light pointer-events-none" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === 'ar' ? 'اسمك...' : 'Name...'}
                className="w-full bg-midnight-dark/60 border border-velvet/20 rounded-xl pr-11 pl-4 py-3.5 text-soft-white placeholder:text-soft-white/25 focus:outline-none focus:border-velvet-light text-[0.95rem] transition-colors" />
            </div>
            <div className="relative">
              <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-velvet-light pointer-events-none" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" dir="ltr"
                className="w-full bg-midnight-dark/60 border border-velvet/20 rounded-xl pr-11 pl-4 py-3.5 text-soft-white placeholder:text-soft-white/25 focus:outline-none focus:border-velvet-light text-[0.95rem] text-right transition-colors" />
            </div>
            <div className="relative">
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-velvet-light pointer-events-none" />
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder={lang === 'ar' ? 'عمرك (18+)' : 'Age (18+)'} min="18"
                className="w-full bg-midnight-dark/60 border border-velvet/20 rounded-xl pr-11 pl-4 py-3.5 text-soft-white placeholder:text-soft-white/25 focus:outline-none focus:border-velvet-light text-[0.95rem] transition-colors" />
            </div>
            {error && <p className="text-rose-warm text-[0.85rem] pt-1">{error}</p>}
            <motion.button type="submit" whileTap={{ scale: 0.95 }}
              className="w-full py-3.5 bg-gradient-to-r from-velvet to-velvet-light rounded-xl text-white font-bold text-[1rem] shadow-lg shadow-velvet/30 mt-2">
              {lang === 'ar' ? '🚀 تسجيل' : '🚀 Register'}
            </motion.button>
          </form>

          {subscribed && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-velvet-light text-[0.92rem] mt-4">
              ✅ {lang === 'ar' ? 'تم التسجيل!' : 'Registered!'}
            </motion.p>
          )}
          <p className="text-soft-white/25 text-[0.7rem] mt-5 leading-relaxed">{lang === 'ar' ? 'بتسجيلك أنت توافق أنك فوق 18 سنة' : 'By registering you confirm you are 18+'}</p>
        </div>
      </motion.div>
    </section>
  );
}
