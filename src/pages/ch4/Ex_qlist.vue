<template>
  <q-page class="q-pa-md">
    <!-- separetor มีเส้นแบ่งค่า -->
    <q-list bordered separator class="rouned-borders" style="max-width: 600px; margin: 0 auto">
      <q-item-label header class="text-h6">My Todo List</q-item-label>
      <!-- แสดงลิสซ์ -->
      <!-- เพิ่ม clickable v-ripple ว่าคลิกได้  -->
      <q-item
        v-for="item in todoList"
        :key="item.id"
        clickable
        v-ripple
        :class="item.done ? 'bg-green-1' : 'bg-white'"
        @click="toggleTodo(item.id)"
      >
        <!-- ตัว checkbox -->
        <q-item-section avatar>
          <!-- ตรวจสอบว่าค่า done เป็น true หรือ false ถ้าเป็น true ก็จะเป็น ซ้าย ไม่ก็ขวา -->
          <q-icon
            :name="item.done ? 'check_circle' : 'radio_button_unchecked'"
            :color="item.done ? 'positive' : 'grey-5'"
            size="28px"
          ></q-icon>
        </q-item-section>
        <!-- ชื่อและรายละเอียด -->
        <q-item-section>
          <q-item-label :class="item.done ? 'text-strike text-grey-6' : 'text-dark'">{{
            item.title
          }}</q-item-label>
          <!-- lines คือกำหนดจำนวนบรรทัดที่อนุญาติให้แสดง -->
          <q-item-label caption lines="1"
            >Due Date: {{ item.duedate }} | {{ item.category }}</q-item-label
          >
        </q-item-section>
        <!-- side จะกำหนดว่าให้อยู่ด้านข้าง -->
        <q-item-section side>
          <q-badge
            :color="getPriorityColor(item.priority)"
            :label="item.priority"
            class="q-pa-xs"
          />
        </q-item-section>
      </q-item>
      <!-- ตรวจสอบว่ามี list ในรายการไหม ถ้าไม่มีให้แสดงอันนี้แทน -->
      <q-item v-if="todoList.length === 0">
        <q-item-section class="text-center text-grey">No List</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<style scoped>
/* ใช้ขีดค่ากลางตัวอักษร */
.text-strike {
  text-decoration: line-through;
}
</style>

<script setup>
import { ref } from 'vue'
// สร้าง list ที่เป็น Array of object
const todoList = ref([
    {
      id: 1,
      title: 'Frontend Class',
      done: false,
      duedate: '2026-09-07',
      category: 'Education',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Shopping',
      done: true,
      duedate: '2026-08-20',
      category: 'Shopping',
      priority: 'low',
    },
    {
      id: 3,
      title: 'Exercise',
      done: false,
      duedate: '2026-09-01',
      category: 'Health',
      priority: 'medium',
    },
])

// function color
const getPriorityColor = (priority) => {
  const color = {
    high: 'negative',
    medium: 'warning',
    low: 'positive',
  }
  // จะส่งค่า priority ออกมาตามค่าความสำคัญที่เรารับ แต่ถ้าไม่ตรงกับสีใด ให้เป็นสีเทา
  return color[priority] || 'grey'
}

// function toggle
const toggleTodo = (id) => {
  const index = todoList.value.findIndex((todo) => todo.id === id)
  if (index !== -1) {
    todoList.value[index].done = !todoList.value[index].done
  }
}
</script>
