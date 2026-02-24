"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/lib/api"
import { ProductFormData } from "@/lib/schema"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ProductList() {
  const [products, setProducts] = useState<ProductFormData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data.result)
      } catch (error) {
        console.error("Erreur:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Загрузка...</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Имя</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead>Цена</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.type}</TableCell>
            <TableCell>{product.description_short}</TableCell>
            <TableCell>{product.marketplace_price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}