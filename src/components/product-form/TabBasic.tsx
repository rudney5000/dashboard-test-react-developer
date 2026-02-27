"use client"

import { UseFormReturn } from "react-hook-form"
import { Wand2 } from "lucide-react"
import { ProductFormData } from "@/lib/schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRewriteText } from "@/hooks/useRewriteText"

interface Props {
  form: UseFormReturn<ProductFormData>
}

export default function TabBasic({ form }: Props) {
  const { rewrite, rewritingField } = useRewriteText(form)

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>* Имя</FormLabel>
            <FormControl>
                <Input placeholder="Название товара" {...field} />
              </FormControl>
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
            <div className="flex items-center justify-between">
              <FormLabel>Краткое описание</FormLabel>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => rewrite("description_short")}
                disabled={rewritingField === "description_short" || !form.watch("description_short")}
                className="gap-1 text-xs h-6"
              >
                <Wand2 size={11} />
                {rewritingField === "description_short" ? "..." : "Rewrite"}
              </Button>
            </div>
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
            <div className="flex items-center justify-between">
              <FormLabel>Длинное описание</FormLabel>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => rewrite("description_long")}
                disabled={rewritingField === "description_long" || !form.watch("description_long")}
                className="gap-1 text-xs h-6"
              >
                <Wand2 size={11} />
                {rewritingField === "description_long" ? "..." : "Rewrite"}
              </Button>
            </div>
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