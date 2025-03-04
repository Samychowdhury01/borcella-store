export const getSearchResults = async (query: string) => {
  const res = await fetch(`${process.env.API_URL}/search/${query}`);
  const data = await res.json();

  if (!data.success) {
    return [];
  }
  return data.data;
};
