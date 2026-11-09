<template>
    <div>
        <!-- :product คือชื่อของตัวแปรที่เราตั้งค่าไว้ใน children ให้เรา binding มันเข้าด้วยกัน กับ p ที่เป็นค่าที่ v-for ออกมาจาก products -->
        <ProductCard v-for="p in products" :key="p.id" 
        :product="p" @add-to-cart="handleAddToCart">
        <!-- ใช้ tempate tag เรียกชื่อ slot ที่ตั้งค่าไว้ใน Child เพื่อให้ HTML ที่เราตั้งไว้ในนี้ไปแสดงในส่วนที่มี slot เป็นชื่อเดียวกัน -->
        <template #card-header>Product No. {{ p.id }}</template>
        <template #test>OK</template>
        </ProductCard>
    </div>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { ref } from 'vue';
import { useMeta } from 'quasar';
useMeta(
    {title: "รายการสินค้า"}
)
// ค่าที่จะส่งไปยัง productCard
const products = ref([
    {id: 1, name: 'Product01', price: 100, image: '/images/01.jpg'},
    {id: 2, name: 'Product02', price: 200, image: '/images/02.jpg'}
])

// สร้างฟังก์ชันรับ event(@add-to-cart) ซึ่ง children ส่งค่า parameter(product) กลับมา จึงมีการรับ parameter product เข้ามาด้วย
const handleAddToCart = (product) => {
    console.log("Add: ", product.name, product.price, "Bath")
}
</script>