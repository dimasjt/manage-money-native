import {
  RECORD_LIST,
  RECORD_LOADING,
  RECORD_ERROR,
  ADD_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
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

export const addRecord = (record) => dispatch => {
  return (new Promise((resolve, reject) => {
    const records = client.service("records")

    let data = {
      ...record,
      type: record.type === 0 ? "expense" : "income",
    }

    records.create(data)
      .then(result => {
        dispatch({
          type: ADD_RECORD,
          payload: result,
        })

        resolve(result)
      })
      .catch(error => {
        dispatch({
          type: RECORD_ERROR,
          payload: error,
        })

        reject(error)
      })
  }))
}

export const deleteRecord = (record, user) => dispatch => {
  const records = client.service("records")

  records.remove(record.id, { query: { userId: user.id } })
    .then(() => {
      dispatch({
        type: DELETE_RECORD,
        payload: record,
      })
    })
    .catch(error => {
      dispatch({
        type: RECORD_ERROR,
        payload: error,
      })
    })
}

export const updateRecord = (record) => dispatch => {
  return (new Promise((resolve, reject) => {
    const records = client.service("records")
    client.update(record.id, record)
      .then(result => {
        console.log("result")
        dispatch({
          type: UPDATE_RECORD,
          payload: result,
        })
      })
      .catch(error => {
        dispatch({
          type: RECORD_ERROR,
          payload: error,
        })
      })
  })
}