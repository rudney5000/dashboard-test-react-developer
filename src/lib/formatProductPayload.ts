import { ProductFormData } from "./schema"

export const formatProductPayload = (data: ProductFormData): Partial<ProductFormData> & { name: string; type: string } => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => {
      if (value === "" || value === null || value === undefined) return false
      if (Array.isArray(value) && value.length === 0) return false
      return true
    })
  ) as Partial<ProductFormData> & { name: string; type: string }
}