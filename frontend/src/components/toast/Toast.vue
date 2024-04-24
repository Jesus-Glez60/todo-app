<script setup lang="ts">
import { useToasterStore } from '../../store/useToasterStore'
import { TIconName, TToastStatus } from '../../types'
import Icon from '../Icon/Icon.vue'
const toastStore = useToasterStore()

const toastClassMap: Record<TToastStatus, string> = {
 warning: 'warning',
 error: 'error',
 success: 'success',
}

const toastIconMap: Record<TToastStatus, string> = {
 error: 'toast-error',
 warning: 'toast-warning',
 success: 'toast-success',
}
</script>

<template>
 <Teleport to="body">
  <Transition name="toast">
   <div v-if="toastStore.toasts.length" class="toaster__wrapper">
    <TransitionGroup name="toast" tag="ul">
     <li
      v-for="toast in toastStore.toasts"
      class="toaster__inner"
      :class="[toastClassMap[toast.status]]"
      :key="toast.text"
     >
      <Icon :name="toastIconMap[toast.status] as TIconName" class="toaster__inner-icon" />

      <span class="toaster__inner-text">
       {{ toast.text }}
      </span>
     </li>
    </TransitionGroup>
   </div>
  </Transition>
 </Teleport>
</template>

<style scoped lang="scss">
.toast-enter-from,
.toast-leave-to {
 transform: translateX(100%);
 opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
 transition: 0.25s ease all;
}

.toaster {
 &__wrapper {
  position: fixed;
  bottom: 3%;
  right: 5%;
  margin-bottom: 2%;
  z-index: 100;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
 }

 &__inner {
  --color: black;
  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 0.3rem;

  border: 1px solid black;

  background-color: var(--color);

  padding: 2.2rem 1.6rem;

  border-color: var(--color);
  color: white;
  svg {
   fill: white;
   stroke: white;
  }

  &.success {
   --color: green;
  }

  &.warning {
   --color: orange;
  }

  &.error {
   --color: red;
  }

  &-icon {
   width: 3rem;
   aspect-ratio: 1/1;
  }

  &-text {
   font-size: 1.2rem;
   font-weight: 600;
  }
 }
}
</style>
