const token = localStorage.getItem('token')

export const homepageList = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer null`
    }
})

export const loginAndRegister = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})


export const dashboard = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }

})

export const profile = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }

})


export const sector = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})


export const department = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})


export const createCompany = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export const departmentList = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export const departmentCompany = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export const createDepartment = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export const editDepartment = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export const deleteDepartment = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})


export const departmentOfCompany = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})


export const allEmployee = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})