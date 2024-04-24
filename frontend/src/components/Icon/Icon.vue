<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { TIconName } from '@/types'

const props = defineProps<{ name: TIconName | string }>()

const icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg?component`))
</script>

<template>
 <component :is="icon" />
</template>

<style scoped lang="scss"></style>
