import { format } from "currency-formatter"

const money = (num) => {
  return format(num, { code: "IDR" })
}

export default money