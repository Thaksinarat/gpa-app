<template>
  <div class="q-ma-md">
    <q-btn label="โหลดข้อมูล" @click="loadData"></q-btn>
    <q-btn color="purple-5" label="Call The Herta!" @click="callHertar"></q-btn>
    <q-btn color="primary" icon="check" label="OK" @click="globalLoad" />
  </div>
</template>

<script setup>
// ถ้าอยากเพิ่ม spinner แบบอื่น ๆ ให้ import
import { useQuasar, QSpinnerFacebook } from 'quasar'

// สร้างตัวแปรเพื่อ use
const $q = useQuasar()

// สร้าง function เรียก loading
const loadData = () => {
  // เรียกใช้ loading.show
  $q.loading.show({
    message: 'กำลังโหลดจ้าา รอแป๊บบ...',
    // เพิ่มเพื่อบอกว่าจะใช้ spinner ของ QspinnerFacebook
    spinner: QSpinnerFacebook,
    // สีของ spinner
    spinnerColor: 'blue-4',
    // ขนาดของ spinner
    spinnerSize: 200,
    // สีพื้นหลัง
    backgroundColor: 'pink-2',
    // สีตัวอักษร
    messageColor: 'blue',
  })
  // เวลา delay
  setTimeout(() => {
    // หมดเวลา 5วิ แล้วทำอะไรต่อ
    // ให้ปิดไป .hide()
    $q.loading.hide()
    // ให้แสดงข้อความเด้งtost
    $q.notify({
      type: 'positive',
      message: 'โหลดเสร็จแล้วจ้า',
      position: 'top',
    })
  }, 5000)
}

// ///////////////////////////////////////////
const callHertar = () => {
  $q.loading.show({
    // ปิด spinner ของ quasar ก่อน
    spinner: null,
    message: `<div class='text-center'>
                <img src="https://media.tenor.com/7lHdnabfyTQAAAAj/herta-kurukuru.gif" style="width:400px; height: 332px">
                <div class="q-mt-md text-h6">KuruKuru Kururing...</div>
            </div>`,
    // บอกว่าเราจะใช้ html
    html: true,
    backgroundColor: 'dark',
    messageColor: 'purple-2',
  })

  setTimeout(() => {
    $q.loading.hide()
  }, 10000)
}
// /////////////////////
const globalLoad = () => {
    $q.loading.show()
}
</script>
