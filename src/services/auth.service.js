// ตั้งชื่อไฟล์ที่มี .servicce เพื่อบอกว่าไม่ได้เป็นโค้ดแสดงผล
import { api } from "@/boot/axios";

// รับค่า username กับ password
export const login = (username, password) => {
    // ลิงก์ api ที่ใช้ login พร้อมส่งค่า username และ password ไปด้วย
    return api.post('/auth/login', {username, password})
}

// api ดึงค่า profile
export const getProfile = () => {
    return api.get('/profile')
}

