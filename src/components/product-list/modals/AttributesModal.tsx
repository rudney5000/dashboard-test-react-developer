"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function AttributesModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Управление атрибутами номенклатуры</DialogTitle>
        </DialogHeader>
        <Button variant="outline" className="w-full border-dashed">
          + Добавить атрибут
        </Button>
        <div className="border rounded">
          <div className="flex px-4 py-2 bg-gray-50 border-b text-sm font-medium">
            <span className="flex-1">Название</span>
            <span className="flex-1">Значение</span>
            <span>Действие</span>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-sm gap-2">
            <span>Нет данных</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}