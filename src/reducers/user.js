import {
  USER_LOGGED,
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
    default:
      return state
  }
}

export default user