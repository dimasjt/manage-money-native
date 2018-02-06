import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  item: {
    minHeight: 60,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  itemType: {
    width: "3%",
  },
  itemTypeExpense: {
    backgroundColor: "red",
  },
  itemTypeIncome: {
    backgroundColor: "green",
  },
  text: {
    padding: 10,
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 12,
    color: "#999",
  },
})

export default styles