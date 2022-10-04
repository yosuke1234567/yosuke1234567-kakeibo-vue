import { createApp } from 'vue'
import App from './App.vue'

import { routes } from './router/routes'
import { createRouter, createWebHistory } from 'vue-router'

import { Quasar } from 'quasar'
import langJa from 'quasar/lang/ja'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import './style.css'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.use(Quasar, {
    lang: langJa
})

app.mount('#app')