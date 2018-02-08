import React from "react"
import { AsyncStorage, View } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { AdMobBanner } from "expo"

import AuthScreen from "../screens/AuthScreen"
import Routes from "../Routes"

import client from "../client"

import { userLogged } from "../actions/user"

class Main extends React.Component {
  componentWillMount() {
    this.validateToken()
  }

  validateToken = async () => {
    try {
      const token = await AsyncStorage.getItem("feathers-jwt")
      const payload = await client.passport.verifyJWT(token)
      const user = await client.service("users").get(payload.userId)

      this.props.dispatch(userLogged(user))
    } catch (error) {
      // unlogged
    }
  }

  render() {
    const { user } = this.props
    if (user.logged) {
      return (
        <View style={{ flex: 1 }}>
          <Routes />
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-3599661132562532/5514515325"
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={error => console.log(error)}
          />
        </View>
      )
    }

    return <AuthScreen />
  }
}

Main.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(state => state)(Main)