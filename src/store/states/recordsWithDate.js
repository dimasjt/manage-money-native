import { groupBy, forEach, flatten } from "lodash"
import moment from "moment"

const filtered = (records, type) => {
  return records.filter((record) => {
    if (record.isHeader) {
      return true
    }

    switch (type) {
      case 1:
        return record.type === "expense"
      case 2:
        return record.type === "income"
      default:
        return true
    }
  })
}

export default (records, type) => {
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

  return filtered(flatten(data), type)
}
