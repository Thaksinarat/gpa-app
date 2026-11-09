<template>
    <!-- แสดงผล product ที่ได้มาจาก ProductMain -->
    <q-card class="q-ma-md">
        <!-- แสดงภาพ มีการใช้ spinner เมื่อรอโหลดภาพ -->
        <q-img :src="product.image" style="height: 140px; max-width: 150px;"
        spinner-color="grey" spinner-size="82px"></q-img>
        <q-card-section>
            <!-- สร้าง slot -->
            <slot name="card-header"></slot>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2">{{ product.price }}</div>
            <slot name="test"></slot>
        </q-card-section>
        <q-card-section vertical>
            <!-- เมื่อ user คลิกปุ่มนี้ให้ไปใช้ฟังก์ชั่น AddToCart -->
            <q-btn outline label="Add to cart" @click="addToCart"/>
        </q-card-section>
    </q-card>
</template>

<script setup>
// กำหนดค่า props ที่รับมาจาก parent
// required: true คือ ต้องมีการส่งค่ามาให้ ถ้าไม่ส่งมาจะ error
const props = defineProps({
    // ชื่อตัวแปร product เพื่อรับ props จาก parent
    product: {
        // Data type ของ props
        type: Object,
        // props ตัวนี้จำเป็นต้องส่งค่ามาไหม?
        required: true
    }
})

// สร้างฟังก์ชัน
const addToCart = () => {
    // สร้างค่า Emit event ไว้ส่งค่ากลับไปที่ Parent โดยโยน props.product กลับไป
    emit('add-to-cart', props.product)
}

// สร้าง emit event ชื่อ event ว่า add-to-cart เพื่อส่งกลับไปหา Parent 
// โดยในไฟล์ parent จะมีการสร้าง ตัวรับ event ไว้อีกที
const emit = defineEmits(['add-to-cart'])
</script>