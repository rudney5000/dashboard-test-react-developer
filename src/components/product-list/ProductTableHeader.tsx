const COLUMNS = ["Изображение", "Тип", "Имя", "Описание", "Действие"]

export default function ProductTableHeader() {
  return (
    <thead>
      <tr className="border-b bg-gray-50">
        {COLUMNS.map((col, i) => (
          <th
            key={col}
            className={`text-left px-4 py-3 font-medium text-gray-500 ${i > 0 ? "border-l" : ""}`}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  )
}