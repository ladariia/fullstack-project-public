//ф-ии регистрации, авторизации и  проверки токена на валидность
import { $host, $authHost } from './index';
import jwt_decode from "jwt-decode";

export const registration = async (user_login, user_password) => {
    const { data } = await $authHost.post('api/user/registration', { user_login, user_password })
    return data
}

export const login = async (user_login, user_password) => {
    const { data } = await $host.post('api/user/login', { user_login, user_password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

//вызов при обнов страницы (проверка токена)
export const check = async () => {
    const { data } = await $authHost.get('api/user/auth',)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchUserUpd = async () => {
    const { data } = await $authHost.get('api/user/auth',)
    return jwt_decode(data.token)
}

export const fetchUsers = async () => {
    const { data } = await $authHost.get('api/user/users')
    return data
}

export const updLogin = async (user_id, user_login) => {
    const { data } = await $authHost.put('api/user/updLogin', { user_id, user_login })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const updPassword = async (user_id, user_password, userNewPassword) => {
    const { data } = await $authHost.put('api/user/updPass', { user_id, user_password, userNewPassword })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const deleteUser = async (user_id) => {
    const { data } = await $authHost.delete('api/user', {
        params: {
            user_id
        }
    })
    return data
}

export const updateRole = async (user_id) => {
    const { data } = await $authHost.put('api/user', { user_id })
    return data
}
