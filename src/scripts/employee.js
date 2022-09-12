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
        const worker = document.querySelector('.oficial')
        const employee = document.querySelector('.employ')

        if (localStorage.getItem('is_admin') == 'false') {
            sector.classList.add('none')
            worker.classList.add('none')
            employee.classList.add('none')
        } else if (localStorage.getItem('is_admin') == 'true') {
            profile.classList.add('none')
        }
    }

    static renderEmployee(data) {
        if (localStorage.getItem('is_admin') == 'true') {
            const allCards = document.querySelector('.all_cards_employee')

            allCards.innerHTML = ''


            data.forEach((element) => {
                const bgCard = document.createElement('div')
                const nameEmployee = document.createElement('h1')
                const professionalLevel = document.createElement('p')
                const kindOfWork = document.createElement('p')



                bgCard.classList.add('bg_card_employee')
                nameEmployee.classList.add('name_employee')
                professionalLevel.classList.add('level_professional')
                kindOfWork.classList.add('kind_of_work')


                nameEmployee.innerText = element.username
                professionalLevel.innerText = element.professional_level
                kindOfWork.innerText = element.kind_of_work


                bgCard.append(nameEmployee, professionalLevel, kindOfWork)
                allCards.append(bgCard)
            })
        } else {}

    }

    static renderEmployeeOfJob(data) {
        if (localStorage.getItem('is_admin') == 'true') {
            const allCards = document.querySelector('.all_cards_employees_off_company')

            allCards.innerHTML = ''


            data.forEach((element) => {
                const bgCard = document.createElement('div')
                const nameEmployee = document.createElement('h1')
                const professionalLevel = document.createElement('p')
                const kindOfWork = document.createElement('p')



                bgCard.classList.add('bg_card_employee')
                nameEmployee.classList.add('name_employee')
                professionalLevel.classList.add('level_professional')
                kindOfWork.classList.add('kind_of_work')


                nameEmployee.innerText = element.username
                professionalLevel.innerText = element.professional_level
                kindOfWork.innerText = element.kind_of_work


                bgCard.append(nameEmployee, professionalLevel, kindOfWork)
                allCards.append(bgCard)
            })
        } else {}
    }


    static async hireEmployee() {
        if (localStorage.getItem('is_admin') == 'true') {
            const btnHire = document.querySelector('.hireEmployeeBtn')
            const employees = await Request.requestAllEmplyeeOffJob()
            const department = await Request.requestDepartment()

            const body = document.querySelector('body')

            btnHire.addEventListener('click', (event) => {
                event.preventDefault()

                const createModal = document.createElement('div')
                const modal = document.createElement('div')
                const divTitleModal = document.createElement('div')
                const TitleModal = document.createElement('h1')
                const closedBtn = document.createElement('p')
                const divInput = document.createElement('div')
                const select = document.createElement('select')
                const select2 = document.createElement('select')
                const btnSend = document.createElement('button')

                createModal.classList.add('create_modal')
                modal.classList.add('modal')
                divTitleModal.classList.add('div_title_modal')
                TitleModal.classList.add('title_modal')
                closedBtn.classList.add('closed_btn')
                divInput.classList.add('div_input')
                select.classList.add('select_value')
                btnSend.classList.add('btn', 'btn_send')


                TitleModal.innerText = 'Contratar Funcionario'
                closedBtn.innerText = 'X'
                btnSend.innerText = 'Contratar'

                employees.forEach((element) => {
                    const option = document.createElement('option')

                    option.value = element.uuid
                    option.innerText = element.username

                    select.append(option)
                })

                department.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.name

                    select2.append(option)
                })


                closedBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    createModal.classList.toggle('close_menu')
                })

                btnSend.addEventListener('click', async (event) => {
                    event.preventDefault()

                    const data = {
                        user_uuid: select.options[select.selectedIndex].value,
                        department_uuid: select2.options[select.selectedIndex].value
                    }
                    await Request.requestHireEmployee(data)
                    createModal.classList.toggle('close_menu')
                })

                divInput.append(select, select2, btnSend)
                divTitleModal.append(TitleModal, closedBtn)
                modal.append(divTitleModal, divInput)
                createModal.append(modal)
                body.append(createModal)

            })
        } else {}
    }

    static async editEmployee() {
        if (localStorage.getItem('is_admin') == 'true') {
            const body = document.querySelector('body')
            const btnEdit = document.querySelector('.editBtn')

            const users = await Request.requestAllEmployee()

            btnEdit.addEventListener('click', (event) => {
                event.preventDefault()

                const createModal = document.createElement('div')
                const modal = document.createElement('div')
                const divTitleModal = document.createElement('div')
                const TitleModal = document.createElement('h1')
                const closedBtn = document.createElement('p')
                const divInput = document.createElement('div')
                const select = document.createElement('select')
                const inputKindOfWork = document.createElement('input')
                const inputProfessional = document.createElement('input')
                const btnSend = document.createElement('button')

                createModal.classList.add('create_modal')
                modal.classList.add('modal')
                divTitleModal.classList.add('div_title_modal')
                TitleModal.classList.add('title_modal')
                closedBtn.classList.add('closed_btn')
                divInput.classList.add('div_input')
                select.classList.add('select_value')
                inputKindOfWork.classList.add('input_create', 'input_kind')
                inputProfessional.classList.add('input_create', 'input_profess')
                btnSend.classList.add('btn', 'btn_send')

                TitleModal.innerText = 'Editar Funcionario'
                closedBtn.innerText = 'X'
                btnSend.innerText = 'Editar'
                inputKindOfWork.placeholder = 'Tipo de Trabalho'
                inputProfessional.placeholder  ='Nivel Profissional'


                users.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.username

                    select.append(option)
                })

                closedBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    createModal.classList.toggle('close_menu')
                })

                btnSend.addEventListener('click', async (event) =>{
                    event.preventDefault()

                    const data = {
                        kind_of_work: inputKindOfWork.value, 
                        professional_level: inputProfessional.value
                    }

                    const id = select.options[select.selectedIndex].value
                    await Request.requestEditEmployee(id, data)
                    createModal.classList.toggle('close_menu')
                })

                divInput.append(select, inputKindOfWork, inputProfessional, btnSend)
                divTitleModal.append(TitleModal, closedBtn)
                modal.append(divTitleModal, divInput)
                createModal.append(modal)
                body.append(createModal)
            })
        } else{}
    }

    static async deleteEmployee(){
        if(localStorage.getItem('is_admin') == 'true'){
            const deleteBtn = document.querySelector('.deleteBtn')
            const body = document.querySelector('body')

            const users = await Request.requestAllEmployee()

            deleteBtn.addEventListener('click', (event) =>{

                event.preventDefault()

                const createModal = document.createElement('div')
                const modal = document.createElement('div')
                const divTitleModal = document.createElement('div')
                const TitleModal = document.createElement('h1')
                const closedBtn = document.createElement('p')
                const divInput = document.createElement('div')
                const select = document.createElement('select')
                const btnSend = document.createElement('button')

                createModal.classList.add('create_modal')
                modal.classList.add('modal')
                divTitleModal.classList.add('div_title_modal')
                TitleModal.classList.add('title_modal')
                closedBtn.classList.add('closed_btn')
                divInput.classList.add('div_input')
                select.classList.add('select_value')
                btnSend.classList.add('btn', 'btn_send')

                TitleModal.innerText = 'Deletar Funcionario'
                closedBtn.innerText = 'X'
                btnSend.innerText = 'Excluir'

                closedBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    createModal.classList.toggle('close_menu')
                })

                users.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.username

                    select.append(option)
                })

                btnSend.addEventListener('click', async (event) =>{
                    event.preventDefault()
                    const id = select.options[select.selectedIndex].value
                    
                    await Request.requestDeleteEmployee(id)
                    createModal.classList.toggle('close_menu')
                })

                divInput.append(select, btnSend)
                divTitleModal.append(TitleModal, closedBtn)
                modal.append(divTitleModal, divInput)
                createModal.append(modal)
                body.append(createModal)
            })
            



        }else{}
    }

    static async dismissEmployee(){
        if(localStorage.getItem('is_admin') == 'true'){
            const dismissBtn = document.querySelector('.dismissBtn')
            const body = document.querySelector('body')

            const users = await Request.requestAllEmployee()

            dismissBtn.addEventListener('click', (event) =>{

                event.preventDefault()

                const createModal = document.createElement('div')
                const modal = document.createElement('div')
                const divTitleModal = document.createElement('div')
                const TitleModal = document.createElement('h1')
                const closedBtn = document.createElement('p')
                const divInput = document.createElement('div')
                const select = document.createElement('select')
                const btnSend = document.createElement('button')

                createModal.classList.add('create_modal')
                modal.classList.add('modal')
                divTitleModal.classList.add('div_title_modal')
                TitleModal.classList.add('title_modal')
                closedBtn.classList.add('closed_btn')
                divInput.classList.add('div_input')
                select.classList.add('select_value')
                btnSend.classList.add('btn', 'btn_send')

                TitleModal.innerText = 'Demitir Funcionario'
                closedBtn.innerText = 'X'
                btnSend.innerText = 'Demitir'

                closedBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    createModal.classList.toggle('close_menu')
                })

                users.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.username

                    select.append(option)
                })

                btnSend.addEventListener('click', async (event) =>{
                    event.preventDefault()
                    const id = select.options[select.selectedIndex].value
                    
                    await Request.requestDismissEmployee(id)

                    createModal.classList.toggle('close_menu')
                })

                divInput.append(select, btnSend)
                divTitleModal.append(TitleModal, closedBtn)
                modal.append(divTitleModal, divInput)
                createModal.append(modal)
                body.append(createModal)
            })
        }else{}
    }

}





Dashboard.Userlogged()
Dashboard.showMenu()

const allUsers = await Request.requestAllEmployee()
Dashboard.renderEmployee(allUsers)
const UsersOfJob = await Request.requestAllEmplyeeOffJob()
Dashboard.renderEmployeeOfJob(UsersOfJob)
Dashboard.hireEmployee()
Dashboard.editEmployee()
Dashboard.deleteEmployee()
Dashboard.dismissEmployee()