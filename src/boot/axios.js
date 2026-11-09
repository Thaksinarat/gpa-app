import { defineBoot } from '#q-app'
import axios from 'axios'
// import store auth เข้ามา
import { useAuthStore } from '@/store/auth-store-api'

// ปรับแต่ง baseURL ได้เพื่อลดการเขียนเรียกใช้ api ที่ยาว
// const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })
// baseURL เพื่อเรียกใช้ json-server
// const api = axios.create({ baseURL: 'http://localhost:3000' })
// baseURL โดยกำหนดให้ใช้ค่าจาก env และค่า backup หากไม่สามารถเรียกใช้ค่าหลักได้
const api = axios.create({baseURL: import.meta.env.QCLI_API_URL || 'http://172.26.117.16:3007/api/v1'})


// เพิ่ม interceptors
api.interceptors.request.use((config) => {
  // ตรวจสอบค่าที่ได้จาก store
  const authStore = useAuthStore()
  // config headers
  config.headers['Content-Type'] = 'application/json; charset=UTF-8'

  // ถ้ามี token ให้กำหนด headers
  if (authStore.accessToken) {
    config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
  }
  // return config
  return config

}, (error) => {return Promise.reject(error)})

export default defineBoot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})

export { axios, api }