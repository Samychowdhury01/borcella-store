export const getOrders = async (customerId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`
  );
  const orders = await res.json();

  if (!orders.success) {
    return [];
  }
  return orders.data;
};
