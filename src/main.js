import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { reveal } from '@/composables/useScrollReveal.js'
import { useTheme } from '@/composables/useTheme.js'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('reveal', reveal)
useTheme().init()
app.mount('#app')
