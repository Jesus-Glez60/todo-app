<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
 label: {
  type: [String, Boolean],
  default: false,
 },
 placeholder: {
  type: String,
  default: '',
 },
 modelValue: {
  type: String,
  default: '',
 },
 errors: {
  type: Array<String>,
 },
})
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
 get() {
  return props.modelValue
 },
 set(value) {
  emit('update:modelValue', value)
 },
})
</script>

<template>
 <label class="form-input-label" v-if="label">{{ label }}</label>
 <div class="form-input-container">
  <div class="input-icon-start">
   <slot name="iconStart" />
  </div>
  <input
   class="form-input"
   :placeholder="placeholder"
   type="text"
   v-model.trim="inputValue"
   v-bind="$attrs"
  />
  <div class="input-icon-end">
   <slot name="iconEnd" />
  </div>
 </div>
 <Transition name="error">
  <div v-if="errors" class="error-container">
   <p class="errors-inputs" v-for="(error, key) in errors" :key="key">{{ error }}</p>
  </div>
 </Transition>
</template>

<style scoped lang="scss">
.form-input-container {
 display: flex;
 position: relative;
}

.form-input {
 width: 100%;
 padding-left: 28px;
 padding-bottom: 10px;
 background: none;
 border: 0;
 font-weight: 600;
 color: rgba($color: #000000, $alpha: 0.4);
 border-bottom: 3px solid rgba($color: #000000, $alpha: 0.2);
}
.form-input:focus-visible {
 outline: none;
}
.form-input-label {
 color: rgba($color: #000000, $alpha: 0.7);
 margin-bottom: 10px;
}
.input-icon-start {
 display: inline-block;
 position: absolute;
 height: 100%;
 align-items: center;
 left: 0;
}
.input-icon-end {
 display: inline-block;
 position: absolute;
 height: 100%;
 align-items: center;
 right: 0;
}

.error-container {
 display: flex;
 flex-direction: column;
}
.errors-inputs {
 -webkit-text-stroke: 0.5px white;
 -webkit-text-fill-color: red;
 color: red;
 text-wrap: balance;
 margin: 0;
}

.error-enter-active {
 animation: shake 0.4s ease-in;
}
.error-leave-active {
 transition: 0.4s ease all;
}

.error-leave-to {
 transform: translateX(-1000px);
}

@keyframes shake {
 0% {
  transform: translateX(-100px);
 }
 50% {
  transform: translateX(0);
 }
 60% {
  transform: translateY(-6px);
 }
 70% {
  transform: translateY(0);
 }
 80% {
  transform: translateY(6px);
 }
 90% {
  transform: translateY(0);
 }
 100% {
  transform: translateY(-4px);
 }
}

@media only screen and (min-width: 600px) {
 .form-input {
  padding-left: 30px;
  padding-bottom: 10px;
  font-size: 1.125rem;
 }

 .form-input-label {
  margin-bottom: 10px;
 }

 .errors-inputs {
  font-size: 1.125rem;
 }
}

@media only screen and (min-width: 900px) {
 .form-input-label {
  margin-bottom: 5px;
 }

 .form-input {
  padding-left: 28px;
  padding-bottom: 8px;
  font-size: 1rem;
 }

 .errors-inputs {
  font-size: 0.9rem;
 }
}
</style>
