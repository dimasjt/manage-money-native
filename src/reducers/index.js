import { combineReducers } from "redux"

import user from "./user"
import records from "./records"

const combinedReducers = combineReducers({
  user,
  records,
})

export default combinedReducers