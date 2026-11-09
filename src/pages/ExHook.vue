<template>
  <div class="q-ma-md">
    <p>ค่าปัจจุบัน: {{ count }}</p>
    <q-btn color="primary" icon="add" label="ADD" @click="increment" />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'
const timer = ref(null)
const count = ref(0)

const increment = () => {
    count.value++
}

// ใช้เมื่อโหลด component
onMounted(() => {
  console.log('component loaded!')
  // นับเวลาถอยหลัง ด้วย setInterval() ก่อนจะแสดง console.log
  timer.value = setInterval(() => {
    console.log('⌚Time working....')
  }, 5000)
})
// ใช้เมื่อหยุดแสดง component
onUnmounted(() => {
  console.log('remove component')
  // เครียค่าเวลาของ timer
  clearInterval(timer.value)
})
// ใช้เมื่อมีการ update ในส่วน tempalte ของ component จะทำงาน
onUpdated(() => {
  console.log(`count: ${count.value}`)
})
</script>
