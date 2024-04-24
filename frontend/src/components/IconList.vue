<script setup lang="ts">
import { icons } from '@iconify/json/json/iconoir.json'
import { Icon } from '@iconify/vue'
</script>

<template>
 <Teleport to="main">
  Select Icons
  <Icon
   v-for="(value, index) in Object.entries(icons)"
   :key="index"
   :icon="`iconoir:${value[0]}`"
  />
 </Teleport>
</template>

<style scoped></style>
