import React from "react";

const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center justify-center mb-20">
      <div className="flex flex-col items-center relative section-heading px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[28px] sm:text-[36px] md:text-heading2 font-lora font-semibold capitalize leading-[40px] sm:leading-[45px]">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-gray-500 mt-2 max-w-2xl">
          {description}
        </p>
        <div></div>
      </div>
    </div>
  );
};

export default SectionHeading;
