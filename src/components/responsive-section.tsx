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
        "py-8 md:py-12 lg:py-16", 
        container && "px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto", 
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}