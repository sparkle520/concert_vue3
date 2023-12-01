
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import router from './router/index'
import "@/assets/css/normalize.css"
import "@/assets/css/index.scss"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css' 
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios
app.mount('#app')
