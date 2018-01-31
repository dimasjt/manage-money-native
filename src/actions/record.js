import {
  RECORD_LIST,
  RECORD_LOADING,
  RECORD_ERROR,
} from "../constants"

import client from "../client"

export const getRecords = () => dispatch => {
  const records = client.service("records")
  dispatch({
    type: RECORD_LOADING,
  })

  records.find()
    .then(({ data }) => {
      dispatch({
        type: RECORD_LIST,
        payload: data,
      })
    })
    .catch((error) => {
      dispatch({
        type: RECORD_ERROR,
        payload: error,
      })
    })
}