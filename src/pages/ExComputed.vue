<template>
    <div class="q-ma-md">
        <q-input v-model="searchText" type="text" label="Type to search" color="teal"></q-input>
        <ul>
            <!-- การใช้ v-for อย่าลืม binding key -->
            <!-- ใช้ item in filterItem -->
            <li v-for="item in filterItem" :key="item.name">
                🔥 {{ item.name }} Price: {{ item.price }} Baht
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const items = ref([
    {name: 'Banana cake', price: 100},
    {name: 'Chese cake', price: 150}
])
// ตัวแปรไว้ผูกกับกล่องข้อความ โดยใช้ v-model
const searchText = ref('')

// สร้าง ฟังก์ชัน ค้นหา โดยใช้ computed()
const filterItem = computed(() => {
    // เราจะส่งค่ากลับ
    return items.value.filter(
        // ส่งค่า item กลับ โดยค่าไอเทมจะต้องถูกค้นหาตามชื่อ(name) โดยใช้ includes() เพื่อให้ไปดึงค่าจากช่องข้อความมาดูว่าตรงกับ item อะไร
        item => item.name.toLowerCase().includes(searchText.value)
    )
})
</script>