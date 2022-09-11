import {
    homepageList,
    loginAndRegister,
    dashboard,
    profile,
    sector,
    department,
    createCompany,
    departmentList,
    departmentCompany,
    createDepartment,
    editDepartment,
    deleteDepartment,
    departmentOfCompany,
    allEmployee
} from "./axios.js"

import {
    Toast
} from "../toastify.js"

import {
    Toast2
} from "../toastify.js"



export class Request {

    static async requestCompanyHomePage() {
        const base = await homepageList
            .get(`/companies`)
            .then(res => res.data.reverse())
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

    static async requestUser() {
        const base = await dashboard
            .get(`/users/profile`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestChangeProfile(body) {
        const base = await profile
            .patch(`/users`, body)
            .then((res) => {
                Toast.create('Dados Atualizados com Sucesso', "#00992e")
                setTimeout(() => {
                    window.location.replace('../../../src/pages/dashboard.html')
                }, 3000)
                console.log(res)
            })
            .catch(err => console.log(err))
        return base
    }

    static async requestSector() {
        const base = await sector
            .get(`/sectors`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestDepartment() {
        const base = await department
            .get(`/departments`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestCreateCompany(body) {
        const base = await createCompany
            .post(`/companies`, body)
            .then((res => {
                Toast2.create('Empresa cadastrada com Sucesso', "#00992e")
                return res
            }))
            .catch((err) => {
                Toast2.create('Empresa Não Cadastrada, verifique os campos', "#d90a02")
                console.log(err.response.data)
            })
        return base
    }

    static async requestDepartment() {
        const base = await departmentList
            .get(`/departments`)
            .then(res => res.data.reverse())
            .catch(err => console.log(err))
        return base
    }
    static async requestDepartmentCompany(id) {
        const base = await departmentCompany
            .get(`/${id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }


    static async requestCreateDepartment(body) {
        const base = await createDepartment
            .post(`/departments`, body)
            .then((res) => {
                Toast.create('Departamento Criado com Sucesso', "#00992e")
                console.log(res.data)
            })
            .catch((err) => {
                Toast.create('Departamento não criado, verifique os campos', "#d90a02")
                console.log(err)
            })
        return base
    }

    static async requestEditDepartment(id, body) {
        const base = await editDepartment
            .patch(`/${id}`, body)
            .then((res) => {
                Toast.create('Departamento Atualizado com Sucesso', "#00992e")
                return res.data
            })
            .catch((err) => {
                Toast.create('Departamento não Atualizado, verifique os campos', "#d90a02")
                console.log(err)
            })
        return base
    }

    static async requestDeleteDepartment(id) {
        const base = await deleteDepartment
            .delete(`/${id}`)
            .then((res) => {
                Toast.create('Departamento Excluido com Sucesso', "#00992e")
                return res.data
            })
            .catch((err) => {
                Toast.create('Erro ao excluir departamento', "#d90a02")
                console.log(err)
            })
        return base
    }

    static async requestSearchDepartment(id){
        const base = await departmentOfCompany
        .get(`/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
        return base
    }

    static async requestAllEmployee(){
        const base = await allEmployee
        .get(`/users`)
        .then(res => res.data)
        .catch(err => console.log(err))
        return base
    }
}