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
        'Content-Type': 'application/json'
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