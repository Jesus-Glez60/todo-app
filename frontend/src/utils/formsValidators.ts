import { ISignInData, ISignUpData } from '@/types'
import * as z from 'zod'

// const emailValidator = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
// const namesValidator = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm

export const signUpSchema: z.ZodType<ISignUpData> = z
 .object({
  firstName: z
   .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
   })
   .min(1, { message: 'Names are required' }),
  lastName: z
   .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
   })
   .min(1, { message: 'Names are required' }),
  email: z
   .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
   })
   .email(),
  password: z.string().regex(passwordValidator, {
   message:
    'Password requires at least 1 number, 1 character, 1 special character and be 6 character long',
  }),
  confirmPassword: z.string().regex(passwordValidator, {
   message:
    'Password requires at least 1 number, 1 character, 1 special character and be 6 character long',
  }),
 })
 .refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
 })

export const signInSchema: z.ZodType<ISignInData> = z.object({
 email: z
  .string({
   required_error: 'Email is required',
   invalid_type_error: 'Email must be a string',
  })
  .email(),
 password: z
  .string({
   required_error: 'Password is required',
   invalid_type_error: 'Password must be a string',
  })
  .min(6),
})
