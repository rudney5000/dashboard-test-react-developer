import { Product } from "@/lib/types"
import { FilterValues } from "@/components/product-list/ProductFilters"

export const filterProducts = (products: Product[], filters: FilterValues): Product[] => {
  return products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(filters.name.toLowerCase())
    const matchesDescription = (product.description_short ?? "").toLowerCase().includes(filters.description.toLowerCase())
    const matchesCategory = filters.category === "" || String(product.category) === filters.category
    return matchesName && matchesDescription && matchesCategory
  })
}