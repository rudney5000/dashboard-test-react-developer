"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MENU_ITEMS } from "./sidebar.config"
import SidebarItem from "./SidebarItem"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openMenu, setOpenMenu] = useState("Товары и услуги")

  const toggleMenu = (label: string) =>
    setOpenMenu(openMenu === label ? "" : label)

  return (
    <TooltipProvider delayDuration={0}>
      <aside className={cn(
        "min-h-screen bg-white border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-56"
      )}>
        <div className="p-4 border-b flex items-center">
          {!isCollapsed && <h2 className="font-bold text-lg text-blue-600">TableCRM</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto p-1 rounded hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 py-2">
          {MENU_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              isCollapsed={isCollapsed}
              isOpen={openMenu === item.label}
              onToggle={() => toggleMenu(item.label)}
            />
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  )
}