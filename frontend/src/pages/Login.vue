<script setup lang="ts">
import { ref, computed } from 'vue'
import { SignInForm, SignUpForm, Toast } from '@/components'
import { ISignInData, ISignUpData } from '@/types'
import { signin, signup } from '@/api/core/login'
import { useToasterStore } from '@/store/useToasterStore'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'

const isSignUp = ref(false)
const router = useRouter()
const route = useRoute()
const toaster = useToasterStore()
const user = useUserStore()

function changeForm(newValue: boolean) {
 isSignUp.value = newValue
}

const logType = computed(() => {
 if (!isSignUp.value) {
  return 'SignIn'
 }
 return 'SignUp'
})

const handleLogin = (data: ISignInData | ISignUpData) => {
 if (logType.value !== 'SignIn') {
  return signup(data as ISignUpData)
   .then((res) => {
    const { access_token } = res.data
    toaster.success({ text: 'Redirecting to home' })
    user.saveTokenToCookie(access_token)
    setTimeout(() => {
     return router.push({ path: route.query.redirect?.toString() || '/' })
    }, 2000)
   })
   .catch((error) => {
    if (error.response) {
     return toaster.error({ text: error.response.data.message })
    }
    return toaster.error({
     text: 'An error has ocurred, please try again later or contact support',
    })
   })
 }

 return signin(data as ISignInData)
  .then((res) => {
   const { access_token } = res.data
   toaster.success({ text: 'Redirecting to home' })
   user.saveTokenToCookie(access_token)
   setTimeout(() => {
    return router.push({ path: route.query.redirect?.toString() || '/' })
   }, 2000)
  })
  .catch((error) => {
   if (error.response) {
    return toaster.error({ text: error.response.data.message })
   }
   return toaster.error({ text: 'An error has ocurred, please try again later or contact support' })
  })
}
</script>

<template>
 <Toast />
 <section class="login-page">
  <div class="forms-container">
   <SignInForm v-if="!isSignUp" @change="changeForm" @sign-in="handleLogin" />
   <SignUpForm v-else @change="changeForm" @sign-up="handleLogin" />
  </div>
 </section>
</template>

<style scoped>
.login-page {
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100dvh;
 background-image: url('@/assets/images/login-background.jpg');
 background-repeat: no-repeat;
 background-size: cover;
}
.forms-container {
 width: 100%;
 height: 100dvh;
}

@media only screen and (min-width: 900px) {
 .forms-container {
  width: 40dvw;
  height: 85dvh;
  align-content: center;
 }
}
</style>
