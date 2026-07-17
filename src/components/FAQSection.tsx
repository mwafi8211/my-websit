import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useFAQs } from '../hooks/useFAQs';

export default function FAQSection() {
  const { lang } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs } = useFAQs();
  return (
    <section className="fluid-section">
      <div className="fluid-wrap" style={{ maxWidth: 'min(96vw, 600px)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-[clamp(1rem,4vw,2.5rem)]">
          <div className="inline-flex items-center gap-[clamp(0.2rem,0.6vw,0.3rem)] bg-velvet/10 border border-velvet/20 rounded-full px-[clamp(0.5rem,1.8vw,0.9rem)] py-[clamp(0.2rem,0.6vw,0.3rem)] mb-[clamp(0.4rem,1.2vw,0.6rem)]">
            <HelpCircle className="w-[clamp(0.55rem,1.6vw,0.8rem)] h-[clamp(0.55rem,1.6vw,0.8rem)] text-velvet-light" />
            <span className="text-velvet-light text-[clamp(0.5rem,1.4vw,0.7rem)]">FAQ</span>
          </div>
          <h2 className="text-[clamp(1.4rem,5vw,2.5rem)] font-bold text-gradient font-heading">{lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.05 }} className="bg-midnight-light/35 rounded-2xl border border-velvet/10 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-right gap-3">
                <span className="text-[1.05rem] md:text-[1.1rem] font-semibold text-soft-white flex-1 text-right leading-relaxed">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }} className="flex-shrink-0 w-7 h-7 rounded-full bg-velvet/15 flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-velvet-light" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-soft-white/55 text-[0.96rem] md:text-[1rem] leading-relaxed pt-1 border-t border-velvet/10">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
