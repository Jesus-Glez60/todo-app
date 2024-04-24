<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useUiStore } from './store/useUiStore'
const ui = useUiStore()

onBeforeMount(() => {
 ui.checkDeviceType()
})
</script>

<template>
 <section class="layout-body">
  <RouterView />
 </section>
</template>

<style scoped></style>
