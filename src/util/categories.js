import React from "react"
import { Avatar } from "react-native-elements"

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

export const iconCategories = (category) => {
  let icon
  switch (category) {
    case "food":
      icon = { name: "food", type: "material-community" }
      break
    case "transportation":
      icon = { name: "md-car", type: "ionicons" }
      break
    case "shopping":
      icon = { name: "md-cart", type: "ionicons" }
      break
    case "salary":
      icon = { name: "attach-money", type: "material-icons" }
      break
    case "sell":
      icon = { name: "handshake-o", type: "font-awesome" }
      break
    default:
      icon = { name: "menu", type: "entypo" }
  }

  return (
    <Avatar
      small
      rounded
      icon={icon}
    />
  )
}

export default {
  expenses,
  incomes,
  iconCategories,
}