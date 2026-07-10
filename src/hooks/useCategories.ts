import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
}

// أيقونة افتراضية لو القسم مفيهوش عمود icon في الداتابيز
const defaultIcon = '🎀';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      const mapped: Category[] = [
        { id: 'all', name: 'الكل', nameEn: 'All', icon: '✨' },
        ...data.map((c: any) => ({
          id: c.name, // نستخدم الاسم كـ id عشان يفضل متوافق مع filter المنتجات (p.category)
          name: c.name,
          nameEn: c.name_en || '',
          icon: c.icon || defaultIcon,
        })),
      ];

      setCategories(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};
