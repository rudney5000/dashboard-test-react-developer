import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { MenuItem, ChildItem } from "./sidebar.config"

const ChildButton = ({ child }: { child: ChildItem }) => (
  <button className={cn(
    "w-full text-left px-4 py-1.5 text-sm hover:bg-gray-100 transition-colors",
    child.isActive && "text-blue-600 font-medium"
  )}>
    {child.label}
  </button>
)

type Props = {
  item: MenuItem
  isOpen: boolean
  onToggle: () => void
}

export default function ExpandedItem({ item, isOpen, onToggle }: Props) {
  return (
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
}