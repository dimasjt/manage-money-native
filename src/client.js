import feathers from "@feathersjs/feathers"
import rest from "@feathersjs/rest-client"
import axios from "axios"

const BASE_API = "http://192.168.0.144:3030"

const app = feathers()
const restClient = rest(BASE_API)

app.configure(restClient.axios(axios))

export default app