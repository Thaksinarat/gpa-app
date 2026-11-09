<!-- ทดลองเรียกใช้ค่าใน .env -->
<template>
    <q-page padding>
        <div class="text-h6">{{ appTitle }}</div>
        <div>API: {{ appURL }}</div>
        <div>Mode: {{ mode }}</div>
    </q-page>
</template>

<script setup>
const appTitle = import.meta.env.QCLI_APP_TITLE
const appURL = import.meta.env.QCLI_API_URL

// ตัวแปร mode ที่มีอยู่แล้วใน quasar
const mode = import.meta.env.MODE
</script>