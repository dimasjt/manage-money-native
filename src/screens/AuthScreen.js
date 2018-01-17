import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { Button, FormInput, FormLabel } from "react-native-elements"

import client from "../client"

class AuthScreen extends React.Component {
  state = {}

  login = async () => {
    const auth = {
      strategy: "local",
      ...this.state,
    }

    try {
      const result = await client.authenticate(auth)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View>
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={email => this.setState({ email })} />
        </View>

        <View>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={password => this.setState({ password })} />
        </View>

        <Button
          title="Sign In"
          onPress={this.login}
        />
      </View>
    )
  }
}

export default connect(state => state)(AuthScreen)