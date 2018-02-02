export const calculateIncomes = (records) => {
  let total = 0
  records.forEach(record => {
    if (record.type === "income") {
      total += record.price
    }
  })
  return total
}

export const calculateExpenses = (records) => {
  let total = 0
  records.forEach(record => {
    if (record.type === "expense") {
      total += record.price
    }
  })
  return total
}
