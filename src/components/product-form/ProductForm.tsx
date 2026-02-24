"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, ProductFormData } from "@/lib/schema"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form } from "@/components/ui/form"
import TabBasic from "./TabBasic"
import TabSEO from "./TabSEO"
import TabQuick from "./TabQuick"
import { createProduct } from "@/lib/api"

export default function ProductForm() {
  const [open, setOpen] = useState(false)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      type: "",
      description_short: "",
      description_long: "",
      code: "",
      tags: [],
      seo_title: "",
      seo_description: "",
      seo_keywords: [],
      chatting_percent: 4,
    },
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data)
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error("Erreur lors de la création:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Добавить номенклатуру</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Добавить номенклатуру</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Основное</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="quick">Быстро</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <TabBasic form={form} />
              </TabsContent>
              <TabsContent value="seo">
                <TabSEO form={form} />
              </TabsContent>
              <TabsContent value="quick">
                <TabQuick form={form} />
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">Подтвердить</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}