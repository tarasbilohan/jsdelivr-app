import axios from 'axios'
import packages from './packages'

const npmApiClient = axios.create({
  baseURL: process.env.VUE_APP_NPM_API_BASE_URL || ''
})

const jsDelivrApiClient = axios.create({
  baseURL: process.env.VUE_APP_JSDELIVR_API_BASE_URL || ''
})

export {
  npmApiClient,
  jsDelivrApiClient
}

export default {
  packages
}
