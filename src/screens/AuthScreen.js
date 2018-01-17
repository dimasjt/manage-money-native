import React from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux"

class AuthScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
      </View>
    )
  }
}

export default connect(state => state)(AuthScreen)