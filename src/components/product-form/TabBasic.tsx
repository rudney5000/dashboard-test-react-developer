"use client"

import { UseFormReturn, ControllerRenderProps } from "react-hook-form"
import { ProductFormData } from "@/lib/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TabBasicProps {
  form: UseFormReturn<ProductFormData>
}

export default function TabBasic({ form }: TabBasicProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "name"> }) => (
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
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "type"> }) => (
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
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "description_short"> }) => (
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
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "description_long"> }) => (
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
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "code"> }) => (
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