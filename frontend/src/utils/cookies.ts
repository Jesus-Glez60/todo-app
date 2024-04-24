import Cookies from 'js-cookie'

export const getToken = () => {
 return Cookies.get('userToken')
}

export const setToken = (token: string) => {
 Cookies.set('userToken', token)
}

export const removeToken = () => {
 Cookies.remove('userToken')
}
