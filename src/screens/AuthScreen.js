import React from "react"
import { View, Alert, Keyboard, AsyncStorage } from "react-native"
import { connect } from "react-redux"
import { Button, SocialIcon, FormInput, FormLabel, Text } from "react-native-elements"
import { Facebook } from "expo"
import KeyboardSpacer from "react-native-keyboard-spacer"
import PropTypes from "prop-types"

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
      const payload = await client.passport.verifyJWT(result.accessToken)
      const user = await client.service("users").get(payload.userId)

      await AsyncStorage.setItem("user", user)
      this.props.navigation.navigate("Main")
      Keyboard.dismiss()
    } catch (error) {
      Alert.alert("Sign in failed", error.message)
    }
  }

  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync("1554473021328051", {
      permissions: ["public_profile", "email"],
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <Text h2>ManageMoney</Text>
        </View>

        <View>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={email => this.setState({ email })} />
        </View>

        <View style={{ marginBottom: 20 }}>
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </View>

        <Button
          title="SIGN IN"
          onPress={this.login}
          raised
        />

        <SocialIcon
          title="Login with Facebook"
          button
          type="facebook"
          raised
          onPress={this.loginFacebook}
          iconSize={20}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

AuthScreen.propTypes = {
  navigation: PropTypes.object,
}

export default connect(state => state)(AuthScreen)