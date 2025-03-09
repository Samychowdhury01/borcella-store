import React from "react";
const SectionBanner = ({ title }: { title: string }) => {
  return (
    <section
  className="bg-no-repeat bg-center bg-cover min-h-[400px] flex flex-col items-center justify-center"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('/section-banner.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <h2 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[72px] font-bold font-lora mb-2.5 text-white text-center">
    {title}
  </h2>
</section>
  );
};

export default SectionBanner;
