import { cn } from "@/lib/utils";
import React from "react";

const SectionTitle = ({ title, width }: { title: string; width: string }) => {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-heading3 md:text-heading1 md:leading-heading1  font-bold text-center">
        {title}
      </h2>
      <div
        className={`h-2 bg-primary`}
        style={{
          width,
        }}
      ></div>
    </div>
  );
};

export default SectionTitle;
