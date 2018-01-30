import { AsyncStorage } from "react-native"

import {
  USER_LOGGED,
  USER_LOGOUT,
} from "../constants"

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