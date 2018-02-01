import {
  RECORD_LIST,
  RECORD_LOADING,
  ADD_RECORD,
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
    case ADD_RECORD:
      return {
        ...state,
        data: state.data.concat(action.payload),
      }
    default:
      return state
  }
}

export default records