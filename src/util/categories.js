const expenseCategories = ["food", "transportation", "shopping"]
const incomeCategories = ["sell", "salary"]

export const expenses = {
  labels: expenseCategories.map(category => category.toLocaleUpperCase()),
  values: expenseCategories,
}

export const incomes = {
  labels: incomeCategories.map(category => category.toLocaleUpperCase()),
  values: incomeCategories,
}

export default {
  expenses,
  incomes,
}