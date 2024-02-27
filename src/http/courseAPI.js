import { $host, $authHost } from './index';

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const fetchFormats = async () => {
    const { data } = await $host.get('api/format')
    return data
}

export const fetchDocuments = async () => {
    const { data } = await $host.get('api/document')
    return data
}

export const fetchCourses = async (typeTypeId) => {
    const { data } = await $host.get('api/course', {
        params: {
            typeTypeId
        }
    })
    return data
}

export const fetchShedules = async (courseCourseId) => {
    const { data } = await $host.get('api/shedule', {
        params: {
            courseCourseId
        }
    })
    return data
}

export const fetchRequests = async (sheduleSheduleId) => {
    const { data } = await $authHost.get('api/request', {
        params: {
            sheduleSheduleId
        }
    })
    return data
}

export const fetchModules = async (courseCourseId) => {
    const { data } = await $host.get('api/module', {
        params: {
            courseCourseId
        }
    })
    return data
}

export const fetchCourseUpd = async (course_id) => {
    const { data } = await $host.get('api/course/' + course_id)
    return data
}

export const fetchCourse = async (course_id) => {
    const { data } = await $host.get('api/course/' + course_id)
    return data
}

export const fetchRequest = async (request_id) => {
    const { data } = await $authHost.get('api/request/' + request_id)
    return data
}

export const deleteCourse = async (course_id) => {
    const { data } = await $authHost.delete('api/course', {
        params: {
            course_id
        }
    })
    return data
}

export const updateCourse = async (course, course_id) => {
    const { data } = await $authHost.put('api/course/' + course_id, course)
    return data
}

export const deleteShedule = async (shedule_id) => {
    const { data } = await $authHost.delete('api/shedule', {
        params: {
            shedule_id
        }
    })
    return data
}

export const deleteModule = async (module_id) => {
    const { data } = await $authHost.delete('api/module', {
        params: {
            module_id
        }
    })
    return data
}

export const createCourse = async (course) => {
    const { data } = await $authHost.post('api/course', course)
    return data
}

export const createShedule = async (shedule) => {
    const { data } = await $authHost.post('api/shedule', shedule)
    return data
}

export const createModule = async (module) => {
    const { data } = await $authHost.post('api/module', module)
    return data
}

export const deleteRequest = async (personal_id) => {
    const { data } = await $authHost.delete('api/request', {
        params: {
            personal_id
        }
    })
    return data
}

export const deleteFirmRequest = async (firm_id) => {
    const { data } = await $authHost.delete('api/request/firm', {
        params: {
            firm_id
        }
    })
    return data
}