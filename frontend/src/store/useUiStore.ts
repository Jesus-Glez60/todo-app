import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui-store', () => {
 const isMobile = ref(false)
 const isOpenModal = ref(false)
 function checkDeviceType() {
  if (screen.width <= 760) {
   return (isMobile.value = true)
  }
  return (isMobile.value = false)
 }

 return { isMobile, checkDeviceType, isOpenModal }
})
