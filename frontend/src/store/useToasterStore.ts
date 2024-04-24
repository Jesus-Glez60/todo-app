import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IToast, TToastStatus, ToastPayload } from '../types'

const defaultTimeout: number = 2000

const createToast = (text: string, status: TToastStatus): IToast => ({
 text,
 status,
 id: Math.random() * 1000,
})

export const useToasterStore = defineStore('toaster-store', () => {
 const toasts = ref<IToast[]>([])
 function updateState(payload: ToastPayload, status: TToastStatus) {
  const { text, timeout } = payload
  const toast = createToast(text, status)
  toasts.value.push(toast)
  setTimeout(() => {
   toasts.value = toasts.value.filter((t) => t.id !== toast.id)
  }, timeout ?? defaultTimeout)
 }
 function success(payload: ToastPayload) {
  updateState(payload, 'success')
 }

 function warning(payload: ToastPayload) {
  updateState(payload, 'warning')
 }

 function error(payload: ToastPayload) {
  updateState(payload, 'error')
 }
 return { toasts, success, warning, error }
})
