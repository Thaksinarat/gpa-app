import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from './routes.js'

// นำเข้า store ก่อนจะทำการตรวจการ login
// import { useAuthStore } from '@/store/authStore.js'

// นำเข้า store ที่มีการเรียกใช้ api
import { useAuthStore } from '@/store/auth-store-api.js'
// จะแสดงตัว notification ถ้า user เข้ามาใช้งานโดยไม่ได้ login
import { Notify } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  // เพิ่ม property เพื่อใช้ global gruad
  //  -----เพื่อตรวจสอบการเข้าถึงของผู้ใช้ทุกเส้นทาง
  // Router.beforeEach((to, from, next) => {
  //   // เช็คว่ามาจากหน้าไหน
  //   console.log('From: ', from.path)

  //   // เช็คว่าไปที่ไหน
  //   console.log('To: ', to.path)

  //   // ทำไร / action
  //   next()
  // })

  // ทำ per-route grad กับ index.js
  // -----เพื่อตรวจสอบการ login
  // Router.beforeEach((to, from, next) => {
  //   const authStore = useAuthStore()

  //   // ตรวจสอบว่าได้ทำการ login ยัง
  //   // requireAuth คือชื่อตัวแปรของ meta
  //   if(to.meta.requireAuth && !authStore.isLogin){
  //     // ถ้ายังให้ไปหน้า login
  //     next('login')
  //   }else{
  //     // ถ้า login แล้วให้ไปหน้าที่ต้องการ/ หน้าแรกได้เลย
  //     next()
  //   }
  // })

  // ทำ route grad ใหม่ เพื่อแบ่งหน้าเพจการเข้าถึงให้แตกต่างกันไปตามแต่ละ role
  Router.beforeEach((to, from, next)=> {
    const authStore = useAuthStore()

    // เช็คด้วย isAuthenticated ว่า user login แล้วยัง
    // ถ้ายัง
    if (to.meta.requireAuth && !authStore.isAuthenticated) {
      // แสดง notify เตือน
      // จะเตือนในหน้า login
      Notify.create({
        type: "warning",
        message: "Please login first"
      })
      // ให้ route ไปหน้า login
      return next({name: "login"})
    }
    // เพิ่มเงื่อนไข roles
    if (to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      Notify.create({
        type: 'negative',
        message:'You do not have permission'
      })
      // switch case ใน roles ต่าง ๆ
      switch(authStore.role) {
        case 'admin':
          return next({name: 'admin'})
        case 'teacher':
          return next({name: 'teacher'})
        default:
          return next({name: 'profile'})
      }
    }
    next()
  })
  return Router
})
