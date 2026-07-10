import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Settings {
  store_name: string;
  wallet_number: string;
  whatsapp_number: string;
  free_shipping_threshold: number;
  default_shipping_cost: number;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    store_name: 'السعادة الزوجية',
    wallet_number: '01012345678',
    whatsapp_number: '201012345678',
    free_shipping_threshold: 500,
    default_shipping_cost: 50,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value');

        if (error) throw error;

        const mapped: any = {};
        data.forEach((s: any) => {
          mapped[s.key] = s.key.includes('threshold') || s.key.includes('cost')
            ? Number(s.value)
            : s.value;
        });

        setSettings(prev => ({ ...prev, ...mapped }));
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
