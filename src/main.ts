import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios';

import type { User } from './stores/userData'
import { useUserDataStore } from './stores/userData'

import { inject } from 'vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

app.mount('#app')
