<!-- login with API -->
<template>
  <q-page class="flex flex-center bg-grey-2 q-pa-md">
    <q-card class="q-pa-lg shadow-5" style="width: 100%; max-width: 400px; border-radius: 12px">
      <div v-if="store.loading" class="q-mt-md">
        <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
      </div>
      <div v-else>
        <q-card-section class="text-center q-pb-none">
          <q-avatar
            size="64px"
            color="primary"
            text-color="white"
            icon="lock"
            class="q-mb-md"
          ></q-avatar>
          <div class="text-h5 text-weight-bold text-grey-9">Welcome Back</div>
        </q-card-section>
        <q-card-section class="q-pt-md">
          <!-- ช่องใส่ username พร้อมไอคอนด้านหน้า -->
          <q-input
            v-model="username"
            label="Username"
            outlined
            dense
            lazy-rules
            :rules="[(val) => !!val || 'Please enter your username']"
            ><template v-slot:prepend> <q-icon name="person" color="primary"></q-icon> </template
          ></q-input>

          <!-- รหัสผ่าน -->
          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            lazy-rules
            :rules="[(val) => !!val || 'Please enter your password']"
            ><template v-slot:prepend>
              <q-icon name="lock" color="primary"></q-icon>
            </template>
          </q-input>
          <!-- ปุ่ม login -->
          <div class="q-mt-lg">
            <q-btn
              type="submit"
              color="primary"
              label="LOGIN"
              class="full-width text-weight-bold"
              size="lg"
              unelevated
              @click="onLogin"
              :loading="store.loading"
              :disable="!username || !password"
            ></q-btn>
          </div>
        </q-card-section>
        <!-- ให้แสดงข้อความ error ถ้ามี -->
        <q-banner v-if="store.errMsg" class="bg-red-1 text-negative q-mt-md">
          {{ store.errMsg }}
        </q-banner>
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
// import store เข้ามาเพื่อให้ใช้ api ผ่านทาง store และให้ store เก็บข้อมูลจาก api ไว้ในนี้แทนการเรียกใช้ api จาก service โดยตรง
import { useAuthStore } from '@/store/auth-store-api'
import { useQuasar } from 'quasar'
// import เข้ามาเพื่อ route ไปหน้าเพจ profile
import { useRouter } from 'vue-router'

// define ตัวแปร
const $q = useQuasar()
const router = useRouter()
// สร้างตัวแปรเพื่อมาเก็บข้อมูลของ username และ password
const username = ref('')
const password = ref('')
// ข้อความ role ที่จะแสดงผลบนหน้าเว็บ
const roleName = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Admin',
}
// เก็บ errMsg
const errMessage = ref('')
// define store
const store = useAuthStore()

// functions
// สร้าง function login เป็น async function
const onLogin = async () => {
  try {
    // แสดงผล ผลลัพธ์ที่ได้มาจากการ login
    await store.login(username.value, password.value)
    // Notify แสดงชื่อ user และ role
    $q.notify({
      type: 'positive',
      icon: 'check_circle',
      message: `Welcome back, ${store.user.username}`,
      caption: `Role: ${roleName[store.user.role]}`,
    })
    // เครียค่า
    username.value = ''
    password.value = ''
    errMessage.value = ''
    // แสดงค่าที่ได้มาจากการใช้ store
    // console.log(store.accessToken)
    // console.log(store.user)

    // เมื่อ login เสร็จต้องไปที่หน้า profile
    // router.push({name: 'profile'})

    // เมื่อ login สำเร็จ จะต้องตรวจสอบ roles ก่อน
    const role = store.role
    switch (role) {
      case 'admin':
        router.push({name: 'admin'})
        break;
      case 'teacher':
        router.push({name: 'teacher'})
        break;
      default:
        router.push({name: 'profile'})
        break;
    }

    // // แปลงค่าเป็น JSON เพื่ออ่านง่ายขึ้นโดยใช้ JSON.stringify
    // console.log('Response: '+ JSON.stringify( res.data))
  } catch (error) {
    console.log('Error: ', error)
  }
}
</script>
