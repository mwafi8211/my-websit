import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function LoginModal() {
  const { lang, showLogin, setShowLogin, setUser } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = lang === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    if (!phone.trim() || phone.length < 10) newErrors.phone = lang === 'ar' ? 'رقم هاتف صحيح مطلوب' : 'Valid phone number required';
    if (!age || parseInt(age) < 18) newErrors.age = lang === 'ar' ? 'يجب أن يكون العمر 18 سنة أو أكثر' : 'Must be 18 or older';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setUser({ name: name.trim(), phone: phone.trim(), age: parseInt(age) });
    setShowLogin(false);
    setName(''); setPhone(''); setAge(''); setErrors({});
  };

  return (
    <AnimatePresence>
      {showLogin && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogin(false)} className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[440px] z-50 bg-midnight-dark rounded-2xl border border-velvet/20 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-rose-gold font-heading">{lang === 'ar' ? '💜 تسجيل الدخول' : '💜 Sign In'}</h3>
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-velvet/20 rounded-lg"><X size={20} className="text-soft-white/60" /></button>
            </div>
            <p className="text-soft-white/40 text-sm mb-6">{lang === 'ar' ? 'سجل دخولك للاستمتاع بتجربة تسوق مميزة' : 'Sign in to enjoy a unique shopping experience'}</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-soft-white/60 flex items-center gap-2 mb-1.5"><User size={14} />{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === 'ar' ? 'ادخل اسمك...' : 'Your name...'}
                  className="w-full bg-midnight-light/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm" />
                {errors.name && <p className="text-rose-warm text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-soft-white/60 flex items-center gap-2 mb-1.5"><Phone size={14} />{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" dir="ltr"
                  className="w-full bg-midnight-light/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm" />
                {errors.phone && <p className="text-rose-warm text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm text-soft-white/60 flex items-center gap-2 mb-1.5"><Calendar size={14} />{lang === 'ar' ? 'العمر' : 'Age'}</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder={lang === 'ar' ? 'عمرك...' : 'Age...'} min="18" dir="ltr"
                  className="w-full bg-midnight-light/50 border border-velvet/20 rounded-xl px-4 py-3 text-soft-white placeholder:text-soft-white/20 focus:outline-none focus:border-velvet text-sm" />
                {errors.age && <p className="text-rose-warm text-xs mt-1">{errors.age}</p>}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-velvet to-velvet-light rounded-xl text-white font-bold text-lg shadow-lg shadow-velvet/30 mt-2">
                {lang === 'ar' ? '🚀 دخول' : '🚀 Sign In'}
              </motion.button>
              <p className="text-soft-white/20 text-[10px] text-center mt-2">{lang === 'ar' ? 'بتسجيل دخولك أنت توافق أنك فوق 18 سنة' : 'By signing in you confirm you are 18+'}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
