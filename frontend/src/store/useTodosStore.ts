import { getAll } from '@/api/todo'
import { ITodos } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodosStore = defineStore('todos-store', () => {
 const todos = ref<ITodos[]>([])
 const completedTodos = ref<ITodos[]>([])
 const pendingTodos = ref<ITodos[]>([])

 function countCompletedTodos() {
  for (let i = 0; i < todos.value.length; i++) {
   const element = todos.value[i]

   if (!element.pending) {
    completedTodos.value.push(element)
   } else {
    pendingTodos.value.push(element)
   }
  }
 }

 const percentage = computed(() => {
  let percentage = 0
  if (completedTodos.value && pendingTodos.value) {
   const total = completedTodos.value.length + pendingTodos.value.length
   const pending = pendingTodos.value.length
   percentage = (100 * pending) / total
  }
  return percentage
 })

 getAll()
  .then((res) => {
   if (res.data) {
    todos.value = res.data
    countCompletedTodos()
   }
  })
  .catch((err) => {
   console.log(err)
  })

 return { todos, completedTodos, pendingTodos, percentage, getAll }
})
