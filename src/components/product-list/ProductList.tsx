"use client"

import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import { getProducts } from "@/lib/api"
import { Button } from "@/components/ui/button"
import ProductForm from "@/components/product-form/ProductForm"
import ProductFilters from "./ProductFilters"
import ProductTableRow from "./ProductTableRow"
import ProductTableHeader from "./ProductTableHeader"

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

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

      {showFilters && <ProductFilters />}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <ProductTableHeader />
          <tbody>
            {products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}