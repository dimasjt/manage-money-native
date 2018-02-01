import {
  RECORD_LIST,
  RECORD_LOADING,
  ADD_RECORD,
  DELETE_RECORD,
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
    case DELETE_RECORD:
      return {
        ...state,
        data: state.data.filter((record) => record.id !== action.payload.id),
      }
    default:
      return state
  }
}

export default records