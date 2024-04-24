<script setup lang="ts">
import { ITodos } from '@/types'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import type { PropType } from 'vue'

defineProps({
 todo: {
  type: Object as PropType<ITodos>,
  required: true,
 },
})
</script>

<template>
 <div class="todo-container">
  <div class="todo-icon">
   <Icon class="icon-content" :icon="todo.icon" />
  </div>
  <div class="todo-content">
   <h3>{{ todo.title }}</h3>
   <p>{{ todo.location }}</p>
  </div>

  <div v-if="todo.estimatedTime" class="todo-timestamp">
   <p>{{ dayjs(todo.estimatedTime).format('h:mm a') }}</p>
  </div>
 </div>
</template>

<style scoped>
.todo-container {
 display: flex;
 margin: 1rem 0;
 padding-bottom: 1rem;
 width: 100%;
 height: 60px;
 border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.todo-icon {
 display: flex;
 align-items: center;
 justify-content: center;
 width: 18%;
 height: 100%;
 border-radius: 100%;
 border: 1px solid rgba(0, 0, 0, 0.2);
}

.icon-content {
 width: 32px;
 height: 32px;
 color: rgb(107, 124, 207);
 color: linear-gradient(
  175deg,
  rgba(107, 124, 207, 1) 0%,
  rgba(80, 168, 243, 1) 55%,
  rgba(40, 189, 243, 1) 100%
 );
}

.todo-content {
 display: flex;
 flex-direction: column;
 width: 65%;
 margin-left: 0.8rem;
 justify-items: center;
 align-items: flex-start;
}

.todo-content > h3 {
 font-size: 1rem;
 margin: 0 0 5px 0;
}
.todo-content > p {
 font-size: 0.7rem;
 opacity: 50%;
 margin: 0;
}

.todo-timestamp {
 display: flex;
 width: 17%;
 align-items: center;
}

.todo-timestamp > p {
 font-size: 0.8rem;
 opacity: 50%;
 margin: 0;
}
</style>
