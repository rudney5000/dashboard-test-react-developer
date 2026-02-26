"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const MOCK_GROUPS = ["Тест", "Товар", "Z", "23123", "Размер"]

export default function GroupsModal({ isOpen, onClose }: Props) {
  const [groups, setGroups] = useState(MOCK_GROUPS)
  const [selected, setSelected] = useState<string | null>(null)

  const removeGroup = (group: string) =>
    setGroups(groups.filter((g) => g !== group))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Управление группами номенклатур</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="w-64 border-r pr-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium text-sm">Список групп</p>
              <Button size="sm" variant="outline">+</Button>
            </div>
            <div className="space-y-1">
              {groups.map((group) => (
                <div
                  key={group}
                  onClick={() => setSelected(group)}
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer text-sm hover:bg-gray-100 ${
                    selected === group ? "bg-gray-100" : ""
                  }`}
                >
                  <span>{group}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeGroup(group) }}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="font-medium text-sm mb-3">Выбор номенклатуры</p>
            <Button size="sm" className="mb-4">Выбрать</Button>
            <p className="font-medium text-sm mb-2">Детали группы</p>
            <div className="border rounded">
              <div className="flex px-4 py-2 bg-gray-50 border-b text-sm font-medium">
                <span className="flex-1">Название номенклатуры</span>
                <span>Главная</span>
              </div>
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-sm gap-2">
                <span>Нет данных</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}