import moment from "moment"

import {
  RECORD_LIST,
  RECORD_LOADING,
  RECORD_ERROR,
  ADD_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
} from "../constants"

import client from "../client"

export const getRecords = ({ userId, type, month }) => dispatch => {
  let query = {}
  let startDate
  if (type !== 0) {
    query.type = type === 1 ? "expense" : "income"
  }

  if (month === undefined) {
    startDate = moment().startOf("month")
  } else {
    startDate = moment().set({ month }).startOf("month")
  }

  query.date = {
    $gte: startDate.toDate(),
    $lte: startDate.endOf("month").toDate(),
  }

  const records = client.service("records").find({
    query: {
      ...query,
      userId: userId,
      $sort: {
        createdAt: -1,
      },
    },
  })

  dispatch({
    type: RECORD_LOADING,
  })

  records
    .then(({ data }) => {
      dispatch({
        type: RECORD_LIST,
        payload: { data, monthLoaded: month },
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
    const data = {
      title: record.title,
      price: record.price,
      type: record.type === 0 ? "expense" : "income",
      date: record.date,
    }
    const records = client.service("records")

    records.patch(record.id, data, { query: { userId: record.userId } })
      .then(result => {
        dispatch({
          type: UPDATE_RECORD,
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