import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: ()=>import('../views/HomeView.vue')
  // },
  {
    path: '/activity',
    name: 'activity',
    component: ()=>import('../views/ActivityView.vue')
  },
  {
    path: '/participate',
    name: 'participate',
    component: ()=>import('../views/ParticipateView.vue')
  },
  {
    path: '/poster',
    name: 'poster',
    component: ()=>import('../views/PosterView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
