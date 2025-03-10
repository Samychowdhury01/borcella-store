import Image from "next/image";
import img from "../../../../public/products/bag/1.jpg";
import img2 from "../../../../public/products/dress/1.jpg";
import img3 from "../../../../public/products/hat/1.jpg";
import img4 from "../../../../public/products/dress/4.jpg";
import { Section } from "@/components/responsive-section";
import SectionHeading from "./section-heading";

export default function PhotoGallery() {
  return (
    <Section className="responsive-section-bottom">
      <SectionHeading
        title="Our product looks"
        description="Here is our product looks that you may like.

"
      />
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Large image at the top */}
          <div className="md:col-span-2 rounded-lg overflow-hidden">
            <Image
              src={img}
              alt="Featured gallery image"
              width={800}
              height={400}
              className="w-full h-full object-cover aspect-[2/1]"
            />
          </div>

          {/* Tall image on the right */}
          <div className="md:row-span-2 rounded-lg overflow-hidden">
            <Image
              src={img2}
              alt="Tall gallery image"
              width={400}
              height={800}
              className="w-full h-full object-cover aspect-[1/2]"
            />
          </div>

          {/* Two square images at the bottom left */}
          <div className="rounded-lg overflow-hidden">
            <Image
              src={img3}
              alt="Square gallery image 1"
              width={400}
              height={400}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          <div className="rounded-lg overflow-hidden">
            <Image
              src={img4}
              alt="Square gallery image 2"
              width={400}
              height={400}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
