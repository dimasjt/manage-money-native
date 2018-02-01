import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { Button, ButtonGroup, ListItem, Text } from "react-native-elements"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { getRecords } from "../actions/record"

class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Records",
    headerRight: (
      <Button
        title="Add"
        onPress={() => navigation.navigate("AddRecord")}
      />
    ),
  })

  state = {
    filter: 0,
  }

  componentWillMount() {
    this.getRecords()
  }

  getRecords = () => {
    this.props.dispatch(getRecords())
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={`Rp.${item.price}`}
    />
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
            selectedIndex={this.state.filter}
            onPress={(index) => this.setState({ filter: index })}
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
}

export default connect(state => state)(MainScreen)