"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MenuItem, ChildItem } from "./sidebar.config"

type Props = {
  item: MenuItem
  isCollapsed: boolean
  isOpen: boolean
  onToggle: () => void
}

const ChildButton = ({ child }: { child: ChildItem }) => (
  <button className={cn(
    "w-full text-left px-4 py-1.5 text-sm hover:bg-gray-100 transition-colors",
    child.isActive && "text-blue-600 font-medium"
  )}>
    {child.label}
  </button>
)

const CollapsedFlyout = ({ item }: { item: MenuItem }) => {
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

const CollapsedItem = ({ item }: { item: MenuItem }) => {
  if (item.children) return <CollapsedFlyout item={item} />

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

const ExpandedItem = ({ item, isOpen, onToggle }: Omit<Props, "isCollapsed">) => (
  <div>
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
        item.isActive && "text-blue-600 font-medium"
      )}
    >
      <item.icon size={16} />
      <span className="flex-1 text-left">{item.label}</span>
      {item.children && (
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      )}
    </button>

    {item.children && isOpen && (
      <div className="ml-6 border-l">
        {item.children.map((child) => (
          <ChildButton key={child.label} child={child} />
        ))}
      </div>
    )}
  </div>
)

export default function SidebarItem({ item, isCollapsed, isOpen, onToggle }: Props) {
  if (isCollapsed) return <CollapsedItem item={item} />
  return <ExpandedItem item={item} isOpen={isOpen} onToggle={onToggle} />
}