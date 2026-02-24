import { ProductFormData } from "./schema"

export type Product = ProductFormData & {
  id: number
  unit_name: string | null
  photos: string[] | null
  barcodes: string[]
  prices: null
  balances: null
  qr_hash: string | null
  qr_url: string | null
  updated_at: number
  created_at: number
}

export type ProductListResponse = {
  result: Product[]
  count: number
}