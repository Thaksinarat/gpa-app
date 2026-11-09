<!-- CRUD = create, read, update, delete -->
<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- สร้าง คอลัมม์ -->
    <div class="row q-col-gutter-md">
      <!-- ส่วนของการแสดงผล 5+7 = 12 -->
      <!-- ถ้าขนาด ปกติ แสดง 12 (= เต็มจอ)// ถ้าขนาด md แสดง 5 (= ใช้ไป 5 คอลัมม์) -->
      <!-- column ซ้าย -->
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <div class="text-subtitle1 text-weight-medium">HTTP Method</div>
          </q-card-section>

          <q-list separator>
            <!-- GET -->
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue">1. GET: List All</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="blue"
                  label="Fetch All"
                  @click="handleFetchAll"
                  :loading="isLoading"
                />
              </q-item-section>
            </q-item>
            <!-- POST -->
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-green"
                  >2. POST: Create ID: 101</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="green"
                  label="Create (POST)"
                  @click="handleCreate"
                  :loading="isLoading"
                />
              </q-item-section>
            </q-item>
            <!-- PUT -->
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-orange">3. PUT: Update:</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="orange"
                  label="Update (PUT)"
                  @click="handleUpdate(2)"
                  :loading="isLoading"
                />
              </q-item-section>
            </q-item>
            <!-- DELETE -->
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-negative"
                  >4. DELETE: Delete:</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="negative"
                  label="Delete (DELETE)"
                  @click="handleDelete(1)"
                  :loading="isLoading"
                />
              </q-item-section>
            </q-item>
            <!-- FILTER : GET -->
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-purple">5. GET: Filter:</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="purple"
                  label="Filter POST"
                  @click="handleFilter(5)"
                  :loading="isLoading"
                />
              </q-item-section>
            </q-item>
            <!-- GET : COMMENT -->
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-teal">6. GET: Comments:</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="teal"
                  label="Comments post"
                  @click="handleComments(1)"
                  :loading="isLoading"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <!-- ถ้าขนาด ปกติ แสดง 12 (= เต็มจอ) // ถ้าขนาด md แสดง 7 (= ใช้ไป 7 คอลัมม์)-->
      <!-- column ขวา -->
      <div class="col-12 col-md-7">
        <!-- card แสดงผล -->
        <q-card flat bordered>
          <!-- header สีเทา ๆ -->
          <q-card-section class="bg-grey-9 text-white row justify-between items-center q-pa-xs">
            <!-- ส่วนแสดงข้อความของ header ด้านซ้าย + ไอคอน -->
            <div class="text-subtitle2">
              <q-icon name="terminal"></q-icon>
              Live Data
            </div>
            <!-- ส่วนแสดงจำนวนของข้อมูล -->
            <div class="text-caption text-grey-4">total: {{ postItems.length }} records</div>
          </q-card-section>
          <!-- ตรวจสอบว่า กำลังโหลด? : แสดง spinner -->
          <q-card-section v-if="isLoading" class="text-center q-pa-xl">
            <q-spinner-matrix color="primary" size="3rem"></q-spinner-matrix>
            <div class="q-mt-sm text-grey-6">Syncing data with server...</div>
          </q-card-section>
          <!-- ถ้าโหลดเสร็จแล้ว : แสดงข้อมูลที่ดึงมา -->
          <q-card-section v-else>
            <!-- ส่วนของ comments -->
            <div v-if="comments.length > 0" class="q-mb-md">
              <q-banner dense class="bg-teal-1 text-teal-9 rounded-borders q-mb-sm">
                <q-icon name="comment"></q-icon>
                comment of Post ID: 1
                <!-- ส่วน slot เพื่อแสดงปุ่ม ปิด คอมเมนต์ -->
                <template v-slot:action>
                  <!-- ให้ comments = [] เพื่อให้ไม่มีคอมเมนต์อยู่ -->
                  <q-btn flat label="Close Comment" color="teal" @click="comments = []"></q-btn>
                </template>
              </q-banner>
              <q-list bordered separator class="bg-white rounded-borders">
                <q-item v-for="comment in comments" :key="comment.id">
                  <q-item-section>
                    <q-item-label class="text-weight-bold text-blue">
                      {{ comment.name }} ({{ comment.email }})
                    </q-item-label>
                    <q-item-label class="text-caption">{{ comment.body }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <!-- ส่วนของ postItems -->
            <!-- ตรวจสอบก่อนว่ามีข้อมูลไหม? : แสดงไอคอน + ข้อความ No data -->
            <div v-if="postItems.length == 0" class="text-center q-pa-xl text-grey-5">
              <q-icon name="layers_clear" size="4rem"></q-icon>
              <div class="text-h6 q-mt-sm">No Data</div>
            </div>
            <!-- ถ้ามีข้อมูล : แสดงผลข้อมูล -->
            <div v-else class="row q-col-gutter-sm">
              <!-- v-for แสดงผลข้อมูลทั้งหมด -->
              <!-- .slice คือดึงออกมาครั้งละ 6 ที่ index 0 - 6 -->
              <div v-for="item in postItems.slice(0, 6)" :key="item.id" class="col-12 col-sm-6">
                <!-- card แสดงผล -->
                <q-card flat bordered class="bg-white text-dark">
                  <q-card-section class="q-pa-sm">
                    <!-- badge แสดง ID : ตรวจสอบเงื่อนไขสี -->
                    <q-badge :color="item.id > 100 ? 'green' : 'blue'" class="q-mb-xs"
                      >ID: {{ item.id }}</q-badge
                    >
                    <!-- badge แสดง userId  -->
                    <q-badge color="purple" class="q-ml-xs q-mb-xs"
                      >User: {{ item.userId }}</q-badge
                    >
                    <!-- รายละเอียดโพส -->
                    <!-- title ของ post -->
                    <div class="text-weight-bold text-subtitle2">{{ item.title }}</div>
                    <!-- body ของ post -->
                    <div class="text-caption text-grey-7 q-mt-xs">{{ item.body }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// import store เข้ามาก่อน
import { usePostStore } from '@/store/post-store'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
// แปลงค่าจาก store ไปเป็น ref
import { storeToRefs } from 'pinia'

// ตัวแปร
const $q = useQuasar()
const store = usePostStore()

// store to ref
const { postItems, isLoading } = storeToRefs(store)

console.log(postItems)
// ตัวแปรไว้เก็บ comment
const comments = ref([])

// สร้าง function เพื่อเอาไว้แสดงข้อมูลที่เรา GET มา
const handleFetchAll = async () => {
  // ค่าเริ่มต้นขอว comment
  comments.value = []

  // เรียกใช้ function ใน store
  await store.fetchAllPosts()

  // แสดง notify
  $q.notify({
    type: 'positive',
    message: 'Data Fetched success',
    position: 'bottom-right',
  })
}

// สร้าง function เพื่อเอาไว้สร้างข้อมูล POST ไป
const handleCreate = async () => {
  // ค่าข้อมูล
  const newPostData = {
    title: 'New Post',
    body: 'body of new post',
    userId: 999,
  }
  // เรียกใช้ updatePost ใน store
  await store.createNewPost(newPostData)

  // แสดง Notify
  $q.notify({
    type: 'positive',
    message: 'Data Created success',
    icon: 'cloud_done',
  })
}

// สร้าง function เพื่อเอาไว้อัปเดต PUT
const handleUpdate = async (id) => {
  // ค่าข้อมูล
  const newUpdateData = {
    title: 'update Post2',
    body: 'body of update post',
    userId: 900,
  }
  // เรียกใช้ createNewPost ใน store
  await store.updatePost(id, newUpdateData)

  // แสดง Notify
  $q.notify({
    type: 'positive',
    message: 'Data Update success',
    icon: 'sync',
  })
}
// สร้าง function เพื่อเอาไว้ delete
const handleDelete = async (id) => {
  // เรียกใช้ function ใน store เพื่อลบ
  await store.deletePost(id)
  // แสดง Notify
  $q.notify({
    type: 'negative',
    message: `Data Id: ${id} Delete success`,
    icon: 'delete',
  })
}
// สร้าง function เอาไว้สำหรับ filter ข้อมูล
const handleFilter = async (userId) => {
  comments.value = []
  // เรียกใช้ function ใน store เพื่อ filter
  await store.filterPost(userId)

  // แสดง Notify
  $q.notify({
    type: 'purple',
    textColor: 'white',
    message: `Filter userId: ${userId} success`,
    icon: 'filter_list',
  })
}

// สร้าง function แสดงคอมเมนต์
const handleComments = async (id) => {
  // สร้างตัวแปร commentList มารับค่าคอมเมนต์จาก api ก่อนจะนำไป apply ให้กับ comments
  const commentList = await store.fetchComments(id)

  // ถ้ามีค่า comments ส่งกลับมาให้ทำตามนี้
  if (commentList) {
    // ให้ comments = commentList
    comments.value = commentList
    // แสดง Notify
    $q.notify({
      type: 'positive',
      message: `Comment Id: ${id} success`,
      icon: 'forum',
    })
  }
}
</script>
