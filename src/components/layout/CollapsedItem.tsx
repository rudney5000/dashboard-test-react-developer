"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MenuItem, ChildItem } from "./sidebar.config"

const ChildButton = ({ child }: { child: ChildItem }) => (
  <button className={cn(
    "w-full text-left px-4 py-1.5 text-sm hover:bg-gray-100 transition-colors",
    child.isActive && "text-blue-600 font-medium"
  )}>
    {child.label}
  </button>
)

const Flyout = ({ item }: { item: MenuItem }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button className={cn(
        "w-full flex justify-center py-2 hover:bg-gray-100 transition-colors",
        item.isActive && "text-blue-600"
      )}>
        <item.icon size={16} />
      </button>

      {isVisible && (
        <div className="absolute left-full top-0 ml-1 bg-white border rounded-lg shadow-lg py-1 w-44 z-50">
          <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 border-b mb-1">
            {item.label}
          </p>
          {item.children?.map((child) => (
            <ChildButton key={child.label} child={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CollapsedItem({ item }: { item: MenuItem }) {
  if (item.children) return <Flyout item={item} />

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className={cn(
          "w-full flex justify-center py-2 hover:bg-gray-100 transition-colors",
          item.isActive && "text-blue-600"
        )}>
          <item.icon size={16} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  )
}