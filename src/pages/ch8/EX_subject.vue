<template>
  <q-page class="q-pa-md">
    <!-- ถ้ากำลังดึงข้อมูล -->
    <div v-if="loading">
      <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
    </div>

    <!-- ถ้าโหลดเสร็จแล้ว -->
    <div v-else>
      <q-table
        :columns="columns"
        :rows="subjects"
        row-key="id"
        :loading="loading"
        flat
        bordered
      ></q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/boot/axios'

// เก็บข้อมูลรายวิชาที่ดึงมาจาก api
const subjects = ref([])
// ตอนโหลดหน้าขึ้นมา
const loading = ref(true)
// คอลัมม์ที่จะใช้แสดงผลรายวิชา บนตาราง
const columns = [
  // name จะต้องตรงกันกับชื่อตัวแปรที่จะได้มาจาก GET /subjects
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'code', label: 'รหัสวิชา', field: 'code', align: 'center' },
  { name: 'name', label: 'ชื่อวิชา', field: 'name', align: 'left' },
  { name: 'credit', label: 'หน่วยกิต', field: 'credit', align: 'right' },
  { name: 'score', label: 'คะแนน', field: 'score', align: 'right' },
]

// เมื่อเปิดเพจขึ้นมาให้โหลดค่าและแสดงค่าออกมา
onMounted(async () => {
  try {
    const res = await api.get('/subjects')
    subjects.value = res.data
  } catch (err) {
    console.log('Error: ', err)
    throw err
  } finally {
    loading.value = false
  }
})
</script>
