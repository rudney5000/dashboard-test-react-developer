"use client"

import { UseFormReturn, ControllerRenderProps } from "react-hook-form"
import { ProductFormData } from "@/lib/schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TabSEOProps {
  form: UseFormReturn<ProductFormData>
}

export default function TabSEO({ form }: TabSEOProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="seo_title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Title</FormLabel>
            <FormControl>
              <Input placeholder="Заголовок для поисковиков" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Краткое описание для поисковиков" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seo_keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SEO Keywords</FormLabel>
            <FormControl>
              <Input
                placeholder="Ключевые слова через запятую"
                value={field.value?.join(", ") ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}