import {
  RECORD_LIST,
  RECORD_LOADING,
} from "../constants"

const initialState = {
  loading: false,
  data: [],
}

function records(state = initialState, action) {
  switch (action.type) {
    case RECORD_LIST:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case RECORD_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default records