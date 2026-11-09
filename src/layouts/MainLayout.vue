<!-- ทั้งหมดคือ layout ที่สร้างจาก layout builder -->
<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo/logo-mono-white.svg" />
          </q-avatar>
          Frontend-Dev
        </q-toolbar-title>
        <!-- ปุ่ม Logout เมื่อ user มีค่า ให้แสดงปุ่ม logout -->
        <div v-if="store.user">
          <q-btn flat size="sm" color="negative" icon="logout" @click="onLogout"></q-btn>
        </div>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <!-- ********************* -->
      <!-- ไปที่เว็บ quasar.dev/vue-components/list-and-list-items เพื่อไป copy code ของ list มา -->
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Homepage</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>My Cart</q-item-label>
            <q-item-label caption>selected items</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>Sa Ta Ng</q-item-label>
            <q-item-label>Log out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- ********************** -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
// import auth store เข้ามา
import { useAuthStore } from '@/store/auth-store-api.js'
// import router
import { useRouter } from 'vue-router'
// import เพื่อจะใช้ dialog
import { useQuasar } from 'quasar'

// ประกาศตัวแปร
const store = useAuthStore()
const router = useRouter()
const $q = useQuasar()

// function เอาไว้ handle logout
const onLogout = () => {
  $q.dialog({
    title: 'Log-out',
    message: 'Are you sure you want to log-out?',
    cancel: true,
    // user ไม่สามารถกดที่ว่างเพื่อปิดได้
    persistent: true
  }).onOk(()=> {
    //  ถ้า user คลิกปุ่ม OK
    store.logout()
    $q.notify({
      type: 'positive',
      message: 'Log-out success!',
    })
    // เมื่อกด ok แจ้ง notify แล้ว ให้เด้งกลับไปที่หน้า log-in
    router.replace({name: 'login'})
  })
}

const rightDrawerOpen = ref(false)
// แก้ไขส่วนนี้เพื่อให้หาย error
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
