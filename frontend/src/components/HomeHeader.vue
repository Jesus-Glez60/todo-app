<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'
import IconButton from './buttons/IconButton.vue'
import * as dayjs from 'dayjs'
import { useTodosStore } from '@/store/useTodosStore'

const auth = useUserStore()
const todos = useTodosStore()

const gradient = {
 colors: [
  {
   color: '#6b7ccf',
   offset: '0',
  },
  {
   color: '#50a8f3',
   offset: '50',
  },
  {
   color: '#28bdf3',
   offset: '75',
  },
 ],
}
</script>

<template>
 <header class="home-header">
  <nav class="home-header-container">
   <div class="header-left">
    <div class="icon-container">
     <IconButton icon="ri:menu-2-line" class="hamburger-menu-icon" color="white" />
    </div>

    <div class="greetings-container">
     <p class="home-greetings">Hello</p>
     <p class="home-greetings">{{ auth.user?.firstName }} {{ auth.user?.lastName }}</p>
    </div>

    <div class="date-container">
     <p class="date">{{ dayjs().format('MMMM D, YYYY') }}</p>
    </div>

    <div class="header-left-divider" />
   </div>

   <div class="header-right">
    <div class="task-resume">
     <div class="tasks">
      <p class="task-number">{{ todos.pendingTodos ? todos.pendingTodos.length : 0 }}</p>
      <p class="task-summary">Task remaining</p>
     </div>

     <div class="tasks">
      <p class="task-number">{{ todos.completedTodos ? todos.completedTodos.length : 0 }}</p>
      <p class="task-summary">Task completed</p>
     </div>
    </div>

    <div class="progress">
     <ve-progress
      :progress="todos.percentage"
      :legend-formatter="({ currentValue }) => `${currentValue}%`"
      :size="90"
      :half="true"
      :angle="360"
      :color="gradient"
      font-size="0.8rem"
     >
      <template #legend-caption>
       <p class="progress-caption">Tasks Completed</p>
      </template>
     </ve-progress>
    </div>
   </div>
  </nav>
 </header>
</template>

<style scoped>
.home-header {
 height: 35%;
 width: 100%;
 background-image: url('@/assets/images/home-background.jpeg');
 background-repeat: no-repeat;
 background-size: cover;
 color: white;
 position: relative;
}

.home-header-container {
 display: flex;
 height: 100%;
 width: 100%;
}

.header-left {
 display: flex;
 flex-direction: column;
 width: 55%;
 padding: 0 1.125rem;
 height: 100%;
}

.icon-container {
 height: 10%;
}

.greetings-container {
 height: 65%;
}

.date-container {
 height: 23%;
}

.hamburger-menu-icon {
 height: 28px;
 width: 28px;
 color: white;
}

.home-greetings {
 font-size: 1.8rem;
 font-weight: 300;
 margin: 1rem 0;
}

.date {
 font-size: 0.8rem;
 opacity: 75%;
}

.header-left-divider {
 display: flex;
 position: absolute;
 left: 0;
 bottom: 0;
 width: calc(55% + 1.125rem);
 height: 2%;
 background: #4568dc; /* fallback for old browsers */
 background: -webkit-linear-gradient(to right, #b06ab3, #4568dc); /* Chrome 10-25, Safari 5.1-6 */
 background: linear-gradient(
  to right,
  #6b7ccf,
  #50a8f3,
  #28bdf3
 ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.header-right {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 width: 45%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.4);
}

.task-resume {
 display: flex;
 height: 35%;
}
.tasks {
 display: flex;
 flex-direction: column;
 width: 100%;
 margin: 5%;
}
.task-number {
 font-size: 1.5rem;
 margin: 0;
 text-align: end;
}
.task-summary {
 font-size: 0.5rem;
 font-weight: 300;
 opacity: 55%;
}

.progress {
 width: 100%;
 height: 35%;
 display: flex;
 align-items: center;
 justify-content: center;
}

.progress-caption {
 font-size: 0.5rem;
}
</style>
