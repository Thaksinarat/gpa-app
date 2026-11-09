<template>
    <q-page padding>
        <div class="text-h4 q-mb-lg">My Profile</div>
        <!-- ถ้าไม่มีข้อมูลของ user -->
        <div v-if="!profile" class="row justify-center q-mt-xl">
            <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div> 
        <!-- ถ้ามีข้อมูล -->
        <q-card bordered v-else>
            <q-card-section>
                <div class="text-blue">Name: {{ profile.name }}</div>
                <div class="text-blue">Role: {{ profile.role }}</div>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
// import service getProfile เข้ามา
import { getProfile } from '@/services/auth.service';

// ตัวแปรเอาไว้เก็บค่า profile
const profile = ref(null)

// ใช้ getProfile ใน onMounted
onMounted(async () => {
    const res = await getProfile()
    profile.value = res.data.data

})
</script>