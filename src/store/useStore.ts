import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  isNew?: boolean;
  isOffer?: boolean;
  discount?: number;
  rating: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'ordered' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  paymentMethod: string;
  governorate?: string;
  address?: string;
}

export interface User {
  name: string;
  phone: string;
  age: number;
}

interface FlyingHeart {
  id: number;
  x: number;
  y: number;
}

interface StoreState {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  orders: Order[];
  addOrder: (order: Order) => void;
  discountCode: string;
  discountPercentage: number;
  applyDiscount: (code: string) => Promise<boolean>;
  clearDiscount: () => void;
  flyingHearts: FlyingHeart[];
  addFlyingHeart: (x: number, y: number) => void;
  removeFlyingHeart: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  showOrderTracking: boolean;
  setShowOrderTracking: (show: boolean) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

// رابط الـ Google Apps Script بتاع شيت أوردرات المحافظات
const GOVERNORATES_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxo5c8MmQFM3qcpdt-268XqTfXQ2zKTW0wHq77AyFLesr2clj2G1AXzhfxw2-EVOszm0Q/exec';

// المحافظات اللي مش هتتبعت للشيت
const EXCLUDED_GOVERNORATES = ['القاهرة', 'الجيزة'];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      lang: 'ar',
      setLang: (lang) => set({ lang }),

      user: null,
      setUser: (user) => set({ user }),

      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find(item => item.product.id === product.id);
        if (existing) {
          set({ cart: cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => set({ cart: get().cart.filter(item => item.product.id !== productId) }),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ cart: get().cart.filter(item => item.product.id !== productId) });
        } else {
          set({ cart: get().cart.map(item => item.product.id === productId ? { ...item, quantity } : item) });
        }
      },
      clearCart: () => set({ cart: [] }),

      wishlist: [],
      addToWishlist: (product) => {
        const wishlist = get().wishlist;
        if (!wishlist.find(item => item.product.id === product.id)) {
          set({ wishlist: [...wishlist, { product }] });
        }
      },
      removeFromWishlist: (productId) => set({ wishlist: get().wishlist.filter(item => item.product.id !== productId) }),
      isInWishlist: (productId) => get().wishlist.some(item => item.product.id === productId),

      orders: [],
      addOrder: async (order) => {
        set({ orders: [...get().orders, order] });

        // حفظ الأوردر في Supabase
        const user = get().user;
        if (!user) return;

        try {
          // جيب أو أنشئ المستخدم
          let userId = null;
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('phone', user.phone)
            .single();

          if (existingUser) {
            userId = existingUser.id;
          } else {
            const { data: newUser } = await supabase
              .from('users')
              .insert({ name: user.name, phone: user.phone, age: user.age })
              .select('id')
              .single();
            userId = newUser?.id;
          }

          // حفظ الأوردر
          await supabase.from('orders').insert({
            id: order.id,
            user_id: userId,
            total: order.total,
            status: order.status,
            payment_method: order.paymentMethod,
            date: new Date().toISOString(),
          });

          // حفظ تفاصيل الأوردر
          const items = order.items.map(item => ({
            order_id: order.id,
            product_id: item.product.id,
            product_name: item.product.name,
            product_image: item.product.image,
            quantity: item.quantity,
            price: item.product.price,
          }));

          await supabase.from('order_items').insert(items);
        } catch (err) {
          console.error('Error saving order:', err);
        }

        // بعت الأوردر لشيت المحافظات لو الأوردر من محافظة غير القاهرة والجيزة
        try {
          if (order.governorate && !EXCLUDED_GOVERNORATES.includes(order.governorate)) {
            const productsList = order.items
              .map(item => `${item.product.name} x${item.quantity}`)
              .join(', ');

            await fetch(GOVERNORATES_SHEET_URL, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'text/plain' },
              body: JSON.stringify({
                name: user.name,
                phone: user.phone,
                governorate: order.governorate,
                address: order.address || '',
                products: productsList,
                total: order.total,
              }),
            });
          }
        } catch (err) {
          console.error('Error sending order to Google Sheet:', err);
        }
      },

      discountCode: '',
      discountPercentage: 0,
      applyDiscount: async (code) => {
        const upper = code.toUpperCase();

        // جيب الكود من Supabase
        const { data } = await supabase
          .from('discount_codes')
          .select('percentage')
          .eq('code', upper)
          .eq('is_active', true)
          .single();

        if (data) {
          set({ discountCode: upper, discountPercentage: data.percentage });
          return true;
        }
        return false;
      },
      clearDiscount: () => set({ discountCode: '', discountPercentage: 0 }),

      flyingHearts: [],
      addFlyingHeart: (x, y) => {
        const id = Date.now() + Math.random();
        set({ flyingHearts: [...get().flyingHearts, { id, x, y }] });
        setTimeout(() => {
          set({ flyingHearts: get().flyingHearts.filter(h => h.id !== id) });
        }, 1000);
      },
      removeFlyingHeart: (id) => set({ flyingHearts: get().flyingHearts.filter(h => h.id !== id) }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      activePage: 'home',
      setActivePage: (page) => set({ activePage: page }),

      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),

      showCheckout: false,
      setShowCheckout: (show) => set({ showCheckout: show }),

      showLogin: false,
      setShowLogin: (show) => set({ showLogin: show }),

      showOrderTracking: false,
      setShowOrderTracking: (show) => set({ showOrderTracking: show }),

      showCart: false,
      setShowCart: (show) => set({ showCart: show }),
    }),
    {
      name: 'saada-store', // اسم الـ key في localStorage
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        lang: state.lang,
      }),
    }
  )
);
