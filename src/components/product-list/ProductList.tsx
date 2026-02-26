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
import ProductPagination from "./ProductPagination"

const DEFAULT_FILTERS: FilterValues = { name: "", description: "", category: "" }
const ITEMS_PER_PAGE = 10

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS)
  const [currentPage, setCurrentPage] = useState(1)

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
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (isLoading) return <p>Загрузка...</p>

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ProductForm onSuccess={fetchProducts}/>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={14} className="mr-2" />
          Фильтры
        </Button>
      </div>

      {showFilters && (
        <ProductFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => { setFilters(DEFAULT_FILTERS); setCurrentPage(1) }}
        />
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <ProductTableHeader />
          <tbody>
            {paginatedProducts.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}