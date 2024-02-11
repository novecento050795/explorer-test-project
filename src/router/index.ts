import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import EditVue from '@/pages/Edit.vue'
import ExplorerVue from '@/pages/Explorer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ExplorerVue
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditVue
    },
  ]
})

export default router
