import { useState } from "react"
import { ProductFormData } from "@/lib/schema"
import { UseFormReturn } from "react-hook-form"

type GeneratedData = Pick<ProductFormData,
  "description_short" |
  "description_long" |
  "seo_title" |
  "seo_description" |
  "seo_keywords"
>

export const useGenerateProduct = (form: UseFormReturn<ProductFormData>) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generate = async () => {
    const productName = form.getValues("name")
    if (!productName) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      })

      const data: GeneratedData = await response.json()

      form.setValue("description_short", data.description_short)
      form.setValue("description_long", data.description_long)
      form.setValue("seo_title", data.seo_title)
      form.setValue("seo_description", data.seo_description)
      form.setValue("seo_keywords", data.seo_keywords)
    } catch (error) {
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return { generate, isGenerating }
}