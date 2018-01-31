import React from "react"
import { View, FlatList } from "react-native"
import { Button, ButtonGroup, List, ListItem, Text } from "react-native-elements"
import { connect } from "react-redux"

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

  // renderItem = ({ item }) => (
  //   <View style={{ flex: 1, borderBottomColor: "#ccc", borderBottomWidth: 1, height: 80, padding: 10 }}>
  //     <Text style={{ fontSize: 16 }}>{item.title}</Text>
  //     <Text>{item.price}</Text>
  //   </View>
  // )

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={`Rp.${item.price}`}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ButtonGroup
          buttons={["All", "Expenses", "Incomes"]}
          selectedIndex={this.state.filter}
          onPress={(index) => this.setState({ filter: index })}
        />

        <FlatList
          data={this.props.records.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

export default connect(state => state)(MainScreen)