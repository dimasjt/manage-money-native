import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  card: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  cardItem: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 5,
  },
  cardItemText: {
    paddingBottom: 8,
  },
})

export default styles