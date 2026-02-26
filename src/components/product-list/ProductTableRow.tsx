"use client"

import { useState } from "react"
import { Pencil, Trash2, MoreHorizontal, Barcode, LayoutList, Tag } from "lucide-react"
import { formatProductType } from "@/lib/helpers"
import { Product } from "@/lib/types"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import BarcodesModal from "./modals/BarcodesModal"
import GroupsModal from "./modals/GroupsModal"
import AttributesModal from "./modals/AttributesModal"

type ModalType = "barcodes" | "groups" | "attributes" | null

const ProductImage = ({ photo }: { photo?: string }) => (
  <div className="w-10 h-10 border rounded flex items-center justify-center text-gray-400 bg-gray-50">
    {photo
      ? <img src={photo} className="w-full h-full object-cover rounded" />
      : <span className="text-lg">+</span>
    }
  </div>
)

export default function ProductTableRow({ product }: { product: Product }) {
  const [openModal, setOpenModal] = useState<ModalType>(null)

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3"><ProductImage photo={product.photos?.[0] ?? undefined} /></td>
        <td className="px-4 py-3 border-l text-gray-600">{formatProductType(product.type)}</td>
        <td className="px-4 py-3 border-l font-medium">{product.name}</td>
        <td className="px-4 py-3 border-l text-gray-500">
          <p className="truncate max-w-xs">{product.description_short}</p>
        </td>
        <td className="px-4 py-3 border-l">
          <TooltipProvider delayDuration={0}>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:text-blue-600 transition-colors">
                <Pencil size={15} />
              </button>
              <button className="p-1 hover:text-red-500 transition-colors">
                <Trash2 size={15} />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={15} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem onClick={() => setOpenModal("barcodes")}>
                        <Barcode size={16} />
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="left">Управление штрих-кодами</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem onClick={() => setOpenModal("groups")}>
                        <LayoutList size={16} />
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="left">Управление группами номенклатур</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem onClick={() => setOpenModal("attributes")}>
                        <Tag size={16} />
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="left">Атрибуты номенклатуры</TooltipContent>
                  </Tooltip>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipProvider>
        </td>
      </tr>

      <BarcodesModal isOpen={openModal === "barcodes"} onClose={() => setOpenModal(null)} />
      <GroupsModal isOpen={openModal === "groups"} onClose={() => setOpenModal(null)} />
      <AttributesModal isOpen={openModal === "attributes"} onClose={() => setOpenModal(null)} />
    </>
  )
}