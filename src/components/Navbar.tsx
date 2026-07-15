import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Globe, Package } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const {
    lang, setLang, cart, wishlist, user,
    setActivePage, activePage, searchQuery, setSearchQuery,
    setShowLogin, setShowCart, setShowOrderTracking, showCart
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: lang === 'ar' ? 'الرئيسية' : 'Home' },
    { id: 'products', label: lang === 'ar' ? 'المنتجات' : 'Products' },
    { id: 'contact', label: lang === 'ar' ? 'تواصل معنا' : 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="fluid-wrap">
        <div className="flex items-center justify-between h-[clamp(3rem,7vw,4.5rem)]">
          <motion.div
            className="flex items-center gap-[clamp(0.2rem,0.8vw,0.5rem)] cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.03 }}
            onClick={() => setActivePage('home')}
          >
            <span className="text-[clamp(1.2rem,3.5vw,1.8rem)]">💜</span>
            <h1 className="text-[clamp(0.75rem,2.2vw,1rem)] font-bold text-gradient font-heading leading-tight">
              {lang === 'ar' ? 'السعادة الزوجية' : 'Marital Happiness'}
            </h1>
          </motion.div>

          <div className="hidden min-[640px]:flex items-center gap-[clamp(1rem,3vw,2rem)]">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                className={`relative px-[clamp(0.5rem,1.5vw,1rem)] py-2 text-[clamp(0.75rem,1.8vw,0.95rem)] font-medium transition-all duration-300 ${
                  activePage === item.id ? 'text-rose-gold' : 'text-soft-white/70 hover:text-rose-gold'
                }`}
              >
                {item.label}
                {activePage === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-gold to-rose-pink rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[clamp(0.3rem,1.2vw,0.6rem)]">
            <button onClick={() => setShowSearch(!showSearch)} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 hover:text-rose-gold transition-colors">
              <Search className="w-[clamp(1.5rem,3.8vw,1.7rem)] h-[clamp(1.5rem,3.8vw,1.7rem)]" />
            </button>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 hover:text-rose-gold transition-colors">
              <Globe className="w-[clamp(1.5rem,3.8vw,1.7rem)] h-[clamp(1.5rem,3.8vw,1.7rem)]" />
            </button>
            <button onClick={() => setActivePage('wishlist')} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 hover:text-rose-pink transition-colors relative">
              <Heart className="w-[clamp(1.5rem,3.8vw,1.7rem)] h-[clamp(1.5rem,3.8vw,1.7rem)]" fill={wishlist.length > 0 ? '#f0a6ca' : 'none'} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 left-0 w-[clamp(1.2rem,2.8vw,1.4rem)] h-[clamp(1.2rem,2.8vw,1.4rem)] bg-rose-pink text-midnight text-[clamp(0.65rem,1.5vw,0.8rem)] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setShowOrderTracking(true)} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 hover:text-rose-gold transition-colors hidden min-[540px]:block">
              <Package className="w-[clamp(1.5rem,3.8vw,1.7rem)] h-[clamp(1.5rem,3.8vw,1.7rem)]" />
            </button>
            <button onClick={() => setShowCart(!showCart)} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 hover:text-rose-gold transition-colors relative">
              <ShoppingCart className="w-[clamp(1.5rem,3.8vw,1.7rem)] h-[clamp(1.5rem,3.8vw,1.7rem)]" />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-0 left-0 w-[clamp(1.2rem,2.8vw,1.4rem)] h-[clamp(1.2rem,2.8vw,1.4rem)] bg-velvet text-white text-[clamp(0.65rem,1.5vw,0.8rem)] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button onClick={() => user ? setActivePage('profile') : setShowLogin(true)} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 hover:text-rose-gold transition-colors">
              <User className="w-[clamp(1.5rem,3.8vw,1.7rem)] h-[clamp(1.5rem,3.8vw,1.7rem)]" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-[clamp(0.8rem,2vw,1rem)] text-soft-white/70 min-[640px]:hidden">
              {mobileMenuOpen ? <X className="w-[clamp(1.6rem,4.2vw,1.9rem)] h-[clamp(1.6rem,4.2vw,1.9rem)]" /> : <Menu className="w-[clamp(1.6rem,4.2vw,1.9rem)] h-[clamp(1.6rem,4.2vw,1.9rem)]" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-[clamp(0.4rem,1.5vw,0.6rem)]">
              <div className="relative">
                <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value) setActivePage('products'); }}
                  placeholder={lang === 'ar' ? 'ابحث عن منتج...' : 'Search...'}
                  className="w-full bg-midnight-light/50 border border-velvet/30 rounded-[clamp(0.4rem,1.5vw,0.7rem)] px-[clamp(0.6rem,2vw,0.9rem)] py-[clamp(0.4rem,1.5vw,0.55rem)] text-soft-white placeholder:text-soft-white/30 focus:outline-none focus:border-velvet text-[clamp(0.7rem,1.8vw,0.85rem)]" />
                <Search className="absolute top-1/2 -translate-y-1/2 left-[clamp(0.5rem,1.5vw,0.7rem)] text-velvet-light w-[clamp(0.8rem,2vw,0.9rem)] h-[clamp(0.8rem,2vw,0.9rem)]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden glass-effect border-t border-velvet/20 min-[640px]:hidden">
            <div className="fluid-wrap py-[clamp(0.5rem,2vw,1rem)] space-y-[clamp(0.2rem,0.8vw,0.4rem)]">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-right px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.7rem)] rounded-lg transition-colors text-[clamp(0.75rem,2vw,0.95rem)] ${
                    activePage === item.id ? 'bg-velvet/20 text-rose-gold' : 'text-soft-white/70 hover:bg-velvet/10'}`}>
                  {item.label}
                </button>
              ))}
              <button onClick={() => { setShowOrderTracking(true); setMobileMenuOpen(false); }}
                className="block w-full text-right px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.5rem,1.5vw,0.7rem)] rounded-lg text-soft-white/70 hover:bg-velvet/10 transition-colors text-[clamp(0.75rem,2vw,0.95rem)]">
                {lang === 'ar' ? '📦 تتبع الطلب' : '📦 Track Order'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}