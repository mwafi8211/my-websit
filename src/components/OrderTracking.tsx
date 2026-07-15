import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, CheckCircle, Truck, MapPin, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

const statusSteps = [
  { key: 'ordered', labelAr: 'تم الطلب', labelEn: 'Ordered', icon: Clock },
  { key: 'confirmed', labelAr: 'تم التأكيد', labelEn: 'Confirmed', icon: CheckCircle },
  { key: 'shipped', labelAr: 'تم الشحن', labelEn: 'Shipped', icon: Truck },
  { key: 'delivered', labelAr: 'تم التسليم', labelEn: 'Delivered', icon: MapPin },
];

export default function OrderTracking() {
  const { lang, orders, showOrderTracking, setShowOrderTracking } = useStore();
  const [liveStatuses, setLiveStatuses] = useState<Record<string, string>>({});

useEffect(() => {
  if (!showOrderTracking || orders.length === 0) return;

  const fetchStatuses = async () => {
    const ids = orders.map(o => o.id);
    const { data } = await supabase
      .from('orders')
      .select('id, status')
      .in('id', ids);

    if (data) {
      const statusMap: Record<string, string> = {};
      data.forEach(row => { statusMap[row.id] = row.status; });
      setLiveStatuses(statusMap);
    }
  };

  fetchStatuses();
}, [showOrderTracking, orders]);
  const getStatusIndex = (status: string) => statusSteps.findIndex(s => s.key === status);

  return (
    <AnimatePresence>
      {showOrderTracking && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOrderTracking(false)} className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 sm:inset-8 md:inset-y-8 md:inset-x-auto md:w-[600px] z-50 bg-midnight-dark rounded-2xl border border-velvet/20 overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-rose-gold font-heading flex items-center gap-2"><Package size={22} />{lang === 'ar' ? 'تتبع الطلبات' : 'Track Orders'}</h3>
                <button onClick={() => setShowOrderTracking(false)} className="p-2 hover:bg-velvet/20 rounded-lg"><X size={20} className="text-soft-white/60" /></button>
              </div>
              {orders.length === 0 ? (
                <div className="text-center py-16"><p className="text-5xl mb-4">📦</p><p className="text-soft-white/40 text-lg">{lang === 'ar' ? 'لا توجد طلبات بعد' : 'No orders yet'}</p></div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => {
                    const currentStatus = liveStatuses[order.id] || order.status;
                    const currentIndex = getStatusIndex(currentStatus);
                    return (
                      <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-midnight-light/30 rounded-xl p-4 sm:p-6 border border-velvet/10">
                        <div className="flex items-center justify-between mb-4">
                          <div><p className="text-rose-gold font-bold">{order.id}</p><p className="text-soft-white/40 text-xs">{order.date}</p></div>
                          <p className="text-rose-gold font-bold">{order.total} {lang === 'ar' ? 'ج.م' : 'EGP'}</p>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                          {statusSteps.map((step, index) => {
                            const isCompleted = index <= currentIndex;
                            const isCurrent = index === currentIndex;
                            const StepIcon = step.icon;
                            return (
                              <div key={step.key} className="flex flex-col items-center relative flex-1">
                                {index > 0 && <div className={`absolute top-4 w-full h-0.5 ${index <= currentIndex ? 'bg-velvet' : 'bg-velvet/20'}`} style={{ right: '50%', transform: 'translateX(50%)' }} />}
                                <motion.div animate={isCurrent ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${isCompleted ? 'bg-velvet text-white' : 'bg-midnight-light border border-velvet/20 text-soft-white/30'}`}>
                                  <StepIcon size={14} />
                                </motion.div>
                                <p className={`text-[9px] sm:text-[10px] mt-2 text-center ${isCompleted ? 'text-velvet-light' : 'text-soft-white/30'}`}>{lang === 'ar' ? step.labelAr : step.labelEn}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.product.id} className="flex items-center gap-3 text-sm">
                              <img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-soft-white/60 flex-1 truncate">{lang === 'ar' ? item.product.name : item.product.nameEn}</span>
                              <span className="text-soft-white/40">×{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-velvet/10 flex items-center justify-between text-xs"><span className="text-soft-white/40">{order.paymentMethod}</span></div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
