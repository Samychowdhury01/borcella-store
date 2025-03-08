import React from "react";
const SectionBanner = ({ title }: { title: string }) => {
  return (
    <section
      className="max-w-7xl mx-auto bg-no-repeat min-h-[400px] flex flex-col items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url('/section-banner.jpg')
        `,
      }}
    >
      <h2 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[72px] font-bold font-lora mb-2.5 text-white">
        {title}
      </h2>
    </section>
  );
};

export default SectionBanner;
