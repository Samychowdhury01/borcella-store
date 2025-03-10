export const capitalizeTitle = (title: string) => {
  const capitalizeTitle = title
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
  return capitalizeTitle;
};
