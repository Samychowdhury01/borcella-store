import { cn } from "@/lib/utils"
import React from "react"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  container?: boolean
}

export function Section({ 
  children, 
  className, 
  container = true,
  ...props 
}: SectionProps) {
  return (
    <section
      className={cn(
        "pt-[40px] sm:pt-[60px] md:pt-[80px] lg:pt-[120px] xl:pt-[140px]", 
        container && "px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto", 
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}