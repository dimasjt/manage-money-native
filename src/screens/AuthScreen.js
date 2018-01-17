import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { Button, SocialIcon, FormInput, FormLabel } from "react-native-elements"
import { Facebook } from "expo"
// import axios from "axios"

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

  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync("1554473021328051", {
      permissions: ["public_profile", "email"],
    })

    try {
      if (type === "success") {
        // const { data } = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`)
        // const user = {
        //   email: data.email,
        //   password: "233bfa12d6cac8c3ae8afbc0e2aa7574e2ee2f2d",
        //   facebookId: data.id,
        //   strategy: "facebook",
        // }

        // const result = await client.service("users").create(user)
        const result = await client.authenticate({ strategy: "facebook", access_token: token })
        console.log(result)
      }
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

        <SocialIcon
          title="Login with Facebook"
          button
          type="facebook"
          raised
          onPress={this.loginFacebook}
        />
      </View>
    )
  }
}

export default connect(state => state)(AuthScreen)