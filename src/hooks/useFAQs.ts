import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      setFaqs(data || []);
      setLoading(false);
    };
    fetchFAQs();
  }, []);

  return { faqs, loading };
};
