// สร้าง store
import { defineStore } from "pinia"; 
import { ref, computed } from "vue";

// export ตัวแปร store ของเรา เมื่อจะนำไปเรียกใช้ จะให้เรียกว่าอะไร
// 'auth' ชื่อที่เอาไว้สร้างเป็น browser memmory
export const useAuthStore = defineStore('auth', ()=> {
    // ฟังก๋ชันการทำงาน

    // state
    // ใช้ตรวจสอบว่า user login เข้ามายัง
    const isLogin = ref(false)
    // ชื่อผู้ใช้
    const username = ref('')
    // รหัสล็อกอิน
    const uid = ref(0)


    // Getters (ทำงานคล้าย computed)
    // ตรวจสอบสภานะการ login ของ user
    const loginStatus = computed(() => {
        // ตรวจว่า true/false ให้แสดงข้อความ
        return isLogin.value ? 'Logged in' : 'Logged Out'
    })

    const welcomeMessage = computed(() => {
        // เป็นฟังก์ชันแสดงเมื่อผู้ใช้เข้าระบบ
        return isLogin.value ? `Welcome ${username.value}!` : `Please Login`
    })


    // Action เหมือน function ของ store
    // เมื่อ login ให้เกิดอะไรขึ้น
    const login = (name) => {
        // ให้ =true
        isLogin.value = true
        // ให้ =name
        username.value = name
        // ให้ =101
        uid.value = 101
    } 

    // เมื่อ logout ให้เกิดอะไรขึ้น
    const logout = () => {
        isLogin.value = false
        username.value = ''
        uid.value = 0
    }

    // เราจะให้ components อื่นเข้าถึงค่า store อะไรของเราได้บ้าง   
    return {
        isLogin, username, uid, loginStatus, welcomeMessage, login, logout
    }

},
{persist: {
    pick: ['username', 'uid']
}})
// เพิ่ม persist: true เท่ากับค่าที่เราใส่ลงไปจะเป็นค่าถาวรที่จะถูกเก็บไว้ใน browser memmory เสมอ
// เราสามารถระบุได้ว่าจะ เก็บ หรือ ไม่เก็บ ค่าไหน (ในที่นี้เก็ยค่า username)