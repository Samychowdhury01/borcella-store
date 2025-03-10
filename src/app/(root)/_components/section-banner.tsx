import React from "react";
// import accessoriesImg from "/banner-images/accessories.webp";
// import clothing from "/banner-images/accessories.webp";
// import defaultImg from "/banner-image.png";
const SectionBanner = ({
  title,
  categoryType,
}: {
  title: string;
  categoryType?: string;
}) => {
  const category = {
    accessories: "/banner-images/accessories.webp",
    clothing: "/banner-images/clothing.webp",
    default: "/section-banner.jpg",
  };
  const lowercaseCategoryType = categoryType?.toLowerCase().trim();
  const url = !categoryType
    ? category.default
    : lowercaseCategoryType === "bag"
    ? category.accessories
    : lowercaseCategoryType === "dress"
    ? category.clothing
    : category.default;

  return (
    <section
      className="bg-no-repeat bg-center bg-cover min-h-[400px] flex flex-col items-center justify-center"
      style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(${url})
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[72px] font-bold font-lora mb-2.5 text-white text-center">
        {title}
      </h2>
    </section>
  );
};

export default SectionBanner;
