export const getProductFAQs = async (productId: string) => {
  const collection = await fetch(
    `${process.env.API_URL}/products/${productId}/faq`
  );
  const data = await collection.json();
  if (data?.success) {
    return data?.data;
  } else {
    return {};
  }
};