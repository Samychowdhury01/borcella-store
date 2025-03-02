export const getProducts = async () => {
  const products = await fetch(`${process.env.API_URL}/products`);
  const data = await products.json();

  if (data?.success) {
    return data?.data;
  } else {
    return [];
  }
};
