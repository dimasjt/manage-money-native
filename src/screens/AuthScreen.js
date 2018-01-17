import React from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux"
import { Button } from "react-native-elements"

import client from "../client"

class AuthScreen extends React.Component {
  login = () => {
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Button
          title="Sign In"
          onPress={this.login}
        />
      </View>
    )
  }
}

export default connect(state => state)(AuthScreen)