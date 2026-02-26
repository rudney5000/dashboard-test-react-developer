import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { ProductFormData } from "@/lib/schema"

export const useGenerateSEO = (form: UseFormReturn<ProductFormData>) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSEO = async () => {
    const productName = form.getValues("name")
    if (!productName) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          description: form.getValues("description_short"),
        }),
      })

      const data = await response.json()
      form.setValue("seo_title", data.seo_title)
      form.setValue("seo_description", data.seo_description)
      form.setValue("seo_keywords", data.seo_keywords)
    } catch (error) {
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateSEO, isGenerating }
}