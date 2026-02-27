import ProductForm from "@/components/product-form/ProductForm";
import ProductList from "@/components/product-list/ProductList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Номенклатура</h1>
        <ProductForm />
      </div>
      <ProductList />
    </main>
  );
}
