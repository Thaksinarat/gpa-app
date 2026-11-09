<template>
  <div class="q-pa-md">
    <!-- เมื่อมีการกดปุ่มให้เปลี่ยนค่า confirmDialog เป็น true -->
    <q-btn color="primary" label="Delete" @click="confirmDialog = true"></q-btn>
  </div>

  <!-- สร้าง dialog เอาไว้ก่อนเรียก ต้องผูกไว้กับตัวแปรของเรา -->
  <!-- เพิ่ม persisten เพื่อกันกดตรงอื่นแล้วไดอาล็อกมันปิด -->
  <q-dialog v-model="confirmDialog" persistent>
    <q-card class="q-pa-md" style="min-width: 300px">
      <!-- ส่วนของข้อความ และไอคอน -->
      <!-- แสดงปลเป็นแถว ให้จักกึ่งกลาง -->
      <q-card-section class="row items-center">
        <q-icon name="warning" color="amber" size="48px" class="q-mr-md"></q-icon>
        <div>
          <div class="text-h6">Confirm</div>
          <div class="text-body-2">Are you sure to delete?</div>
        </div>
      </q-card-section>

      <!-- ส่วนของปุ่ม -->
      <q-card-section>
        <!-- v-close-pop-up ใส่ไว้เพื่อบังคับให้กดปุ่ม -->
        <q-btn label="cancle" v-close-pop-up></q-btn>
        <q-btn color="negative" label="confirm delete" @click="deleteAction" v-close-pop-up></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
// สร้างตัวแปรเอาไว้ตรวจสอบสถานะของ dialog
// กำหนดให้เป็น false คือยังไม่่แสดงผลก่อน
const confirmDialog = ref(false)

// สร้าง function deleteAction
const deleteAction = () => {
    $q.notify({
        message: 'Delete Success!',
        color: 'positive',
        icon: 'check',
        position: 'top',
        timeout: 2000
    })
    console.log("Delete success!")
    // กำหนดค่า confirmDialog ใหม่ เพื่อปิดมัน
    confirmDialog.value = false

}
</script>
