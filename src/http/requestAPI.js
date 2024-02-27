import { $authHost, $host } from './index';

export const createRequest = async (request) => {
    const { data } = await $host.post('api/request', request)
    return data
}

export const createFirmRequest = async (request) => {
    const { data } = await $host.post('api/request/firm', request)
    return data
}

export const createMailRequest = async (request) => {
    const { data } = await $host.post('api/mail', request)
    return data
}

export const fetchMails = async () => {
    const { data } = await $authHost.get('api/mail')
    return data
}

export const deleteMail = async (mail_id) => {
    const { data } = await $authHost.delete('api/mail', {
        params: {
            mail_id
        }
    })
    return data
}

export const createMail = async (mail) => {
    const { data } = await $authHost.post('api/mail/addMail', mail)
    return data
}