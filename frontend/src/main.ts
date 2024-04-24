import { createPinia } from 'pinia'
import { createApp } from 'vue'
import veProgress from 'vue-ellipse-progress'
import App from './App.vue'
import './assets/normalize.css'
import router from './router'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(veProgress).mount('#app')
