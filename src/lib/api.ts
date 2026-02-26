import axios from "axios"
import { ProductFormData } from "./schema"
import { Product } from "./types"

const TOKEN = "af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77"
const BASE_URL = "https://app.tablecrm.com/api/v1"

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    token: TOKEN,
  },
})

export type ProductListResponse = {
  result: Product[]
  count: number
}

export const getProducts = async (): Promise<ProductListResponse> => {
  const response = await api.get("/nomenclature/")
  return response.data
}

export const createProduct = async (data: ProductFormData): Promise<Product> => {
  const response = await api.post("/nomenclature/", [data])
  return response.data
}