// ตั้งค่า boot pinia
// import pinia มา
import { createPinia } from "pinia";
// import plugin มา *** plugin จะไม่มีปีกกา ***
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default ({ app }) => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)
}
