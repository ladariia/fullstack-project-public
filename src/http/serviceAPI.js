import { $host, $authHost } from './index';
export const fetchServices = async (typeofserviceTypeofserviceId) => {
    const { data } = await $host.get('api/service', {
        params: {
            typeofserviceTypeofserviceId
        }
    })
    return data
}

export const fetchAllServices = async () => {
    const { data } = await $host.get('api/service/all')
    return data
}

export const fetchService = async (service_id) => {
    const { data } = await $host.get('api/service/' + service_id)
    return data
}

export const deleteService = async (service_id) => {
    const { data } = await $authHost.delete('api/service', {
        params: {
            service_id
        }
    })
    return data
}

export const fetchOption = async (serviceServiceId) => {
    const { data } = await $host.get('api/option', {
        params: {
            serviceServiceId
        }
    })
    return data
}

export const deleteOption = async (option_id) => {
    const { data } = await $authHost.delete('api/option', {
        params: {
            option_id
        }
    })
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/typeofservice')
    return data
}

export const createService = async (service) => {
    const { data } = await $authHost.post('api/service', service)
    return data
}

export const updateService = async (service, service_id) => {
    const { data } = await $authHost.put('api/service/' + service_id, service)
    return data
}

export const createOption = async (option) => {
    const { data } = await $authHost.post('api/option', option)
    return data
}