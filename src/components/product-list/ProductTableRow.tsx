import { Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { formatProductType } from "@/lib/helpers"
import { Product } from "@/lib/types"

interface Props {
  product: Product
}

const ProductImage = ({ photo }: { photo?: string }) => (
  <div className="w-10 h-10 border rounded flex items-center justify-center text-gray-400 bg-gray-50">
    {photo
      ? <img src={photo} className="w-full h-full object-cover rounded" />
      : <span className="text-lg">+</span>
    }
  </div>
)

const ProductActions = () => (
  <div className="flex items-center gap-2">
    <button className="p-1 hover:text-blue-600 transition-colors"><Pencil size={15} /></button>
    <button className="p-1 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
    <button className="p-1 hover:text-gray-600 transition-colors"><MoreHorizontal size={15} /></button>
  </div>
)

export default function ProductTableRow({ product }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3"><ProductImage photo={product.photos?.[0] ?? undefined} /></td>
      <td className="px-4 py-3 border-l text-gray-600">{formatProductType(product.type)}</td>
      <td className="px-4 py-3 border-l font-medium">{product.name}</td>
      <td className="px-4 py-3 border-l text-gray-500">
        <p className="truncate max-w-xs">{product.description_short}</p>
      </td>
      <td className="px-4 py-3 border-l"><ProductActions /></td>
    </tr>
  )
}