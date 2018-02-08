import { uniqBy, uniq, compact } from "lodash"
import {
  RECORD_LIST,
  RECORD_LOADING,
  ADD_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
} from "../constants"

const initialState = {
  loading: false,
  data: [],
  loadedMonths: [],
}

function records(state = initialState, action) {
  switch (action.type) {
    case RECORD_LIST:
      return {
        ...state,
        loading: false,
        data: uniqBy(state.data.concat(action.payload.data), (r) => r.id),
        loadedMonths: compact(uniq(state.loadedMonths.concat(action.payload.monthLoaded))),
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
    case UPDATE_RECORD:
      return {
        ...state,
        data: state.data.map(record => {
          if (record.id === action.payload.id) {
            return {
              ...record,
              ...action.payload,
            }
          }

          return record
        }),
      }
    default:
      return state
  }
}

export default records