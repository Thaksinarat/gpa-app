// สร้างมาเพื่อเช็ค Auth เรียก function checkAuth จาก auth-store-api.js
import { useAuthStore } from "@/store/auth-store-api";

export default async () => {
    const auth = useAuthStore()
    await auth.checkAuth()
}