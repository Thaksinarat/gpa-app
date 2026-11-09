<template>
  <q-page class="q-pa-md">
    <!-- filter ตาม filterText จากช่อง q-input -->
    <q-table
      title="My records"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filterText"
      :pagination="pagination"
      :loading="isLoading"
      selection="single"
      v-model:selected="selected"
      flat
      bordered
    >
      <!-- สร้างช่องค้นหา -->
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filterText" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- ปรับการแสดงผลของ คอลัมม์ score ใน table ใช้ชื่อ (name) คอลัมม์ ที่เราต้องการ -->
      <template v-slot:body-cell-subjectScore="props">
        <q-td :props="props">
          <q-chip :color="props.row.score > 50 ? 'green' : 'red'" text-color="white">{{
            props.row.score
          }}</q-chip>
        </q-td>
      </template>
    </q-table>
    <!-- แสดงผลออกมา โดยใช้ JSON.stringify() แปลงค่าก่อนแสดงออกมา เพื่อให้อ่านง่าย -->
    <div>Selected Value: {{ JSON.stringify(selected) }}</div>
  </q-page>
</template>
<script setup>
// กำหนด header หรือหัวคอลลัมม์
import { onMounted, ref } from 'vue'
// ตัวค้นหา
const filterText = ref('')
// เอาไว้จัดการการแสดงผลหน้า
const pagination = ref({
  sortBy: 'subjectScore',
  descending: false,
  page: 1,
  rowsPerPage: 3,
})
// เอาไว้ตรวจสอบการโหลดข้อมูล
const isLoading = ref(true)
// ตัวแปรเอาไว้เลือก ซึ่งเลือกได้หลายค่า
const selected = ref([])


const columns = ref([
  // name เอาไว้ ref ว่า objects นี้ชื่ออะไร
  // label ชื่อขอคอลัมม์ แสดงผลให้ user เห็น
  // field คือเอาไว้เชื่อมกับ name ใน rows
  { name: 'subjectName', label: 'Name', field: 'name', align: 'left' },
  { name: 'subjectScore', label: 'Score', field: 'score', align: 'center' },
])
const rows = ref([
  { id: 1, name: 'Math', score: 54 },
  { id: 2, name: 'English', score: 49 },
  { id: 3, name: 'Thai', score: 80 },
  { id: 4, name: 'Computer', score: 88 },
  { id: 5, name: 'Art', score: 45 },
])

// จำลองการโหลดข้อมูล function ที่อยู่ใน onMounted จะถูกเรียกใช้ตั้งแต่แรกที่เพจถูกเรียก
onMounted(() => {
    // ให้ค่า loading เป็น false เมื่อผ่านไป 5 วินาที
    setTimeout(() => {isLoading.value = false, 5000})
})
</script>
