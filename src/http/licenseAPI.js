import { $host, $authHost } from './index';

export const fetchLicenses = async () => {
    const { data } = await $host.get('api/license')
    return data
}

export const fetchPdn = async () => {
    const { data } = await $host.get('api/license/pdn')
    return data
}

export const deleteLicense = async (license_id) => {
    const { data } = await $authHost.delete('api/license', {
        params: {
            license_id
        }
    })
    return data
}

export const createLicense = async (license) => {
    const { data } = await $authHost.post('api/license', license)
    return data
}

export const updatePdn = async (license) => {
    const { data } = await $authHost.post('api/license/pdn', license)
    return data
}
