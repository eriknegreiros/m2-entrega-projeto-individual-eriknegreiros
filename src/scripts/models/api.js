import {
    instanceA,
    instanceB
} from "./axios.js"

import {
    Toast
} from "../toastify.js"

import {
    Toast2
} from "../toastify.js"



export class Request {

    static async requestCompanyHomePage() {
        const base = await instanceA
            .get(`/companies`)
            .then(res => res.data.reverse())
            .catch(err => console.log(err))
        return base
    }

    static async requestFilterCards(sector) {
        const base = await instanceA
            .get(`/companies/${sector}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestLogin(body) {
        const base = await instanceB
            .post(`/auth/login`, body)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('is_admin', res.data.is_admin)
                localStorage.setItem('uuid', res.data.uuid)
                Toast.create('Login Realizado com sucesso', "#00992e")
                setTimeout(() => {
                    window.location.replace("./src/pages/dashboard.html")
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
        const base = await instanceB
            .post(`/auth/register/user`, body)
            .then((res) => {
                Toast.create('Conta criada com Sucesso', "#00992e")
                setTimeout(() => {
                    window.location.replace("./src/pages/login.html")
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
        const base = await instanceB
            .get(`/users/profile`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestChangeProfile(body) {
        const base = await instanceB
            .patch(`/users`, body)
            .then((res) => {
                Toast.create('Dados Atualizados com Sucesso', "#00992e")
                setTimeout(() => {
                    window.location.replace('./src/pages/dashboard.html')
                }, 3000)
                console.log(res)
            })
            .catch(err => console.log(err))
        return base
    }

    static async requestSector() {
        const base = await instanceB
            .get(`/sectors`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestDepartment() {
        const base = await instanceB
            .get(`/departments`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }

    static async requestCreateCompany(body) {
        const base = await instanceB
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
        const base = await instanceB
            .get(`/departments`)
            .then(res => res.data.reverse())
            .catch(err => console.log(err))
        return base
    }

    static async requestDepartmentCompany(id) {
        const base = await instanceB
            .get(`/${id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        return base
    }


    static async requestCreateDepartment(body) {
        const base = await instanceB
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
        const base = await instanceB
            .patch(`/departments/${id}`, body)
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
        const base = await instanceB
            .delete(`/departments/${id}`)
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
        const base = await instanceB
        .get(`/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
        return base
    }

    static async requestAllEmployee(){
        const base = await instanceB
        .get(`/users`)
        .then(res => res.data)
        .catch(err => console.log(err))
        return base
    }

    static async requestAllEmplyeeOffJob(){
        const base = await instanceB
        .get(`/admin/out_of_work`)
        .then(res => res.data)
        .catch(err => console.log(err))
        return base
    }

    static async requestHireEmployee(body){
        const base = await instanceB
        .patch(`/departments/hire/`, body)
        .then((res) =>{
           Toast.create('Usuário Contratado com sucesso', "#00992e" )
            return res.data
        })
        .catch((err) =>{
            Toast.create('Usuário Não contratado', "#d90a02")
                console.log(err)
        })
            
        return base
    }

    static async requestEditEmployee(id, body){
        const base = await instanceB
        .patch(`/admin/update_user/${id}`, body)
        .then((res) =>{
           Toast.create('Usuário Editado com sucesso', "#00992e" )
            return res.data
        })
        .catch((err) =>{
            Toast.create('Revise os campos', "#d90a02")
                console.log(err)
        })
            
        return base
    }

    static async requestDeleteEmployee(id){
        const base = await instanceB
        .delete(`/admin/delete_user/${id}`)
        .then((res) =>{
           Toast.create('Usuário Deletado com sucesso', "#00992e" )
            return res.data
        })
        .catch((err) =>{
            Toast.create('Erro ao deletar Funcionário', "#d90a02")
                console.log(err)
        })
            
        return base
    }

    static async requestDismissEmployee(id){
        const base = await instanceB
        .patch(`/departments/dismiss/${id}`)
        .then((res) =>{
           Toast.create('Usuário Demitido com sucesso', "#00992e" )
            return res.data
        })
        .catch((err) =>{
            Toast.create('Erro ao demitir Funcionário', "#d90a02")
                console.log(err)
        })
            
        return base
    }

    static async requestDepartamentUser(){
        const base = await instanceB
        .get(`/users/departments`)
        .then(res => res.data)
        .catch(err => console.log(err))
        return base
    }

    static async requestEmployeeUser(){
        const base = await instanceB
        .get(`/users/departments/coworkers
        `)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        return base
    }
}