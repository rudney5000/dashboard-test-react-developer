import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type FilterValues = {
  name: string
  description: string
  category: string
}

type Props = {
  filters: FilterValues
  onChange: (filters: FilterValues) => void
  onReset: () => void
}

export default function ProductFilters({ filters, onChange, onReset }: Props) {
  const handleChange = (key: keyof FilterValues, value: string) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className="flex flex-wrap gap-3 mb-4 p-4 bg-white border rounded-lg">
      <Input
        className="w-36"
        placeholder="Название"
        value={filters.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        className="w-36"
        placeholder="Описание"
        value={filters.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <Input
        className="w-36"
        placeholder="Категория"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
      />
      <Button variant="outline" size="sm" onClick={onReset}>Очистить</Button>
    </div>
  )
}