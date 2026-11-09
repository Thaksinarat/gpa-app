<template>
    <div class="q-ma-md">
        <!-- สร้างปุ่ม 1 ปุ่มให้ user กด -->
        <q-btn label="OK" @click="saveNote"></q-btn>
    </div>
</template>

<script setup>
// เพิ่มตัว use
import { useQuasar } from 'quasar';
// ประกาศตัวแปร 1 ตัวเวลาใช้ plugin ต้องขึ้นต้นด้วย $ เสมอ
const $q = useQuasar()

// สร้าง function
const saveNote = () => {
    // เรียกใช้ Notify เพื่อสร้าง object Notify ขึ้นมา
    $q.notify({
        // บอกสี
        type: 'positive',
        // ข้อความที่จะแสดง
        message: 'Save Completed',
        // กำหนดตำแหน่ง
        position: 'top-right',
        // ระยะเวลาการแสดงผล
        timeout: '2000',
        // กำหนดไอคอนได้
        icon: 'save',
    })
}
</script>