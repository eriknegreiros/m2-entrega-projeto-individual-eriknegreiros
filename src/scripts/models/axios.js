const token = localStorage.getItem('token')

export const instanceA = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer null`
    }
})

export const instanceB = axios.create({
    baseURL: 'http://localhost:6278',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

