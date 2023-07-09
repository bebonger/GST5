import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TeamsView from '../views/TeamsView.vue'
import MappoolView from '../views/MappoolView.vue'
import SchedulesView from '../views/SchedulesView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/info',
      name: 'info',
      component: AboutView
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamsView
    },
    {
      path: '/mappool',
      name: 'mappool',
      component: MappoolView
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: SchedulesView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ]
})

export default router;
