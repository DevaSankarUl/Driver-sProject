import axios from 'axios'

export const  axiosUserInstance = axios.create({
  baseURL:'/api/user'
})
export const axiosAdminInstance = axios.create({
    baseURL:'/api/admin'
})
export const axiosDriverInstance = axios.create({
  baseURL:'/api/Driver'
})
