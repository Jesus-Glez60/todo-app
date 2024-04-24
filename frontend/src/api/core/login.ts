import { ISignInData, ISignUpData } from '../../types'
import { request } from '../service'

export function signin(data: ISignInData) {
 return request({
  url: 'auth/signin',
  method: 'post',
  data,
 })
}
export function signup(data: ISignUpData) {
 return request({
  url: 'auth/signup',
  method: 'post',
  data,
 })
}

export function authenticate() {
 return request({
  url: 'users/me',
  method: 'get',
 })
}
