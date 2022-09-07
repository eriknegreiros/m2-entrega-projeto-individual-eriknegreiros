import {
    homepageList,
    loginAndRegister
} from "./axios.js"

import {
    Toast
} from "../toastify.js"



export class Request {

    static async requestCompanyHomePage() {
        const base = await homepageList
            .get(`/companies`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestFilterCards(sector) {
        const base = await homepageList
            .get(`/companies/${sector}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestLogin(body) {
        const base = await loginAndRegister
            .post(`/auth/login`, body)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('is_admin', res.data.is_admin)
                localStorage.setItem('uuid', res.data.uuid)
                Toast.create('Login Realizado com sucesso', "#00992e")
                setTimeout(() => {
                    window.location.replace("../../../src/pages/dashboard.html")
                }, 1000)
                return res.data
            })
            .catch((err) => {
                Toast.create('Email ou senha invalidos', "#d90a02")
                console.log(err.data)
            })
        return base
    }

    static async requestSignUp(body) {
        const base = await loginAndRegister
            .post(`/auth/register/user`, body)
            .then((res) => {
                Toast.create('Conta criada com Sucesso', "#00992e")
                setTimeout(() => {
                    window.location.replace("../../../src/pages/login.html")
                }, 1000)
                return res
            })
            .catch((err) => {
                Toast.create('Conta não criada, verifique os campos', "#d90a02")
                console.log(err)
            })
        return base
    }
}