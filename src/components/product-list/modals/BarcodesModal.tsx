"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function BarcodesModal({ isOpen, onClose }: Props) {
  const [barcode, setBarcode] = useState("")

  const handleAdd = () => {
    if (!barcode) return
    setBarcode("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Управление штрих-кодами</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Введите штрих-код"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <Button onClick={handleAdd}>Добавить</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}