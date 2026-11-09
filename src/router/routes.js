// import ตัวนี้มาก่อนทำ route grad แบบ ธรรมดา
// import { useAuthStore } from '@/store/authStore'
// import { meta } from 'eslint-plugin-vue'

// ใช้กำหนด path
const routes = [
  // ในปีกกานี้คือจะอยู่ใน MainLayout
  {
    // path ตอนนี้ เริ่มต้นที่ /
    path: '/',
    // มีการโหลด MainLayout.vue ครอบหลัก ๆ
    component: () => import('@/layouts/MainLayout.vue'),
    // มีลูก ๆ ดังนี้
    children: [
      // หน้าหลัก คือ หน้าที่เขียนว่า path: ''
      // @ คือตัวย่อของโฟลเดอร์ src
      { path: '', component: () => import('@/pages/ch8/EX_subject.vue') },
      { path: 'button', component: () => import('@/pages/ch4/Ex_qbtn.vue') },
      { path: 'list', component: () => import('@/pages/ch4/Ex_qlist.vue') },
      { path: 'table', component: () => import('@/pages/ch4/Ex_qtable.vue') },
      { path: 'notify', component: () => import('@/pages/ch4/Ex_Notify.vue') },
      { path: 'loading', component: () => import('@/pages/ch4/Ex_Loading.vue') },
      { path: 'dialog', component: () => import('@/pages/ch4/Ex_Dialog.vue') },
      { path: 'form', component: () => import('@/pages/ch4/Ex_Validation.vue') },
      { path: 'second', component: () => import('@/pages/SecondPage.vue') },
      { path: 'note', component: () => import('@/pages/NotePage.vue') },
      { path: 'api', component: () => import('@/pages/ch6/Ex_api.vue') },
      { path: 'crud', component: () => import('@/pages/ch6/Ex_crud.vue') },
      { path: 'mockapi', component: () => import('@/pages/ch6/SubjectPage.vue') },
      { path: 'ch8/subject', component: () => import('@/pages/ch8/EX_subject.vue') },
      { path: 'env', component: () => import('@/pages/ch8/EX_env.vue') },
      { path: 'login', name: 'login', component: () => import('@/pages/ch7/LoginPage.vue') },
      // กำหนด requireAuth = true เป็นการบังคับว่าต้อง login ก่อนเท่านั้นถึงจะเข้าหน้า profile ได้
      {
        path: 'profile',
        name: 'profile',
        meta: { requireAuth: true },
        component: () => import('@/pages/ch7/ProfilePage.vue'),
      },
      // TeacherPage = กำหนดคนที่เข้าได้เป็น roles 'teacher','admin'
      {
        path: 'teacher',
        name: 'teacher',
        meta: { requireAuth: true, roles: ['teacher', 'admin'] },
        component: () => import('@/pages/ch7/TeacherPage.vue'),
      },
      // Admin = กำหนดคนที่เข้าได้เป็น roles 'admin'
      {
        path: 'admin',
        name: 'admin',
        meta: { requireAuth: true ,roles: ['admin']},
        component: () => import('@/pages/ch7/AdminPage.vue'),
      },

      // กำหนดว่าหน้า pinia จะต้อง login ก่อน ถึงจะเข้าถึงได้
      {
        path: 'pinia',
        component: () => import('@/pages/ch5/ExPinia.vue'),
        // ใช้ beforeEnter เพื่อทำ per-rout grad เฉพาะหน้า
        // หรือ ง่ายกว่า ใช้ meta ในการ pre-grad
        meta: { requireAuth: true },
      },

      // เพราะหน้า notepagedetail มีการส่ง parameter ชื่อว่า id
      {
        path: 'note/:id',
        // ตั้งชื่อ path ที่จะเอาไว้ใช้เรียกเส้นทาง
        name: 'NoteDetail',
        component: () => import('@/pages/NotePageDetail.vue'),
      },
    ],
  },
  // เพิ่มอีกปีกกา ที่ไม่ได้อยู่ภายใต้ MainLayout
  {
    // อย่าลืม / ด้านหน้าสุดด้วย ถ้าออกมาสร้างนอก MainLayout
    path: '/note/new',
    name: 'NewNote',
    component: () => import('@/pages/NewNote.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
