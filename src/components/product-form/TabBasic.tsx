"use client"

import { UseFormReturn } from "react-hook-form"
import { Sparkles } from "lucide-react"
import { ProductFormData } from "@/lib/schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useGenerateProduct } from "@/hooks/useGenerateProduct"

interface TabBasicProps {
  form: UseFormReturn<ProductFormData>
}

export default function TabBasic({ form }: TabBasicProps) {
  const { generate, isGenerating } = useGenerateProduct(form)

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>* Имя</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input placeholder="Название товара" {...field} />
              </FormControl>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={generate}
                disabled={isGenerating || !form.watch("name")}
                className="shrink-0 gap-1"
              >
                <Sparkles size={12} />
                {isGenerating ? "..." : "AI"}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тип</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="product">Товар</SelectItem>
                <SelectItem value="service">Услуга</SelectItem>
                <SelectItem value="offer">Предложение</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description_short"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Краткое описание</FormLabel>
            <FormControl>
              <Textarea placeholder="Краткое описание" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description_long"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Длинное описание</FormLabel>
            <FormControl>
              <Textarea placeholder="Длинное описание" rows={4} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Код</FormLabel>
            <FormControl>
              <Input placeholder="Код товара (Артикул)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}