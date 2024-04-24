import { authenticate } from '@/api/core/login'
import router from '@/router'
import { IUserData } from '@/types'
import { removeToken, setToken } from '@/utils/cookies'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('users-store', () => {
 const user = ref<IUserData | null>()

 function storeUser(payload: IUserData) {
  user.value = { ...payload }
 }

 function saveTokenToCookie(payload: string) {
  setToken(payload)
 }

 async function retrieveUser(): Promise<boolean> {
  const isLoggedIn = ref(false)
  await authenticate()
   .then((res) => {
    user.value = { ...res.data }
    isLoggedIn.value = true
   })
   .catch(async () => {
    user.value = null
    isLoggedIn.value = false
    logout()
   })

  return isLoggedIn.value
 }

 async function logout() {
  await removeToken()
  return router.replace('/login')
 }

 return { user, storeUser, retrieveUser, saveTokenToCookie, logout }
})
