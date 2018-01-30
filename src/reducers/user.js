import {
  USER_LOGGED,
  USER_LOGOUT,
} from "../constants"

const initialState = {
  logged: false,
  data: null,
}

function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED:
      return {
        logged: true,
        data: action.payload,
      }
    case USER_LOGOUT:
      return {
        logged: false,
        data: null,
      }
    default:
      return state
  }
}

export default user