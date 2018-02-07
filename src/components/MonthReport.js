import React from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { calculateIncomes, calculateExpenses } from "../util/record_calculation"
import styles from "../styles/main"
import money from "../util/money"

const MonthReport = ({ totalIncomes, totalExpenses }) => {
  return (
    <View style={[{ flexDirection: "row" }, styles.card]}>
      <View style={styles.cardItem}>
        <Text h4 style={styles.cardItemText}>Expense</Text>
        <Text>{money(totalExpenses)}</Text>
      </View>
      <View style={styles.cardItem}>
        <Text h4 style={styles.cardItemText}>Income</Text>
        <Text>{money(totalIncomes)}</Text>
      </View>
    </View>
  )
}

MonthReport.propTypes = {
  totalIncomes: PropTypes.number,
  totalExpenses: PropTypes.number,
}

export default connect(state => ({
  totalIncomes: calculateIncomes(state.records.data),
  totalExpenses: calculateExpenses(state.records.data),
}))(MonthReport)