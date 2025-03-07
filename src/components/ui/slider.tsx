"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider-root"
      className={cn("relative flex items-center select-none touch-none", className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <SliderPrimitive.Range className="absolute h-full bg-blue-500 dark:bg-blue-400 rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-5 h-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
    </SliderPrimitive.Root>
  )
}

export { Slider }
