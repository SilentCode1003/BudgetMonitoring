import Axios from 'axios'
import { API_BMS_URL, API_TS_URL } from '../config'

// Axios.defaults.withCredentials = true

export const ticketAPI = Axios.create({
  baseURL: API_TS_URL,
})

export const budgetAPI = Axios.create({
  baseURL: API_BMS_URL,
})