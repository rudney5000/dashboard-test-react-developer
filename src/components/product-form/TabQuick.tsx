"use client"

import { UseFormReturn, ControllerRenderProps } from "react-hook-form"
import { ProductFormData } from "@/lib/schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TabQuickProps {
  form: UseFormReturn<ProductFormData>
}

export default function TabQuick({ form }: TabQuickProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="global_category_id"
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "global_category_id"> }) => (
          <FormItem>
            <FormLabel>Глобальная категория</FormLabel>
            <Select
              onValueChange={(val) => field.onChange(Number(val))}
              defaultValue={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите глобальную категорию" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white rounded-lg">
                <SelectItem value="127">Электроника и гаджеты</SelectItem>
                <SelectItem value="427">Мода и стиль</SelectItem>
                <SelectItem value="129">Еда и напитки</SelectItem>
                <SelectItem value="130">Спорт</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="marketplace_price"
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "marketplace_price"> }) => (
          <FormItem>
            <FormLabel>Цена для маркетплейса</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="chatting_percent"
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "chatting_percent"> }) => (
          <FormItem>
            <FormLabel>Комиссия маркета %</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="4-100"
                min={4}
                max={100}
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }: { field: ControllerRenderProps<ProductFormData, "address"> }) => (
          <FormItem>
            <FormLabel>Адрес</FormLabel>
            <FormControl>
              <Input placeholder="Введите адрес" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }: { field: ControllerRenderProps<ProductFormData, "latitude"> }) => (
            <FormItem className="flex-1">
              <FormLabel>Широта</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="55.751244"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }: { field: ControllerRenderProps<ProductFormData, "longitude"> }) => (
            <FormItem className="flex-1">
              <FormLabel>Долгота</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="37.618423"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}