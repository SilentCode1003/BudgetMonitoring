import Axios from 'axios'
import { API_BASE_URL } from '../config'

// Axios.defaults.withCredentials = true

export const axios = Axios.create({
  baseURL: API_BASE_URL,
})