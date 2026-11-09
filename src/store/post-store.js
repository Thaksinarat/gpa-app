// สร้าง store เพื่อใช้จัดการ api ติดต่อกับฐานข้อมูล
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/boot/axios'

export const usePostStore = defineStore('posts', () => {
  // state
  const postItems = ref([])
  const isLoading = ref(false)

  // function ดึงข้อมูล (GET)
  async function fetchAllPosts() {
    isLoading.value = true
    try {
      // สร้าง api
      const res = await api.get('/posts')
      // เอา daata ที่ได้มาใส่ไว้ ในตัวแปร postItems
      postItems.value = res.data
      console.log('Listing all: ', res.data)
    } catch (error) {
      console.log('Fetch error: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // function เพิ่มโพส (POST)
  async function createNewPost(newPost) {
    try {
      // สร้าง res ขึ้นมาว่า เราจะ post โดยส่งข้อมูลจากตัวแปร newPost
      // const res = await api.post('/posts', newPost, {
      //   // ส่งข้อมูล Headers
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   },
      // })
      const res = await api.post('/posts', newPost)
      console.log('Create success:', res.data)
      // .unshift คือแทรกไปใน array ที่ index แรกเสมอ
      postItems.value.unshift(res.data)
    } catch (error) {
      console.log('Create Error:', error)
    }
  }

  // function อัปเดต (PUT) รับค่า id เพื่อระบุว่าจะแก้ไขไอดีอันไหน + ข้อมูลใหม่ที่อัปเดต
  async function updatePost(id, updateData) {
    try {
      // const res = await api.put(`/posts/${id}`, updateData, {
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   },
      // })
      const res = await api.put(`/posts/${id}`, updateData)
      console.log('Update Success: ', res.data)

      // หา index ที่ตรงกันกับค่า id ที่เรารับเข้ามาก่อน กับ postItems
      const index = postItems.value.findIndex((item) => item.id == id)
      // ถ้าหาเจอ และ index ไม่เท่ากับ -1 ให้ค่าของ postItems.value[index] เท่ากับค่า res.data ที่รับมาใหม่(UpdateData)
      if (index !== -1) postItems.value[index] = res.data
    } catch (error) {
      console.log('Update Error:', error)
    }
  }

  //   function ลบ (DELETE)
  async function deletePost(id) {
    try {
      await api.delete(`posts/${id}`)
      console.log('Delete success: ', id)
      // ลบไอดีที่ได้ ลบออกไป โดยให้เลือกเก็บเฉพาะข้อมูลที่มีไอดี ไม่ตรง กับค่า id ที่รับเข้ามา
      postItems.value = postItems.value.filter((item) => item.id !== id)
    } catch (error) {
      console.log('Delete error: ', error)
    }
  }
  //   function ฟิลเตอร์ ดูข้อมูลเฉพาะที่ต้องการ
  async function filterPost(userId) {
    // มีการโหลดข้อมูล ในกรณีที่ข้อมูลเยอะ
    isLoading.value = true
    console.log(userId)
    try {
      // ค่าข้อมูลที่ดึงมาจาก db โดยกรองเฉพาะ userId ที่เราต้องการ
      const res = await api.get(`/posts?userId=${userId}`)
      // นำค่า data ที่ได้มาใส่ใน postItems
      postItems.value = res.data
      // แสดง log ข้อความ
      console.log(`Filter userId ${userId} success`, res.data)
    } catch (error) {
      console.log('Filter Error: ', error)
    } finally {
      isLoading.value = false
    }
  }
  //   function GET คอมเมนต์
  async function fetchComments(id) {
    try {
      // ค่า comments ของ userId ${id} ที่เราต้องการ
      const res = await api.get(`/posts/${id}/comments`)
      console.log(res)
      console.log(`comment for post id: ${id}`, res.data)
      // ส่งค่าคอมเมนต์กลับไป
      return res.data
    } catch (error) {
      console.log('Fetch comments Error: ', error)
    }
  }
  // return เพื่อนำไปใช้หน้าอื่น ๆ
  return {
    postItems,
    isLoading,
    fetchAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    filterPost,
    fetchComments,
  }
})
