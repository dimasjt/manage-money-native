import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { ButtonGroup, Text, Icon } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Record from "../components/Record"

import { calculateExpenses, calculateIncomes } from "../util/record_calculation"
import money from "../util/money"
import { getRecords } from "../actions/record"

class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Records",
    headerRight: (
      <Icon
        name="plus"
        type="entypo"
        onPress={() => navigation.navigate("AddRecord")}
        style={{ padding: 10, marginRight: 10 }}
      />
    ),
  })

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
    return this.props.records.data.filter((record) => {
      switch (this.state.filter.type) {
        case 1:
          return record.type === "expense"
        case 2:
          return record.type === "income"
        default:
          return true
      }
    })
  }

  renderItem = ({ item }) => (
    <Record record={item} navigation={this.props.navigation} />
  )

  render() {
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
          />
        </View>
      </View>
    )
  }
}

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