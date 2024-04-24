<script setup lang="ts">
import ListTransition from './ListTransition.vue'
import TodoItem from './TodoItem.vue'
import { useTodosStore } from '@/store/useTodosStore'

const todos = useTodosStore()
</script>

<template>
 <section class="todo-list-container">
  <div class="pending-todos">
   <div v-if="todos.pendingTodos">
    <span class="section-title">Pending</span>
    <ListTransition>
     <TodoItem v-for="pendings in todos.pendingTodos" :todo="pendings" :key="pendings.id" />
    </ListTransition>
   </div>

   <div v-else>
    <h1>There's no pending todos left</h1>
   </div>
  </div>

  <div class="completed-todos">
   <div v-if="todos.completedTodos">
    <span class="section-title">Completed</span>
    <ListTransition>
     <TodoItem v-for="completed in todos.completedTodos" :todo="completed" :key="completed.id" />
    </ListTransition>
   </div>

   <div v-else>
    <h1>No completed todos yet</h1>
   </div>
  </div>
 </section>
</template>

<style scoped>
.todo-list-container {
 display: flex;
 flex-direction: column;
 margin: 0 1.125rem;
}

.pending-todos {
 display: flex;
 flex-direction: column;
 margin-top: 1.4rem;
}

.section-title {
 font-size: 1rem;
 font-weight: 700;
 color: rgba(0, 0, 0, 0.55);
}
</style>
