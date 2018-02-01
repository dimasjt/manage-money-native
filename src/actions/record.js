import {
  RECORD_LIST,
  RECORD_LOADING,
  RECORD_ERROR,
} from "../constants"

import client from "../client"

export const getRecords = ({ userId, type }) => dispatch => {
  let query = {}
  if (type !== 0) {
    query.type = type === 1 ? "expense" : "income"
  }

  const records = client.service("records").find({
    query: {
      ...query,
      userId: userId,
    },
  })

  dispatch({
    type: RECORD_LOADING,
  })

  records
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