"use client"

import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import { getProducts } from "@/lib/api"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { filterProducts } from "@/lib/filterProducts"
import ProductForm from "@/components/product-form/ProductForm"
import ProductFilters, { FilterValues } from "./ProductFilters"
import ProductTableRow from "./ProductTableRow"
import ProductTableHeader from "./ProductTableHeader"

const DEFAULT_FILTERS: FilterValues = { name: "", description: "", category: "" }

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS)

  const fetchProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data.result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const filteredProducts = filterProducts(products, filters)

  if (isLoading) return <p>Загрузка...</p>

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ProductForm />
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={14} className="mr-2" />
          Фильтры
        </Button>
      </div>

      {showFilters && (
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <ProductTableHeader />
          <tbody>
            {filteredProducts.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}