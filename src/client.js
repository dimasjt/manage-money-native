import feathers from "@feathersjs/feathers"
import rest from "@feathersjs/rest-client"
import auth from "@feathersjs/authentication-client"
import axios from "axios"
import { AsyncStorage } from "react-native"

const BASE_API = "http://192.168.0.144:3030"

const app = feathers()
const restClient = rest(BASE_API)

app.configure(restClient.axios(axios))
app.configure(auth({
  storage: AsyncStorage,
}))

export default app