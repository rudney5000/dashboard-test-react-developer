export type Product = {
  id: number
  name: string
  type: string
  description_short: string | null
  description_long: string | null
  code: string | null
  unit: number | null
  unit_name: string | null
  category: number | null
  manufacturer: string | null
  global_category_id: number | null
  chatting_percent: number
  cashback_type: string | null
  cashback_value: number | null
  tags: string[]
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[]
  address: string | null
  latitude: number | null
  longitude: number | null
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