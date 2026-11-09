import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/boot/axios'

export const useAlbumStore = defineStore('album', () => {
  // state
  // ตัวแปรอัลบั้ม
  const albums = ref([])
  // เพิ่มตัวแปร loading เพื่อตรวจสอบว่าเรากำลังดึงข้อมูลอยู่หรือเปล่า
  const loading = ref(false)
  // ตัวแปรเก็บค่า err
  const errMsg = ref('')

  //   action
  // สร้าง function
  async function loadAlbums() {
    // กำหนดค่าตัวแปรเริ่มต้นเมื่อกดใช้งาน function
    loading.value = true
    errMsg.value = ''
    // ใช้ try-catch เพื่อป้องกัน error ที่จะเกิดขึ้น
    try {
      // สร้าง api
      const respones = await api.get('/albums')
      // ให้ data จากที่ get มาเก็บไว้ที่ตัวแปร albums ที่สร้างไว้ เพื่อนำไปแสดงผลในหน้าเพจ
      albums.value = respones.data
    } catch (error) {
      // ถ้ามี err จาก server
      if (error.respones) {
        errMsg.value = `Server Error (${error.respones.status})`
      } else if (error.requst) {
        errMsg.value = 'Unable to connect to server'
      } else {
        errMsg.value = error.message
      }
      console.log(error)
    } finally {
      loading.value = false
    }
  }
  //   ส่งค่าออกเพื่อนำไปใช้ในไฟล์อื่น ๆ
  return { albums, loading, errMsg, loadAlbums }
})
