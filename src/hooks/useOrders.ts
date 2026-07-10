import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Order, User } from '../store/useStore';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveOrder = async (order: Order, user: User, discountCode?: string, discountAmount?: number) => {
    try {
      setLoading(true);

      // 1. احفظ أو جيب المستخدم
      let userId = null;
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('phone', user.phone)
        .single();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert({ name: user.name, phone: user.phone, age: user.age })
          .select('id')
          .single();
        if (userError) throw userError;
        userId = newUser.id;
      }

      // 2. احفظ الأوردر
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: order.id,
          user_id: userId,
          total: order.total,
          status: order.status,
          payment_method: order.paymentMethod,
          discount_code: discountCode || null,
          discount_amount: discountAmount || 0,
          date: order.date,
        });
      if (orderError) throw orderError;

      // 3. احفظ تفاصيل الأوردر
      const items = order.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(items);
      if (itemsError) throw itemsError;

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, order_items(*)`)
        .eq('id', orderId)
        .single();
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return { saveOrder, getOrder, loading, error };
};
