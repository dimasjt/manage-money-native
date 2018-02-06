import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  touch: {
    minHeight: 60,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderLeftColor: "red",
    borderLeftWidth: 10,
    padding: 10,
  },
  itemType: {
    width: 12,
    height: 20,
  },
  itemTypeExpense: {
    borderLeftColor: "red",
  },
  itemTypeIncome: {
    borderLeftColor: "green",
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