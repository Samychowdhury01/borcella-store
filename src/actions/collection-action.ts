export const getCollections = async () => {
  console.log(`${process.env.API_URL}/collections`);
  const collections = await fetch(`${process.env.API_URL}/collections`);
  const data = await collections.json();
  if (data?.success) {
    return data?.data;
  } else {
    return [];
  }
};
