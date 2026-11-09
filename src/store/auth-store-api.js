// การปรับใช้ store ให้เก็บค่าที่ได้มาจาก api
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import service เข้ามาใช้งาน โดยให้ใช้ชื่อ loginService แทนเพื่อไม่ให้ซ้ำกับ const login
import { getProfile, login as loginService } from '@/services/auth.service'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // state
    const user = ref(null)
    // เมื่อเรา login เสร็จเราจะได้ accessToken เพื่อยืนยันว่าเขาคือใคร?
    const accessToken = ref(null)
    //   กำหนดตัวโหลด
    const loading = ref(false)
    // errMsg
    const errMsg = ref('')
    // role ตรวจสอบว่ามีค่า role ไหม ถ้ามีส่ง user.value.role ถ้าไม่ null
    const role = computed(() => user.value.role ?? null)
    //   ตรวจสอบว่ามีการ authen ยัง
    const isAuthenticated = computed(() => accessToken.value !== null)

    // function login รับค่า username กับ password
    const login = async (username, password) => {
      // ระหว่างการเรียกใช้ api ให้ตั้งค่า loading เป็น true ก่อน เมื่อระบบทำงานเสร็จสิ้นให้กำหนดเป็นค่า false
      loading.value = true
      errMsg.value = ''

      try {
        // ปกติการเรียกใช้ api จะทำอยู่ในไฟล์เดียวคือไฟล์ service เพื่อง่ายต่อการเรียกใช้และแก้ไข
        // ให้เรียกใช้ function loginService จากที่ import มา
        const res = await loginService(username, password)

        // กำหนด accessToken
        accessToken.value = res.data.data.accessToken
        user.value = res.data.data.user
        return res
      } catch (err) {
        // ค่า err เอาไปแทนข้อความ error ถ้ามีค่า / ในกรณีที่ไม่มีค่าจะแสดงข้อความที่กำหนดแทน
        errMsg.value = err.response?.data?.message ?? 'Unable to login'
        throw err
      } finally {
        loading.value = false
      }
    }

    // function logout เครียค่าเริ่มต้นของ user และ accessToken
    const logout = () => {
      user.value = null
      accessToken.value = null
      errMsg.value = ''
      loading.value = false

    }

    // ตรวจสอบ acess token
    const checkAuth = async () => {
      // มีไหม ถ้าไม่มี return false
      if (!accessToken.value) {
        return false
      }

      // ถ้ามี
      try {
        await getProfile()
        return true
      } catch(error) {
        console.log("error: ",error)
        logout()
        return false
      }
    }

    // return เพื่อให้ไฟล์อื่นใช้งานได้
    return {
      user,
      accessToken,
      login,
      logout,
      loading,
      isAuthenticated,
      errMsg,
      role,
      checkAuth,
    }
  },
  {
    persist: true,
  },
)
