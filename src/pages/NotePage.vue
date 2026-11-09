<!-- สร้างโน๊ตเพื่อเปิดแล้วเข้าดูรายละเอียดโน๊ตได้ -->
<template>
  <div>Note Page</div>
  <div v-for="note in notes" :key="note.id">
    <!-- เป็น btn-icon ที่ใช้ลิงก์หน้าไปเพื่อดูรายละเอียด -->
    <div>
      {{ note.id }} - {{ note.name }}
      <!-- ใช้การ route แบบเรียกฟังก์ชัน -->
      <q-icon name="description" @click="viewNote(note)" />
    </div>
  </div>
  <div>
    <!-- ใช้การ route แบบตรง ๆ -->
    <q-btn color="primary" label="New Note" @click="$router.push({ name: 'NewNote' })" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const notes = ref([
  { id: 1, name: 'Task1' },
  { id: 2, name: 'Teask2' },
])

// ฟังก์ชัน
const viewNote = (note) => {
  router.push({
    name: 'NoteDetail',
    params: {id: note.id},
  })
}
</script>
