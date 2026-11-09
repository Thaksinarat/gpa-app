<template>
  <!-- เลเอาท์ของตัว quasar -->
  <q-page padding>
    <!-- แสดงผลเป็นแถวแนวนอน ให้อยู่ตรงกลาง -->
    <div class="row items-center">
      <!-- col-xs-12 = ให้แสดงผล 12 คอลัมม์ในหน้าจอขนาด มือถือ(xs) col-md-6 = ให้แสดงผล 6 คอลัมม์ในหน้าจอขนาด labtop(md) -->
      <div class="col-xs-12 col-md-6">
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, nam?</p>
      </div>

      <!-- col-xs-12 = ให้แสดงผล 12 คอลัมม์ในหน้าจอขนาด มือถือ(xs) col-md-6 = ให้แสดงผล 6 คอลัมม์ในหน้าจอขนาด labtop(md) -->
      <div class="col-xs-12 col-md-6">
        <img
          src="https://i.pinimg.com/1200x/8b/64/cc/8b64ccd8b58932d127928e425b0a5b24.jpg"
          alt="Sea"
          width="400"
        />
        <img
          src="https://i.pinimg.com/736x/97/7e/f8/977ef8302c3ebbb7da1ec20ee0834c3f.jpg"
          alt="Sea"
          width="400"
        />
      </div>

      <!-- กำหนด offest ของขนาดมือถือเป็น 1 เพื่อกำหนดระยะขอบให้กับ objects ภายใน -->
      <div class="col-xs-12 col-md-6 offset-xs-1">offset</div>

      <!-- ปุ่ม -->
      <div>
        <!-- ตั้งค่า padding และ margin ใน class -->
        <q-btn color="primary" icon="home" label="MyButton" class="q-px-xl q-py-lg q-ma-md" />
      </div>

      <!-- ตั้งค่า text ขนาด/รูปแบบ/สี -->
      <div class="text-suptitle1 text-italic text-secondary">Vue.js</div>
    </div>

    <!-- ======================= วันที่ 3 -->
    <div>
      <!-- เรียกแสดงผลตัวแปร -->
      {{ msg.toUpperCase() }}
      <p>test: {{ a }}</p>
      {{ 15+3 }}

      <!-- ลองใช้งานตัวแปร boolean -->
      <!-- เป็นเงื่อนไข if-else ตรวจสอบเงื่อนไข isActive ถ้าเป็น true แสดง open ถ้าเป็น false แสดง close -->
      {{ isActive ? 'open' : 'close' }}

      <!-- การผูกค่า HTML Attribute (binding) -->
      <!-- ใช้ :Attribute="{ตัวแปร}" => เครื่องหมายโคลอนนำหน้า Attribute นั้น ๆ -->
      <img :src="url" width="400">
      <q-btn :color="my_color" icon="check" label="OK" @click="onClick" />
    </div>

    <!-- ------------------------------------------------------------------------ -->
    <!-- การใช้เงื่อนไข v-if v-else -->
    <!-- v-if="{เงื่อนไขที่ต้องการเช็ค}" -->
    <div v-if="isLogged">Welcome</div>
    <div v-else>Please Login</div>

    <!-- ตรวจสอบตัวแปร score -->
    <div v-if="score >= 80">Excellent</div>
    <div v-else-if="score >= 50">Pass</div>
    <div v-else>Fail</div>

    <!-- v-show เอาไว้แสดงผล หรือ ซ่อนการแสดงผล True คือ แสดงผล False คือ ไม่แสดงผล -->
    <div v-show="isVisible">Show or hide</div>
    <!-- สร้างปุ่มสลับการแสดงผลระหว่าง show hide ใช้การ binding ใน label และใส่คำสั่งสลับค่า isVisible เมื่อกด @click -->
    <q-btn color="primary" :label="isVisible ? 'hide' : 'show'" @click="isVisible = !isVisible" />

    <!-- v-for แสดงผล items -->
    <ul>
      <!-- v-for="item in items" คือการ loop ค่า item ออกมาจาก items ทีละตัว -->
      <!-- :key="item.id" ที่ใช้ item.id เพราะค่า id เป็นค่าที่ไม่ซ้ำกันของข้อมูลทั้งหมด (primary key)-->
      <!-- !!(ในกรณีที่ไม่มีค่า primary) ให้ใช้ค่า index แทนได้ => v-for="(item, index) in items" :key="index" -->
      <li v-for="item in items" :key="item.id">
        <!-- แสดงค่า name และ price ของ item แต่ละตัวที่อยู่ใน items -->
        {{item.name}} - {{ item.price }} บาท
      </li>
    </ul>

    <!-- v-on + v-model โดยสร้างแบบฟอร์มให้ user กรอกข้อมูล -->
    <!-- v-on เรียกใช้โดยใช้ @ เช่น @reset = "onReset" -->
    <!-- !! @submit.prevent เพื่อป้องกัน ให้ vue หยุดการทำงานทุกอย่างก่อนจะ submit กันผิดพลาด -->
     <form @reset="onReset" @submit.prevent="onSubmit">
      <!-- เพิ่ม gutter ระยะขอบ -->
      <div class="q-gutter-md">
        <!-- v-model คือการ binding เช่นกัน -->
        <q-input type="text" label="Your username" v-model="username"></q-input>
        <!-- ตั้งค่า @keyup เมื่อกด alt กับ enter พร้อมกัน ระบบจะเรียกฟังก์ชัน onReset -->
        <q-input type="email" label="Your email" v-model="email" @keyup.alt.enter="onReset"></q-input>
        <q-select v-model="role" :options="roleOption" label="Role"></q-select>
        <q-btn color="primary" type="submit" label="Submit" />
        <q-btn color="grey" type="reset" label="Reset"/>
      </div>

     </form>
  </q-page>
</template>

<script setup>
// // import ref() มาใช้งาน : สามารถใช้กับ Primitive values (string, number, boolean) หรือ Object ก็ได้ต้องเข้าถึงผ่าน .value
// // import reactive(): ใช้กับ Object/Array โดยตรง ไม่ต้องใช้.value แต่ไม่สามารถ destructure (การถอดตัวแปรออกมา)
// // import toRefs(): ใช้แปลง reactive object เป็น refs เพื่อให้destructure ได้
// import { reactive, ref, toRefs } from 'vue'

// // ** การประกาศตัวแปร
// // ในภาษา vue ไม่มีชนิด data type
// const msg = ref(1500)
// // แสดงค่าตัวแปรออกทาง console *** โดยใช้ .value เพื่อดึงค่าตัวแปรออกมา ***
// console.log(msg.value)

// // ** การสร้าง array สามารถเก็บค่าอะไรก็ได้ ไม่ต้อง datatype เดียวกันก็ได้
// const items = ref(['Apple', 'Banana', 1200, 500])
// // การเพิ่มค่าใน array ใช้ [arrayName].value.push([newValue])
// items.value.push('JOJI')
// // แสดงค่าใน array ออกมา
// console.log(items.value)

// // ** การสร้าง object คล้าย ๆ dictionary มีการกำหนด key: value
// const products = ref({
//   id: 1,
//   name: 'Notebook',
//   price: 15000,
// })
// console.log(products.value)

// // ** การใช้ตัวแปรแบบ reactive
// const user = reactive({
//   name: "Joji",
//   age: 20
// })
// // เมื่อต้องการจะอ้างถึงค่าใน object แบบ reactive จะต้องเรียกโดยใช้ key ทีละค่า ๆ
// console.log(user.name)

// // ใช้ toRefs() ในการแกะค่าของ reactive เพื่อเข้าถึงค่าทั้งหมดแบบง่าย ๆ ไม่ต้อง .key ทีละค่า
// const {name, age} = toRefs(user)
// console.log(name.value, age.value)
// // ***** แต่ปัจจุบันส่วนใหญ่เขานิยมสร้างตัวแปรกับ ref() ทั้งหมด ไม่ว่าจะเป็นตัวแปรธรรมดา, Array, Object น่ะ *****

// ================================= วันที่ 3
import { ref } from 'vue'
// เปลี่ยนชื่อ title เว็บ โดยใช้ meta 
import { useMeta } from 'quasar';
useMeta(
  // ตั้งค่า title
  {title: "หน้าหลักจ้า"}
)

// เพิ่มตัวแปรเพื่อเรียกใช้
const msg = ref('Hello')
const a = ref('You see')
// เพิ่มตัวแปร boolean
const isActive = ref(true)

// --------------------------------------------
// ประกาศตัวแปรเพื่อใช้ผูกกับ HTML Attitrube
const url = ref("/images/Haniel.png");
const my_color = ref("pink");

// --------------------------------------------
// v-if v-else
// สร้างตัวแปรเช็คการ login
const isLogged = ref(true)
// สร้างตัวแปรคะแนน จะเอามาตรวจเงื่อนไขแสดงผล
const score = ref(81)
// ตัวแปรไว้ตรวจสอบว่าจะแสดงผลหรือไม่
const isVisible = ref(true)

// สร้างตัวแปร array of objects
const items = ref([
  {id: 1, name: "ProductA", price: 100},
  {id: 2, name: "ProductB", price: 200}
])

// ---------------------------------------------------
// ลองใช้ v-on + v-model
const username = ref(null);
const email = ref(null);
// สร้าง ฟังก์ชัน เพื่อใช้ใน form
// = () บอกว่าฟังก์ชันจะรับ parameter ไหม ถ้าไม่ให้ปล่อยว่างไว้
// => {} ในวงเล็บจะเป็น action ที่เราจะให้ทำ
const onReset = () => {
  username.value = ""
  email.value = ""
  role.value = null
}
const onSubmit = () => {
  // สร้างเงื่อนไขตรวจสอบว่า user ใส่ข้อมูลมาครบทุกช่องแล้วไหม
  if (!username.value || !email.value) {
    // ถ้ายังให้แสดง alert
    alert("Username or Email is empty")
    return
  }
  // กรณีที่ใส่แล้วให้แสดงค่าออกมาทาง console log และ alert แจ้งเตือน
  // ใน console.log เนื่องจากมีค่าหลายค่าจึงให้แสดงอยู่ในรูปแบบ objects
  console.log("Form was Submitted: ", {
    username: username.value,
    email: email.value,
    role: role.value
  })
  alert("Data saved!")
}

// สร้างตัวแปรเพิ่มเพื่อให้ user เลือกใน dropdown ไม่ต้อง ref เพราะใช้แสดงผลเท่านั้น
const roleOption = ['student', 'techer', 'staff'];
// สร้างตัวแปรเพื่อเอาไว้ binding ว่า user เลือกอะไรมา
const role = ref(null);
</script>
