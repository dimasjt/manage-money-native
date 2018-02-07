import React from "react"
import { View, FlatList } from "react-native"
import { ButtonGroup, Text } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import ActionButton from "react-native-action-button"

import Record from "../components/Record"
import HeaderRecord from "../components/HeaderRecord"

import { calculateExpenses, calculateIncomes } from "../util/record_calculation"
import money from "../util/money"
import { getRecords } from "../actions/record"
import styles from "../styles/main"
import recordsWithDate from "../store/states/recordsWithDate";

class MainScreen extends React.Component {
  static navigationOptions = {
    title: "This Month",
  }

  constructor(props) {
    super(props)

    this.state = {
      filter: {
        type: 0,
        userId: props.user.data.id,
      },
    }
  }

  componentWillMount() {
    this.getRecords()
  }

  getRecords = () => {
    this.props.dispatch(getRecords(this.state.filter))
  }

  filterChange = (index) => {
    this.setState({ filter: { ...this.state.filter, type: index } })
  }

  filteredRecords = () => {
    const records = this.props.records.data.filter((record) => {
      switch (this.state.filter.type) {
        case 1:
          return record.type === "expense"
        case 2:
          return record.type === "income"
        default:
          return true
      }
    })

    return recordsWithDate(records)
  }

  renderItem = ({ item }) => {
    if (item.isHeader) {
      return <HeaderRecord header={item} />
    }

    return <Record record={item} navigation={this.props.navigation} />
  }

  render() {
    const emptyRecords = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>There are no records.</Text>
      </View>
    )

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 3, margin: 10 }}>
          <View style={[{ flexDirection: "row" }, styles.card]}>
            <View style={styles.cardItem}>
              <Text h4 style={styles.cardItemText}>Expense</Text>
              <Text>{money(this.props.totalExpenses)}</Text>
            </View>
            <View style={styles.cardItem}>
              <Text h4 style={styles.cardItemText}>Income</Text>
              <Text>{money(this.props.totalIncomes)}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 2, zIndex: 10 }}>
          <ButtonGroup
            buttons={["All", "Expenses", "Incomes"]}
            selectedIndex={this.state.filter.type}
            onPress={this.filterChange}
          />
        </View>

        <View style={{ flex: 10 }}>
          <FlatList
            data={this.filteredRecords()}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            refreshing={this.props.records.loading}
            onRefresh={this.getRecords}
            ListEmptyComponent={emptyRecords}
          />
        </View>

        <ActionButton
          onPress={() => this.props.navigation.navigate("AddRecord")}
        />
      </View>
    )
  }
}

MainScreen.propTypes = {
  dispatch: PropTypes.func,
  records: PropTypes.object,
  user: PropTypes.object,
  navigation: PropTypes.object,
  totalIncomes: PropTypes.number,
  totalExpenses: PropTypes.number,
}

export default connect(state => ({
  ...state,
  totalIncomes: calculateIncomes(state.records.data),
  totalExpenses: calculateExpenses(state.records.data),
}))(MainScreen)