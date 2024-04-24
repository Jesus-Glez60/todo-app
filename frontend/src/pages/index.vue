<script setup lang="ts">
import { onMounted } from 'vue'
import HomeHeader from '@/components/HomeHeader.vue'
import TodoList from '@/components/TodoList.vue'
import { useUiStore } from '@/store/useUiStore'
import { useTodosStore } from '@/store/useTodosStore'
import IconButton from '@/components/buttons/IconButton.vue'
import TodoForm from '@/components/TodoForm.vue'
// import { useUserStore } from '@/store/useUserStore'

// const auth = useUserStore()
const ui = useUiStore()
const todos = useTodosStore()

// function logout() {
//  auth.logout()
// }
onMounted(async () => {
 await todos.getAll()
})
</script>

<template>
 <section class="home">
  <HomeHeader />
  <TodoList />
  <TodoForm />
  <IconButton
   icon="iconoir:plus-circle-solid"
   color="#2fbbee"
   comp-class="add-todo-button"
   :height="48"
   :width="48"
   @click="ui.isOpenModal = true"
  />
 </section>
</template>

<style scoped>
.home {
 display: flex;
 flex-direction: column;
 height: 100dvh;
}

.add-todo-button {
 position: absolute;
 bottom: 3%;
 right: 4%;
}
</style>
