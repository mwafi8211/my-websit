import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedProducts from './components/FeaturedProducts';
import SpecialOffers from './components/SpecialOffers';
import TrustBadges from './components/TrustBadges';
import StatsSection from './components/StatsSection';
import NewsletterSection from './components/NewsletterSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import ContactPage from './components/ContactPage';
import WishlistPage from './components/WishlistPage';
import ProductDetail from './components/ProductDetail';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import LoginModal from './components/LoginModal';
import OrderTracking from './components/OrderTracking';
import FlyingHearts from './components/FlyingHearts';

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <CategoriesSection />
      <FeaturedProducts />
      <StatsSection />
      <SpecialOffers />
      <NewsletterSection />
      <FAQSection />
    </>
  );
}

function PageContent() {
  const { activePage } = useStore();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={activePage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
        {activePage === 'home' && <HomePage />}
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'wishlist' && <WishlistPage />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { activePage } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-midnight-dark text-soft-white font-body overflow-x-hidden" dir="rtl">
      <Navbar />
      <main>
        <PageContent />
      </main>
      <Footer />
      <CartSidebar />
      <ProductDetail />
      <CheckoutModal />
      <LoginModal />
      <OrderTracking />
      <FlyingHearts />

      <motion.a
        href="https://wa.me/201012345678" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-[clamp(0.6rem,2vw,1.5rem)] left-[clamp(0.6rem,2vw,1.5rem)] z-40 w-[clamp(2.8rem,8vw,3.5rem)] h-[clamp(2.8rem,8vw,3.5rem)] bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/30 hover:bg-green-500 transition-colors"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <svg viewBox="0 0 24 24" width="clamp(1.4rem,4vw,1.8rem)" height="clamp(1.4rem,4vw,1.8rem)" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
