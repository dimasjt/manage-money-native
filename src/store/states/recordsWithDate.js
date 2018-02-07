import { groupBy, forEach, flatten } from "lodash"
import moment from "moment"

export default (records) => {
  let data = []
  const grouped = groupBy(records, (record) => {
    return moment(record.createdAt).format("YYYY-MM-DD")
  })

  forEach(grouped, (val, key) => {
    const date = moment(key)

    data.push({
      isHeader: true,
      label: date.format("LL"),
      id: date.unix() * 1000,
    })

    data.push(val)
  })

  return flatten(data)
}
