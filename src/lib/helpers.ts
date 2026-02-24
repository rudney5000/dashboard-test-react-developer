export const formatProductType = (type: string) => {
  const types: Record<string, string> = {
    product: "Товар",
    service: "Услуга",
    offer: "Предложение",
  }
  return types[type] ?? "Не указано"
}