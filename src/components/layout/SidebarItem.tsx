import { MenuItem } from "./sidebar.config"
import CollapsedItem from "./CollapsedItem"
import ExpandedItem from "./ExpandedItem"

type Props = {
  item: MenuItem
  isCollapsed: boolean
  isOpen: boolean
  onToggle: () => void
}

export default function SidebarItem({ item, isCollapsed, isOpen, onToggle }: Props) {
  if (isCollapsed) return <CollapsedItem item={item} />
  return <ExpandedItem item={item} isOpen={isOpen} onToggle={onToggle} />
}