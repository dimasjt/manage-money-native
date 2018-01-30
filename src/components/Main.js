import React from "react"
import { AsyncStorage } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"

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
      return <Routes />
    }

    return <AuthScreen />
  }
}

Main.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(state => state)(Main)