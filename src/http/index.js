import axios from 'axios';
import { baseURL } from "../utils/consts"

const $host = axios.create({
    baseURL: baseURL
})

const $authHost = axios.create({
    baseURL: baseURL
})

//для 2 необходимо автоматически подставлять токен каждому запросу
//для этого существую интерцепторы - фия, кя параметром принимает конфиг
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor) //будет отрабатывать перед каждым запросом и подставлять токен в хэдер авторизэйшен

export {
    $host,
    $authHost
}