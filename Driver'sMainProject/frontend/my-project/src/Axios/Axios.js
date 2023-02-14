import axios from 'axios'

export const  axiosUserInstance = axios.create({
  baseURL:'http://localhost:4000/api/user'
})
export const axiosAdminInstance = axios.create({
    baseURL:'http://localhost:4000/api/admin'
})
export const axiosDriverInstance = axios.create({
  baseURL:'http://localhost:4000/api/Driver'
})
