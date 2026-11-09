<template>
  <q-page padding>
    <q-card class="q-pa-md">
        <q-card-section>
            <div class="text-h6">
                Authenication
            </div>
        </q-card-section>

        <q-card-section>
            <!-- เรียกใช้ตัวแปร uid จาก store ผ่านตัวแปร authStore -->
            <p>UID: {{ authStore.uid }}</p>
            <p>Username: {{ authStore.username }}</p>
            <p>Status: {{ authStore.loginStatus }}</p>
            <p>{{ authStore.welcomeMessage }}</p>
        </q-card-section>

        <q-card-section>
            <!-- ปุ่ม login -->
            <q-btn color="primary" label="Login" @click="authStore.login('Thaksinarat')" />
            <!-- ปุ่ม logout -->
            <q-btn color="negative" label="Logout" @click="authStore.logout()" />
        </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// import store เข้ามา
import { useAuthStore } from '@/store/authStore'

// เอาไฟล์ store ที่ import มาสร้างตัวแปรก่อนนำไปใช้
const authStore = useAuthStore()

</script>
