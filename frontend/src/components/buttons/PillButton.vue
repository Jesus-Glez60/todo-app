<script setup lang="ts">
defineProps({
 label: {
  type: String,
  required: true,
 },
})
</script>

<template>
 <button class="pill-button" type="submit" v-bind="$attrs">
  {{ label }}
 </button>
</template>

<style scoped>
.pill-button {
 width: 100%;
 padding: 0.7rem;
 font-weight: 600;
 color: white;
 cursor: pointer;
 background: #12c2e9;
 background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
 background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
 border: none;
 border-radius: 20px;
 font-size: 0.8rem;
}

@media only screen and (min-width: 600px) {
 .pill-button {
  padding: 0.9rem;
  font-size: 1.125rem;
 }
}
</style>
