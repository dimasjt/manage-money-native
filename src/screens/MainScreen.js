import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { ButtonGroup, Text, Icon } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Record from "../components/Record"

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
    this.setState({ filter: { ...this.state.filter, type: index } }, this.getRecords)
  }

  renderItem = ({ item }) => (
    <Record record={item} />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 3, margin: 10 }}>
          <View style={[{ flexDirection: "row" }, styles.card]}>
            <View style={{ flex: 1 }}>
              <Text h4>Expense</Text>
              <Text>Rp. 10.000.000</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text h4>Income</Text>
              <Text>Rp. 20.000.000</Text>
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
            data={this.props.records.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
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
    shadowOpacity: 0.4,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
})

MainScreen.propTypes = {
  dispatch: PropTypes.func,
  records: PropTypes.object,
  user: PropTypes.object,
}

export default connect(state => state)(MainScreen)