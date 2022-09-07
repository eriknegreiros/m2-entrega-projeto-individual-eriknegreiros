
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