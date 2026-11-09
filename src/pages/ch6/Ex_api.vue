<template>
  <q-page padding>
    <!-- ปุ่มเรียกใช้ function loadAlbums  -->
    <q-btn color="primary" icon="check" label="Load Albums" @click="albumStore.loadAlbums" />

    <!-- เพิ่ม loading -->
    <div v-if="albumStore.loading" class="q-mt-md">
      <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
    </div>

    <!-- ถ้ามี err ให้แสดง ส่วนแสดง error -->
    <q-banner v-else-if="albumStore.errMsg" class="bg-red-1 text-negative q-mt-md rounded">
      <template #avatar>
        <q-icon name="error" class="negative"></q-icon>
      </template>
      {{ albumStore.errMsg }}
    </q-banner>

    <!-- ถ้าโหลดแล้วไม่มี err ให้แสดง ส่วนแสดง API Data -->
    <q-list v-else bordered separator class="q-mt-md">
      <!-- แต่ละ items จาก albums แสดงผล ตาม key id-->
      <q-item v-for="item in albumStore.albums" :key="item.id">
        <q-item-section>
          <q-item-label class="text-blue">{{ item.title }}</q-item-label>
          <!-- caption คือ ต้องการให้ตัวเล็ก ๆ -->
          <q-item-label caption>Album ID: {{ item.id }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
// มีการเชื่อม api ใน store file แล้ว
// import store เข้ามา
import { useAlbumStore } from '@/store/album-store';
// สร้าง ตัวแปร store
const albumStore = useAlbumStore()
</script>
