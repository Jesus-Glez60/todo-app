<script setup lang="ts">
defineProps({
 icon: { type: String, required: true },
 color: { type: String },
 compClass: { type: String },
 width: { type: Number },
 height: { type: Number },
})
import { Icon } from '@iconify/vue'
</script>

<template>
 <span v-bind="$attrs" class="button-container" :class="compClass">
  <button type="button" class="button-icon-button">
   <Icon
    :icon="icon"
    :color="color ? color : 'black'"
    @click="$emit('click')"
    :width="width ? width : 24"
    :height="height ? height : 24"
   />
  </button>
 </span>
</template>

<style scoped>
.button-container {
 display: flex;
 align-items: center;
 width: auto;
 height: auto;
}

.button-icon-button {
 cursor: pointer;
 border-radius: 50%;
 background: none;
 display: block;
 height: auto;
 width: auto;
 margin: 0;
 border: none;
 padding: 0;
 line-height: 0;
}
.button-icon-button:focus {
 background-color: rgba(60, 64, 67, 0.102);
}
.button-icon {
 fill: currentColor;
}
</style>
