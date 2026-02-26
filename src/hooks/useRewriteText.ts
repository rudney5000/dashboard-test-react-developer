import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { ProductFormData } from "@/lib/schema"

type TextField = "description_short" | "description_long"

export const useRewriteText = (form: UseFormReturn<ProductFormData>) => {
  const [rewritingField, setRewritingField] = useState<TextField | null>(null)

  const rewrite = async (field: TextField) => {
    const text = form.getValues(field)
    if (!text) return

    setRewritingField(field)
    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      form.setValue(field, data.text)
    } catch (error) {
      console.error(error)
    } finally {
      setRewritingField(null)
    }
  }

  return { rewrite, rewritingField }
}