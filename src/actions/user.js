import {
  USER_LOGGED,
} from "../constants"

export const userLogged = (user) => ({
  type: USER_LOGGED,
  payload: user,
})