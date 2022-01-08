import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/axios'

const app = createApp(App)
app.use(store)
app.use(router).mount('#app')