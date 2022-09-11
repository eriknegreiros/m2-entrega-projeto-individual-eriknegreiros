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
            window.location.replace('../../../index.html')
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

        if (localStorage.getItem('is_admin') == 'false') {
            sector.classList.add('none')
        } else if 
        (localStorage.getItem('is_admin') == 'true') {
            profile.classList.add('none')
        }
    }

}


class Department {
    static renderDepartment(data) {
        const allDepartmentCards = document.querySelector('.all_departments_cards')

        data.forEach((element) => {
            const bgDepartmentCard = document.createElement('div')
            const departmentTitle = document.createElement('h1')
            const departmentDescription = document.createElement('p')

            bgDepartmentCard.classList.add('bg_department_card')
            departmentTitle.classList.add('department_tile')
            departmentDescription.classList.add('department_description')

            departmentTitle.innerText = element.name
            departmentDescription.innerText = element.description

            bgDepartmentCard.append(departmentTitle, departmentDescription)
            allDepartmentCards.append(bgDepartmentCard)
        })
    }

    static async createDepartment() {
        if (localStorage.getItem('is_admin') == 'true') {

            const btnHeaderCreate = document.querySelector('.btn_create_department')
            const department = await Request.requestCompanyHomePage()


            btnHeaderCreate.addEventListener('click', async (event) => {
                event.preventDefault()

                const body = document.querySelector('body')

                const modalDepartment = document.createElement('div')

                const bgModal = document.createElement('div')
                const divModalUp = document.createElement('div')
                const titleDepartmentModal = document.createElement('h1')
                const closeBtnDepartment = document.createElement('p')

                const inputDepartmentModal = document.createElement('div')
                const inputName = document.createElement('input')
                const inputDescription = document.createElement('input')
                const select = document.createElement('select')
                const btnCreate = document.createElement('button')


                modalDepartment.classList.add('modalDepartment')
                bgModal.classList.add('bg_modal')
                divModalUp.classList.add('div_modal_up')
                titleDepartmentModal.classList.add('title_department_modal')
                closeBtnDepartment.classList.add('close_btn_department')
                inputDepartmentModal.classList.add('input_department_modal')
                inputName.classList.add('input_department_create', 'input_name')
                inputDescription.classList.add('input_department_create', 'input_description')
                btnCreate.classList.add('btn_create_modal')

                titleDepartmentModal.innerText = 'Criar Departamento'
                closeBtnDepartment.innerText = 'X'
                inputName.placeholder = 'Nome do Departamento'
                inputDescription.placeholder = 'Descrição do Departamento'
                btnCreate.innerText = 'Criar departamento'


                department.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.name
                    select.append(option)
                })

                closeBtnDepartment.addEventListener('click', (event) => {
                    event.preventDefault()
                    modalDepartment.classList.toggle('close_menu')
                })

                btnCreate.addEventListener('click', async (event) => {
                    event.preventDefault()

                    const data = {
                        name: inputName.value,
                        description: inputDescription.value,
                        company_uuid: select.options[select.selectedIndex].value
                    }

                    console.log(data)
                    await Request.requestCreateDepartment(data)
                    modalDepartment.classList.toggle('close_menu')

                    const listOfDepartment = await Request.requestDepartment()

                    Department.renderDepartment(listOfDepartment)

                })


                inputDepartmentModal.append(inputName, inputDescription, select, btnCreate)
                divModalUp.append(titleDepartmentModal, closeBtnDepartment)
                bgModal.append(divModalUp, inputDepartmentModal)
                modalDepartment.append(bgModal)
                body.append(modalDepartment)
            })
        } else {}
    }
    static async editDepartment() {
        if (localStorage.getItem('is_admin') == 'true') {
            const btnHeaderEdit = document.querySelector('.btn_edit_department')
            const department = await Request.requestDepartment()

            btnHeaderEdit.addEventListener('click', (event) => {
                event.preventDefault()

                const body = document.querySelector('body')

                const modalDepartment = document.createElement('div')

                const bgModal = document.createElement('div')
                const divModalUp = document.createElement('div')
                const titleDepartmentModal = document.createElement('h1')
                const closeBtnDepartment = document.createElement('p')

                const inputDepartmentModal = document.createElement('div')
                const inputDescription = document.createElement('input')
                const select = document.createElement('select')
                const btnEdit = document.createElement('button')


                modalDepartment.classList.add('modalDepartment')
                bgModal.classList.add('bg_modal')
                divModalUp.classList.add('div_modal_up')
                titleDepartmentModal.classList.add('title_department_modal')
                closeBtnDepartment.classList.add('close_btn_department')
                closeBtnDepartment.addEventListener('click', (event) => {
                    event.preventDefault()
                    modalDepartment.classList.toggle('close_menu')
                })
                inputDepartmentModal.classList.add('input_department_modal')
                inputDescription.classList.add('input_department_create', 'input_description')
                btnEdit.classList.add('btn_create_modal')

                titleDepartmentModal.innerText = ' Editar departamento'
                closeBtnDepartment.innerText = 'X'
                inputDescription.placeholder = 'Descrição do Departamento'
                btnEdit.innerText = 'Atualizar departamento'

                department.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.name
                    select.append(option)
                })



                btnEdit.addEventListener('click', async (event) => {
                    event.preventDefault()

                    const data = {
                        description: inputDescription.value
                    }


                    await Request.requestEditDepartment(data, select.options[select.selectedIndex].value)

                    modalDepartment.classList.toggle('close_menu')
                })




                inputDepartmentModal.append(select, inputDescription, btnEdit)
                divModalUp.append(titleDepartmentModal, closeBtnDepartment)
                bgModal.append(divModalUp, inputDepartmentModal)
                modalDepartment.append(bgModal)
                body.append(modalDepartment)
            })
        } else {}
    }


    static async deleteDepartmente() {
        if (localStorage.getItem('is_admin') == 'true') {
            const btnHeaderDelete = document.querySelector('.btn_delete_department')
            const department = await Request.requestDepartment()

            btnHeaderDelete.addEventListener("click", async (event) => {

                event.preventDefault()

                const body = document.querySelector('body')

                const modalDepartment = document.createElement('div')

                const bgModal = document.createElement('div')
                const divModalUp = document.createElement('div')
                const titleDepartmentModal = document.createElement('h1')
                const closeBtnDepartment = document.createElement('p')
                const inputDepartmentModal = document.createElement('div')
                const select = document.createElement('select')
                const btnDelete = document.createElement('button')


                modalDepartment.classList.add('modalDepartment')
                bgModal.classList.add('bg_modal')
                divModalUp.classList.add('div_modal_up')
                titleDepartmentModal.classList.add('title_department_modal')
                closeBtnDepartment.classList.add('close_btn_department')
                closeBtnDepartment.addEventListener('click', (event) => {
                    event.preventDefault()
                    modalDepartment.classList.toggle('close_menu')
                })
                inputDepartmentModal.classList.add('input_department_modal')
                btnDelete.classList.add('btn_create_modal')

                titleDepartmentModal.innerText = ' Deletar departamento'
                closeBtnDepartment.innerText = 'X'
                btnDelete.innerText = 'Excluir departamento'

                department.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.name
                    select.append(option)
                })
                inputDepartmentModal.append(select, btnDelete)
                divModalUp.append(titleDepartmentModal, closeBtnDepartment)
                bgModal.append(divModalUp, inputDepartmentModal)
                modalDepartment.append(bgModal)
                body.append(modalDepartment)

                btnDelete.addEventListener('click', async (event) => {
                    event.preventDefault()

                    await Request.requestDeleteDepartment(select.options[select.selectedIndex].value)

                    console.log(select.options[select.selectedIndex].value)

                    modalDepartment.classList.toggle('close_menu')
                })

            })

        } else {}

    }
    static renderModalCompanyDepartmente() {
        const body = document.querySelector('body')

        const modalCompany = document.createElement('div')
        const modalCompleteCompany = document.createElement('div')
        const modalUpCompany = document.createElement('div')
        const enterpriseTitle = document.createElement('h1')
        const closeBtnModalCompany = document.createElement('p')
        const divCompanyRender = document.createElement('div')
        const divCompany = document.createElement('div')
        const titleCompany = document.createElement('h2')
        const departmentCompany = document.createElement('p')

        modalCompany.classList.add('modal_company')
        modalCompleteCompany.classList.add('modal_complete_company')
        modalUpCompany.classList.add('modal_up_company')
        enterpriseTitle.classList.add('enterprise_title')
        closeBtnModalCompany.classList.add('close_btn_modal_company')
        divCompanyRender.classList.add('div_company_render')
        divCompany.classList.add('div_company')
        titleCompany.classList.add('title_company')
        departmentCompany.classList.add('department_company')

        divCompany.append(titleCompany, departmentCompany)
        divCompanyRender.append(divCompany)
        modalUpCompany.append(enterpriseTitle, closeBtnModalCompany)
        modalCompleteCompany.append(modalUpCompany, divCompanyRender)
        modalCompany.append(modalCompleteCompany)
        body.append(modalCompany)
    }


    static renderModal() {
        const btnSearch = document.querySelector('.btn_departament_company')

        btnSearch.addEventListener('click', async (event) => {
            event.preventDefault()

            const enterpriseId = await Request.requestCompanyHomePage()

            console.log(enterpriseId)
        
            await Request.requestDepartmentCompany()

        

            const input = document.querySelector('.input_search_company_department')

            const pesquisar = input.value.toLowerCase()


        })
    }

}

const listOfDepartment = await Request.requestDepartment()

Department.renderDepartment(listOfDepartment)
Dashboard.Userlogged()
Dashboard.showMenu()
Department.createDepartment()
Department.editDepartment()
Department.deleteDepartmente()
Department.renderModal()