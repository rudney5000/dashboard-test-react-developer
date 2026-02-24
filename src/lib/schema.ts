import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "This field is required"),
  type: z.string().min(1, "This field is required"),
  description_short: z.string().optional(),
  description_long: z.string().optional(),
  code: z.string().optional(),
  unit: z.number().optional(),
  category: z.number().optional(),
  manufacturer: z.string().optional(),
  cashback_type: z.string().optional(),
  cashback_value: z.number().optional(),
  tags: z.array(z.string()).optional(),

  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.array(z.string()).optional(),

  global_category_id: z.number().optional(),
  marketplace_price: z.number().optional(),
  chatting_percent: z.number().min(4).max(100).optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export type ProductFormData = z.infer<typeof productSchema>