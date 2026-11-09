<template>
    <q-page padding>
        <q-card shadow-3 bg-grey-2 class="q-ma-md note-card">
            <q-card-section>
                <div class="text-h6">My Note</div>
                <div class="text-body-2">This is a body card.</div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<!-- กำหนด scoped การใช้งานเป็นแค่ในไฟล์นี้เท่านั้น -->
<style scoped>
/* กำหนดความมนให้กับ card */
.note-card {
    border-radius: 16px;
    cursor: pointer;
}
/* สร้าง class เพิ่มตอนที่ hover */
.note-card:hover {
    box-shadow: 0 8px 12px blue !important;
}
</style>