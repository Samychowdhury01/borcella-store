export const getCollections = async () => {
  const collections = await fetch(`${process.env.API_URL}/collections`, {
    cache: "no-store"
  });
  const data = await collections.json();
  if (data?.success) {
    return data?.data;
  } else {
    return [];
  }
};

export const getSingleCollection = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.API_URL}/collections/${collectionId}`
  );
  const data = await collection.json();
  if (data?.success) {
    return data?.data;
  } else {
    return {};
  }
};
