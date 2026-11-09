// สร้าง store เพื่อเรียกใช้ api จาก json-server
import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/boot/axios";

export const useSubjectStore = defineStore('subjects', () => {
    const subjects = ref([])

    // ดึงค่าทั้งหมดมา
    async function fetchAll() {
        try{
            const res = await api.get('/subjects')
            // ดึงค่ามาแล้วใส่ใน subjects
            subjects.value = res.data
            console.log("Subjects: ", subjects.value)
        } catch(error) {
            console.log("Subjects API Error: ", error)
        }
    }

    return {
        subjects,
        fetchAll
    }
})