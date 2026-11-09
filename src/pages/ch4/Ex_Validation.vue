<template>
  <div class="q-pa-md">
    <!-- เป็นฟอร์มให้ user สามารถกด submit ได้ -->
    <!-- ref สร้างมาเพื่อดูสถานะของ form -->
    <q-form ref="myForm">
      <!-- รับค่า name พร้อมใส่ตัว attribute :rules="[val => !!val || 'ข้อความที่ต้องการแสดง']" -->
      <q-input
        v-model="name"
        label="Your name"
        outlined
        class="q-mb-md"
        :rules="[(val) => !!val || 'Name required.']"
        hide-bottom-space
      ></q-input>

      <q-input
        v-model="age"
        label="Your age"
        outlined
        class="q-mb-md"
        :rules="[
          (val) => (val !== null && val !== '') || 'Age required',
          (val) => (val >= 1 && val <= 120) || 'Age must be 1 - 120',
        ]"
        hide-bottom-space
      ></q-input>
      <!-- เพิ่มปุ่มกด submit form -->
      <!-- ใช้ event click -->
      <q-btn @click="submitForm" label="Add" color="primary"></q-btn>
    </q-form>
  </div>
</template>

<script setup>
// import nextTick เข้ามาเพื่อ delay การประมาณผลทำงาน
import { ref, nextTick } from 'vue'
const name = ref()
const age = ref(0)

// ตัวแปร form
const myForm = ref(null)

// สร้าง function เพื่อนำไปใช้ที่ q-form
const submitForm = () => {
  // ถ้าฟอร์มเรามีค่า ให้ทำอะไร
  if (myForm.value) {
    // ตรวจสอบความถูกต้องตาม :rules ถ้าผ่าน then() ให้ทำอะไร
    myForm.value.validate().then(async (success) => {
      // ถ้าเป็น true
      if (success) {
        console.log('Name: ', name.value)
        console.log('Age: ', age.value)

        // รีเซ็ทค่า
        name.value=''
        age.value=0
        // รอให้การทำงานทั้งหมดเสร็จก่อนแล้วจึงจะ validate อีกครั้ง
        await nextTick();
        // validate ใหม่
        myForm.value.resetValidation()
      } else {
        // ถ้าเป็น false
        console.log('Not Validate!')
      }
    })
  }
}
</script>
