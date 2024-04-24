<script setup lang="ts">
import { reactive, ref } from 'vue'
import IconButton from '../buttons/IconButton.vue'
import PillButton from '../buttons/PillButton.vue'
import FormInput from '../inputs/FormInput.vue'
import { ISignInData } from '@/types'
import { Icon } from '@iconify/vue'
import { signInSchema } from '@/utils/formsValidators'

const emit = defineEmits(['signIn', 'change'])
const isShowPassword = ref(false)
const errors = ref<Zod.ZodFormattedError<ISignInData> | null>(null)

const formData = reactive({
 email: '',
 password: '',
}) as ISignInData

function changeToSignUp() {
 return emit('change', true)
}

function showPassword() {
 const currentState = document.getElementById('#password')
 const type = currentState?.getAttribute('type') === 'password' ? 'text' : 'password'
 isShowPassword.value = currentState?.getAttribute('type') === 'password' ? true : false
 currentState?.setAttribute('type', type)
}

async function handleSignIn() {
 const validForm = await signInSchema.safeParse(formData)
 if (!validForm.success) {
  return (errors.value = validForm.error.format())
 }
 return emit('signIn', formData)
}
</script>

<template>
 <section class="form-background">
  <div class="form-title">
   <h2>Login</h2>
  </div>
  <form class="form-body" @submit.prevent="handleSignIn">
   <div class="form-field">
    <FormInput
     label="Email"
     placeholder="Type your email"
     v-model="formData.email"
     :errors="errors?.email?._errors"
    >
     <template #iconStart>
      <Icon icon="ic:baseline-email" class="icon-decorator" width="24px" height="24px" />
     </template>
    </FormInput>
   </div>

   <div class="form-field">
    <FormInput
     id="#password"
     type="password"
     label="Password"
     placeholder="Type your password"
     v-model="formData.password"
     :errors="errors?.password?._errors"
    >
     <template #iconStart>
      <Icon icon="ic:outline-lock" class="icon-decorator" />
     </template>
     <template #iconEnd>
      <IconButton @click="showPassword" :icon="isShowPassword ? 'mdi:eye-off' : 'mdi:eye'" />
     </template>
    </FormInput>
    <!-- 
          <span>Forgot password?</span> -->
   </div>

   <div class="sign-in-button">
    <PillButton label="LOGIN" />
   </div>
  </form>

  <div class="no-account">
   <span>Don't have an account?</span>
   <button class="change-form-button" @click="changeToSignUp">Sign Up</button>
  </div>
 </section>
</template>

<style scoped>
.form-background {
 background-color: white;
 height: 100%;
 padding: 0 2rem;
}
.form-body {
 display: flex;
 flex-direction: column;
 margin: 0 10%;
 align-items: center;
 justify-content: space-between;
 height: 65%;
}

.form-title {
 display: flex;
 align-items: center;
 justify-content: center;
 height: 15%;
}

.form-title > h2 {
 font-size: 2rem;
}

.form-field {
 display: flex;
 flex-direction: column;
 margin: 5% 0;
 width: 100%;
 position: relative;
}
.icon-decorator {
 opacity: 30%;
 width: 24px;
 height: 24px;
}
.show-password-icon {
 position: absolute;
 left: 90%;
 bottom: 0%;
}

.sign-in-button {
 margin: 15% 0;
 width: 100%;
}

.no-account {
 display: flex;
 align-items: center;
 justify-content: center;
 height: 20%;
}

.change-form-button {
 background: none;
 border: none;
 font-weight: 700;
}

.change-form-button:hover {
 text-decoration: underline;
 cursor: pointer;
}

@media only screen and (min-width: 600px) {
 .form-title > h2 {
  font-size: 2.5rem;
 }
 .icon-decorator {
  width: 28px;
  height: 28px;
 }
 .sign-in-button {
  margin: 15% 0;
  width: 85%;
 }

 .no-account {
  font-size: 1.125rem;
 }
}
@media only screen and (min-width: 900px) {
 .form-background {
  border-radius: 20px;
  border: 1px solid gray;
  padding: 2rem;
  height: 85%;
 }

 .form-body {
  height: 90%;
 }
 .form-title {
  height: 5%;
 }
 .form-title > h2 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
 }
 .form-body {
  height: 80%;
 }
 .no-account {
  height: 15%;
 }
}
</style>
