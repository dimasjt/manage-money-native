import { AsyncStorage } from "react-native"

import {
  USER_LOGGED,
  USER_LOGOUT,
} from "../constants"

import client from "../client"

export const userLogged = (user) => ({
  type: USER_LOGGED,
  payload: user,
})

export const userLogout = () => dispatch => {
  AsyncStorage.removeItem("feathers-jwt")
    .then(function () {
      dispatch({
        type: USER_LOGOUT,
      })
    }).catch(function () {

    })
}

const login = (auth, dispatch) => {
  return new Promise((resolve, reject) => {
    client.authenticate(auth)
      .then(result => {
        return Promise.resolve(result)
      })
      .then(result => {
        return client.passport.verifyJWT(result.accessToken)
      })
      .then(payload => {
        return client.service("users").get(payload.userId)
      })
      .then(user => {
        dispatch(userLogged(user))
        resolve(user)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const loginEmail = (params) => dispatch => {
  const auth = {
    strategy: "local",
    ...params,
  }
  return login(auth, dispatch)
}

export const loginFacebook = (access_token) => dispatch => {
  const auth = {
    access_token,
    strategy: "facebook-token",
  }

  return login(auth, dispatch)
}