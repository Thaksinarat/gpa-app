<template>
  <!-- เมื่อปุ่มโดนคลอก ค่า จะเพิ่มขึ้น -->
  <div class="q-ma-md">
    <q-btn color="primary" icon="add" label="Increase" @click="count++" />
    <q-btn color="secondary" icon="add" label="Add score" @click="state.score++" />
    <q-input v-model="state.user.name" type="text" label="Edit your name" />
    <div class="q-ma-md">
      <p>Count: {{ count }}</p>
      <p>score: {{ state.score }}</p>
      <p>Username: {{ state.user.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const count = ref(0)
// ตัวแปร state เป็น object
const state = ref({
  user: { name: 'Jack' },
  score: 10,
})
// สร้างตัว watcher ค่า count
// มี ค่าใหม่ กับ ค่าเก่า
watch(count, (newValue, oldValue) => {
  console.log(`change count form ${oldValue} to ${newValue}`)
})
// สร้างตัว watchcer ค่า state.score
watch(
  // บอกให้ดูค่าของ คะแนน จากตัวแปร object ที่ชื่อว่า state
  () => state.value.score,
  // ดูแค่ค่าใหม่ ถ้ามีค่าใหม่ให้แสดง New score
  (newValue) => {
    console.log(`New score ${newValue}`)
  }
)
// สร้างตัว watchcer ค่า state.user
watch(
  () => state.value.user,
  (newUser) => {
    console.log(`New user object: ${JSON.stringify(newUser)}`)
  },
  // ให้ watch ค่า object ลึกลงไปเรื่อย ๆ
  { deep: true },
)
</script>
