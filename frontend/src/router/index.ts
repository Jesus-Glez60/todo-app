import { useUserStore } from '@/store/useUserStore'
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 scrollBehavior() {
  return { top: 0, behavior: 'smooth' }
 },
})

router.beforeEach(async (to) => {
 const auth = useUserStore()

 if (to.path !== '/login') {
  try {
   await auth.retrieveUser()
  } catch {
   return { path: '/login' }
  }
 }
})

export default router
