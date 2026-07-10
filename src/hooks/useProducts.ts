import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../store/useStore';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name, name_en)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        nameEn: p.name_en || '',
        price: p.price,
        oldPrice: p.old_price,
        image: p.image,
        images: p.images || [],
        category: p.categories?.name || '',
        categoryEn: p.categories?.name_en || '',
        description: p.description || '',
        descriptionEn: p.description_en || '',
        isNew: p.is_new,
        isOffer: p.is_offer,
        discount: p.discount,
        rating: p.rating,
        stock: p.stock,
      }));

      setProducts(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};
