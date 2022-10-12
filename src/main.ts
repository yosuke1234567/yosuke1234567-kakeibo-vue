import { createApp } from 'vue'
import App from './App.vue'

import { routes } from './router/routes'
import { createRouter, createWebHistory } from 'vue-router'

import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-symbols-rounded'
import langJa from 'quasar/lang/ja'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import 'quasar/src/css/index.sass'

import './style.css'
import './utils.css'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.use(Quasar, {
    lang: langJa,
    iconSet: quasarIconSet,
})

app.mount('#app')