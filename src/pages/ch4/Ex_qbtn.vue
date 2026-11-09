<template>
  <!-- ถ้าอยู่ภายใต้ main layout ต้องมี a-page -->
  <q-page padding>
    <!-- !!การใช้ปุ่มธรรมดา -->
    <!-- unelevated = ไม่เอาเงา -->
    <!-- icon สามารถหามาใส่ได้จากหลายที่ -->
    <q-btn unelevated color="info" text-color="black" icon="favorite_border" label="SAVEME" />

    <!-- ไม่มี BG outline-btn -->
    <q-btn outline label="No BG" />

    <!-- เส้นแบ่ง -->
    <q-separator spaced size="1px" color="grey" />
    <!-- ปุ่มกลม round-shape -->
    <q-btn round color="negative" icon="share" />

    <!-- ใส่ช่องว่าง -->
    <q-space />
    <!-- ปุ่มสี่เหลี่ยมมนๆ Pill-shape -->
    <q-btn rounded color="green" label="Confirm" />

    <q-separator spaced size="1px" color="grey" />

    <!-- !!การจัดกลุ่มให้กับ btn -->
    <q-btn-group push>
      <q-btn push label="Yesterday" />
      <q-btn push label="Today" />
      <q-btn push label="Tomorrow" />
    </q-btn-group>
    <q-separator spaced size="1px" color="grey" />

    <!-- !!ปุ่มที่กดแล้วแสดงตัวโหลด -->
    <!-- เพิ่ม attributte :loading ผูกไว้กับค่า isSaving -->
    <!-- ให้ binding label ไว้ด้วย ถ้า กำลัง save ให้แสดงคำ saving... ถ้าไม่ให้แสดงว่า save -->
    <q-btn
      :loading="isSaving"
      color="yellow"
      icon="save"
      :label="isSaving ? 'saving...' : 'saved'"
      @click="save"
    >
      <template v-slot:loading>
        <q-spinner-dots color="white" size="3rem" :thickness="2" class="on-left" />saving...
      </template>
    </q-btn>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const isSaving = ref(false)

// function แม่ แบบ async
// async คือการทำงานหลาย ๆ บรรทัดพร้อม ๆ กัน
const save = async () => {
  isSaving.value = true

  // ฟังก์ชันแม่จะต้องรอให้ฟังก์ชันลูกทำงานให้เสร็จก่อนถึงจะทำงานเสร็จจริง ๆ เพื่อป้องกัน error
  try {
    // สร้างฟังก์ชันย่อย(ลูก) เอาไว้ delay เวลาถอยหลัง 2วินาที
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Data saved!')
  } catch (error) {
    console.log('Error:', error)
  } finally {
    // สุดท้ายจะปรับตัวแปรให้เป็น false
    isSaving.value = false
  }
}
</script>
