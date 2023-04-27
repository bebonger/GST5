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

try {
axios.get('/api/get-user', { withCredentials: true }).then((response: { data: any }) => {

    const user : User = {
        avatar_url: response.data.avatar_url,
        country_code: response.data.country_code,
        default_group: response.data.default_group,
        id: response.data.id,
        is_active: response.data.is_active,
        is_bot: response.data.is_bot,
        is_deleted: response.data.is_deleted,
        username: response.data.username,
        is_restricted: response.data.is_restricted,
        global_rank: response.data.global_rank,
        country_rank: response.data.country_rank,
        badges: response.data.badges
    }

    console.log(user);
    
    const userDataStore = useUserDataStore()
    userDataStore.SetUser(user)
    console.log(userDataStore.IsLoggedIn)
})}
catch(err) {
    console.log(err);
}
app.mount('#app')
