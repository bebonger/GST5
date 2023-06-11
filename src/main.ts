import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

import axios from 'axios';
import VueAxios from 'vue-axios';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueCookies);
app.use(VueAxios, axios);
app.use(ToastPlugin);
axios.defaults.withCredentials = true;

app.mount('#app');

