<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ISignUpData } from '@/types'
import FormInput from '../inputs/FormInput.vue'
import PillButton from '../buttons/PillButton.vue'
import { signUpSchema } from '@/utils/formsValidators'
import IconButton from '../buttons/IconButton.vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['signUp', 'change'])
const isShowPassword = ref(false)
const loading = ref(false)
const errors = ref<Zod.ZodFormattedError<ISignUpData> | null>(null)

const formData = reactive({
 firstName: '',
 lastName: '',
 email: '',
 password: '',
 confirmPassword: '',
}) as ISignUpData

function changeToSignIn() {
 return emit('change', false)
}

function showPassword() {
 const currentState = document.getElementById('#password')
 const type = currentState?.getAttribute('type') === 'password' ? 'text' : 'password'
 isShowPassword.value = currentState?.getAttribute('type') === 'password' ? true : false
 currentState?.setAttribute('type', type)
}

async function handleSignUp() {
 loading.value = false
 const valid = await signUpSchema.safeParse(formData)

 if (!valid.success) {
  return (errors.value = valid.error.format())
 }
 errors.value = null
 return emit('signUp', formData)
}
</script>

<template>
 <section class="form-background">
  <div class="form-title">
   <h2>Sign Up</h2>
  </div>
  <form class="form-body" @submit.prevent="handleSignUp">
   <div class="form-field">
    <FormInput
     label="First Name"
     placeholder="Type your first name"
     v-model="formData.firstName"
     :errors="errors?.firstName?._errors"
    >
     <template #iconStart>
      <Icon icon="solar:user-linear" class="icon-decorator" width="24px" height="24px" />
     </template>
    </FormInput>
   </div>

   <div class="form-field">
    <FormInput
     label="Last Name"
     placeholder="Type your last name"
     v-model="formData.lastName"
     :errors="errors?.lastName?._errors"
    >
     <template #iconStart>
      <Icon icon="solar:user-linear" class="icon-decorator" width="24px" height="24px" />
     </template>
    </FormInput>
   </div>

   <div class="form-field">
    <FormInput
     label="Email"
     type="email"
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
    <div class="password-field">
     <FormInput
      id="#password"
      label="Password"
      type="password"
      placeholder="Type your password"
      v-model="formData.password"
      :errors="errors?.password?._errors"
     >
      <template #iconEnd>
       <IconButton
        @click="showPassword"
        :icon="isShowPassword ? 'mdi:eye-off' : 'mdi:eye'"
        class="show-password-icon"
       />
      </template>
      <template #iconStart>
       <Icon icon="ic:outline-lock" class="icon-decorator" width="24px" height="24px" />
      </template>
     </FormInput>
    </div>
   </div>

   <div class="form-field">
    <FormInput
     id="#password"
     label="Confirm Password"
     type="password"
     placeholder="Confirm your password"
     v-model="formData.confirmPassword"
     :errors="errors?.confirmPassword?._errors"
    >
     <template #iconEnd>
      <IconButton
       @click="showPassword"
       :icon="isShowPassword ? 'mdi:eye-off' : 'mdi:eye'"
       class="show-password-icon"
      />
     </template>
     <template #iconStart>
      <Icon icon="ic:outline-lock" class="icon-decorator" width="24px" height="24px" />
     </template>
    </FormInput>
   </div>

   <div class="sign-in-button">
    <PillButton label="Sign Up" />
   </div>
  </form>

  <div class="has-account">
   <span>Already have an account?</span>
   <button class="change-form-button" @click="changeToSignIn">Sign In</button>
  </div>
 </section>
</template>

<style scoped lang="scss">
.form-background {
 background-color: white;
 height: 100%;
 padding: 0 2rem;
}
.form-body {
 display: flex;
 height: 80%;
 margin: 0 10%;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
}

.form-title {
 display: flex;
 align-items: center;
 justify-content: center;
 height: 10%;
}

.form-title > h2 {
 font-size: 2rem;
}

.icon-decorator {
 opacity: 30%;
}

.form-field {
 display: flex;
 width: 100%;
 flex-direction: column;
}

.form-field > span {
 margin: 2% 0;
}

.show-password-icon {
 color: rgba($color: #000000, $alpha: 0.4);
}

.has-account {
 display: flex;
 align-items: center;
 justify-content: center;
 height: 10%;
}

.change-form-button {
 font-weight: 700;
 background: none;
 border: none;
}
.sign-in-button {
 width: 100%;
}
.change-form-button:hover {
 text-decoration: underline;
 cursor: pointer;
}

@media only screen and (min-width: 600px) {
 .form-title {
  height: 5%;
 }
 .form-title > h2 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
 }
 .icon-decorator {
  width: 28px;
  height: 28px;
 }
 .sign-in-button {
  width: 85%;
 }

 .has-account {
  font-size: 1.125rem;
 }
}

@media only screen and (min-width: 900px) {
 .form-title > h2 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
 }
 .form-background {
  border-radius: 20px;
  border: 1px solid gray;
  padding: 2rem;
  height: 95%;
 }

 .form-body {
  height: 90%;
 }

 .icon-decorator {
  width: 24px;
  height: 24px;
 }
}
</style>
