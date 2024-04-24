import { ITodo } from '@/types'
import { request } from '../service'

export function getAll() {
 return request({
  url: 'todos',
  method: 'get',
 })
}

export function getById(id: number) {
 return request({
  url: `todos/${id}`,
  method: 'get',
 })
}

export function saveTodo(data: ITodo) {
 return request({
  url: 'todos',
  method: 'post',
  data,
 })
}

export function editTodo(data: ITodo, id: number) {
 return request({
  url: `todos/${id}`,
  method: 'patch',
  data,
 })
}

export function deleteTodo(id: number) {
 return request({
  url: `todos/${id}`,
  method: 'delete',
 })
}
