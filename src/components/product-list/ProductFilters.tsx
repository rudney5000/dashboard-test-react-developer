"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductFilters() {
  return (
    <div className="flex flex-wrap gap-3 mb-4 p-4 bg-white border rounded-lg">
      <Input className="w-36" placeholder="Название" />
      <Input className="w-36" placeholder="Описание" />
      <Input className="w-36" placeholder="Категория" />
      <Input className="w-24" placeholder="Комиссия %" />
      <Button variant="outline" size="sm">Очистить</Button>
      <Button size="sm">Поиск</Button>
    </div>
  )
}