export const getProducts = async () => {
  const products = await fetch(`${process.env.API_URL}/products`);
  const data = await products.json();

  if (data?.success) {
    return data?.data;
  } else {
    return [];
  }
};

export const getProductDetails = async (productId: string) => {
  const products = await fetch(`${process.env.API_URL}/products/${productId}`, {
    cache: "no-store",
  });
  const data = await products.json();

  if (data?.success) {
    return data?.data;
  } else {
    return {};
  }
};

export const getRelatedProducts = async (productId: string) => {
  const products = await fetch(
    `${process.env.API_URL}/products/${productId}/related`
  );
  const data = await products.json();

  if (data?.success) {
    return data?.data;
  } else {
    return [];
  }
};

export const getProductsByCollectionId = async (id: string) => {
  const products = await fetch(
    `${process.env.API_URL}/products/collection/${id}`
  );
  const data = await products.json();

  if (data?.success) {
    return data?.data;
  } else {
    return [];
  }
};
