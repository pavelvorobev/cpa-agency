import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/common/constants/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME,
      name: 'home',
      component: () => import('@/pages/index.vue'),
    },
  ],
})

export default router
