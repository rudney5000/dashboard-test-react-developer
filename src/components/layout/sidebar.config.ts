import { ShoppingCart, Package, Tag, BarChart2, Users, Settings, Store, LucideIcon } from "lucide-react"

export type ChildItem = {
  label: string
  isActive?: boolean
}

export type MenuItem = {
  icon: LucideIcon
  label: string
  isActive?: boolean
  children?: ChildItem[]
}

export const MENU_ITEMS: MenuItem[] = [
  { icon: ShoppingCart, label: "Продажи" },
  { icon: Package, label: "Закупки" },
  { icon: Store, label: "Склад" },
  {
    icon: Tag,
    label: "Товары и услуги",
    isActive: true,
    children: [
      { label: "Цены" },
      { label: "Типы цен" },
      { label: "Данные" },
      { label: "Категории" },
      { label: "Тех. карты" },
      { label: "Номенклатура", isActive: true },
      { label: "Фиды" },
      { label: "Промокоды" },
    ],
  },
  { icon: BarChart2, label: "Контрагенты" },
  { icon: Users, label: "Пользователи" },
  { icon: Settings, label: "Настройки" },
]