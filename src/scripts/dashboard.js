import {
    Request
} from "./models/api.js"

export class Dashboard {

    static Userlogged() {
        if (!localStorage.getItem('token')) {
            window.location.replace('../../index.html')
        }
    }

    static showMenu() {
        const logout = document.querySelector('.btn_logout')
        logout.addEventListener("click", () => {
            localStorage.clear()
            window.location.replace('../../index.html')
        })

        const asideFull = document.querySelector('.div_aside_full')
        const menuImg = document.querySelector('.menu_img')
        const closeMenu = document.querySelector('.close_menu')
        const menuDiv = document.querySelector('.close_menu_div')

        menuImg.addEventListener('click', (event) => {
            event.preventDefault()

            asideFull.style.height = '100vh'
            menuImg.classList.add('none')
            closeMenu.classList.remove('none')
            menuDiv.classList.remove('menu_order')
        })

        closeMenu.addEventListener('click', (event) => {
            event.preventDefault()

            asideFull.style.height = '120px'
            menuDiv.classList.add('menu_order')
            closeMenu.classList.add('none')
            menuImg.classList.remove('none')

        })
        const sector = document.querySelector('.sector')
        const profile = document.querySelector('.profile')
        const worker = document.querySelector('.oficial')

        if (localStorage.getItem('is_admin') == 'false') {
            sector.classList.add('none')
            worker.classList.add('none')
        } else if (localStorage.getItem('is_admin') == 'true') {
            profile.classList.add('none')
        }
    }

}


class NameUser {

    static nameOfUser(data) {
        if (localStorage.getItem('is_admin') == 'false') {
            const divWelcome = document.querySelector('.div_welcome')
            const divTextDash = document.querySelector('.div_text_dash')

            const name = document.createElement('h2')
            const textP = document.createElement('p')
            const img = document.createElement('img')


            name.classList.add('text_h2')
            textP.classList.add('text_p')
            img.classList.add('img_dash')

            name.innerText = `Seja Bem vindo(a), ${data.username}!`

            textP.innerText = 'Temos algumas informações para você'

            img.src = '../assets/imgDash.png'

            divWelcome.append(img)
            divTextDash.append(name, textP)
        } else {
            const divWelcome = document.querySelector('.div_welcome')
            const divTextDash = document.querySelector('.div_text_dash')

            const name = document.createElement('h2')
            const textP = document.createElement('p')
            const img = document.createElement('img')


            name.classList.add('text_h2')
            textP.classList.add('text_p')
            img.classList.add('img_dash')

            name.innerText = `Seja Bem vindo, administrador(a)!`

            textP.innerText = 'Temos algumas informações para você'

            img.src = '../assets/imgDash.png'

            divWelcome.append(img)
            divTextDash.append(name, textP)
        }
    }
}



class Sector {
    static renderSector(data) {
        if (localStorage.getItem('is_admin') == 'true') {
            const bgColor = document.querySelector('.bg_color')
            const nameTitle = document.createElement('h1')
            nameTitle.classList.add('name_of_title')
            nameTitle.innerText = 'Setores das Empresas'

            bgColor.append(nameTitle)

            data.forEach((element, index) => {
                const nameOfSector = document.createElement('p')

                nameOfSector.classList.add('name_of_sector')

                nameOfSector.innerText = `${index + 1} - ${element.description}`

                bgColor.append(nameOfSector)

            })
        } else {

            const bgColor = document.querySelector('.bg_color')

            bgColor.style.display = 'none'
        }
    }
}

class Department {
    static  renderDepartment(data) {
        if (localStorage.getItem('is_admin') == 'true') {

            const divCompany = document.querySelector('.div_company')
            const bgColor = document.createElement('div')
            bgColor.classList.add('bg_color')
            const titleDepartment = document.createElement('h1')

            titleDepartment.innerText = 'Departamentos'

            titleDepartment.classList.add('title_department')
            bgColor.append(titleDepartment)

            divCompany.append(bgColor)

            data.splice(0, 8).forEach((element, index) => {
                const nameDepartment = document.createElement('p')

                nameDepartment.classList.add('name_of_department')
                nameDepartment.innerText = `${index + 1} - ${element.name}`
                bgColor.append(nameDepartment)
            })
        } 
    }
    static  renderUserDepartment(data) {
        
        if (localStorage.getItem('is_admin') == 'false') {

            const divCompany = document.querySelector('.div_company')
            const bgColor = document.createElement('div')
            bgColor.classList.add('bg_color')
            const titleDepartment = document.createElement('h1')

            titleDepartment.innerText = 'Departamentos'

            titleDepartment.classList.add('title_department')
            bgColor.append(titleDepartment)

            divCompany.append(bgColor)

            data.departments.forEach((element, index) => {
                const nameDepartment = document.createElement('p')

                nameDepartment.classList.add('name_of_department')
                nameDepartment.innerText = `${index + 1} - ${element.name}`
                bgColor.append(nameDepartment)
            })
            
        } 
    }


}


class company {
    static renderCompany(data) {
        if (localStorage.getItem('is_admin') == 'true') {

            const divCompany = document.querySelector('.div_company')

            const bgColor = document.createElement('div')

            bgColor.classList.add('bg_color')

            const titleCompany = document.createElement('h1')


            titleCompany.innerText = 'Empresas'

            titleCompany.classList.add('title_company')
            bgColor.append(titleCompany)

            divCompany.append(bgColor)

            data.splice(0, 8).forEach((element, index) => {
                const nameCompany = document.createElement('p')

                nameCompany.classList.add('name_of_company')

                nameCompany.innerText = `${index + 1} - ${element.name}`

                bgColor.append(nameCompany)
            })
        } else {}
    }  
}

class EmployeeUser {
    static renderEmployee(data) {
        if (localStorage.getItem('is_admin') == 'false') {

            const divCompany = document.querySelector('.div_company')

            const bgColor = document.createElement('div')

            bgColor.classList.add('bg_color')

            const titleCompany = document.createElement('h1')


            titleCompany.innerText = 'Funcionarios do mesmo Departamento'

            titleCompany.classList.add('title_company')
            bgColor.append(titleCompany)

            divCompany.append(bgColor)

            data.forEach((element, index) => {
                const nameCompany = document.createElement('p')

                nameCompany.classList.add('name_of_company')

                nameCompany.innerText = `${index + 1} - ${element.username}`

                bgColor.append(nameCompany)
            })
           
        }
    }
}

Dashboard.Userlogged()
Dashboard.showMenu()


const user = await Request.requestUser()
NameUser.nameOfUser(user)


const section = await Request.requestSector()
Sector.renderSector(section)


const department = await Request.requestDepartment()
Department.renderDepartment(department)


const enterprise = await Request.requestCompanyHomePage()

company.renderCompany(enterprise)

const response = await Request.requestDepartamentUser()


Department.renderUserDepartment(response)

const worker = await Request.requestEmployeeUser()
EmployeeUser.renderEmployee(worker)