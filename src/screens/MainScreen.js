import React from "react"
import { View, Text } from "react-native"
import { Button } from "react-native-elements"

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

  render() {
    return (
      <View>
        <Text>haha</Text>
      </View>
    )
  }
}

export default MainScreen