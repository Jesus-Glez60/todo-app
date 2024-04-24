<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useUiStore } from '@/store/useUiStore'
import IconButton from './buttons/IconButton.vue'
import { ITodos } from '@/types'
import { Icon } from '@iconify/vue'
import IconList from './IconList.vue'

defineProps({
 todo: {
  type: Object as PropType<ITodos>,
 },
})
const ui = useUiStore()
const todoIcon = ref('')
</script>

<template>
 <Teleport to="main">
  <Transition name="todo-form">
   <section v-if="ui.isOpenModal" class="todo-form-body">
    <nav class="todo-form-header">
     <IconButton
      icon="teenyicons:arrow-left-solid"
      color="#4568dc"
      @click="ui.isOpenModal = false"
      :height="32"
      :width="32"
     />
     <span class="todo-form-title">
      {{ todo ? 'Edit todo' : 'Add new todo' }}
     </span>
     <Icon icon="" />
     <IconList />
    </nav>

    <div>
     <IconButton :icon="todoIcon" />
    </div>
   </section>
  </Transition>
 </Teleport>
</template>

<style scoped>
.todo-form-enter-from,
.todo-form-leave-to {
 transform: translateX(100%);
 opacity: 0;
}

.todo-form-enter-active,
.todo-form-leave-active {
 transition: 0.3s ease all;
}
.todo-form-body {
 display: flex;
 flex-direction: column;
 height: 100dvh;
 width: 100dvw;
 position: absolute;
 top: 0;
 left: 0;
 background-color: #47539e;
 color: white;
}

.todo-form-header {
 display: flex;
 height: 5%;
 width: calc(100% - 1rem);
 align-items: center;
 margin-top: 1.125rem;
 justify-content: space-around;
}

.todo-form-title {
 font-size: 1.125rem;
 font-weight: 300;
 text-align: center;
}
</style>
