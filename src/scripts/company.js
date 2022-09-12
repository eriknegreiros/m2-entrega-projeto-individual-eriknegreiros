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

        if (localStorage.getItem('is_admin') == 'false') {
            sector.classList.add('none')
            worker.classList.add('none')
        } else if (localStorage.getItem('is_admin') == 'true') {
            profile.classList.add('none')
        }
    }
}

class Company {
    static renderCompany(data) {

        if (localStorage.getItem('is_admin') == 'true') {
            const allCardsCmpany = document.querySelector('.all_cards_company')

            allCardsCmpany.innerHTML = ''

            
            data.forEach((element) => {
                const bgCard = document.createElement('div')
                const nameCompany = document.createElement('h1')
                const hourCompany = document.createElement('p')
                const activityCompany = document.createElement('p')
                


                bgCard.classList.add('bg_card_company')
                nameCompany.classList.add('name_company')
                hourCompany.classList.add('hour_company')
                activityCompany.classList.add('activity_company')


                nameCompany.innerText = element.name
                hourCompany.innerText = element.opening_hours
                activityCompany.innerText = element.sectors.description


                bgCard.append(nameCompany, hourCompany, activityCompany)
                allCardsCmpany.append(bgCard)
            })
        } else {}
    }

    static searchCompany() {

        if (localStorage.getItem('is_admin') == 'true') {
            const btnSearch = document.querySelector('.btn_search_company')

            btnSearch.addEventListener('click', async (event) => {
                event.preventDefault()

                const input = document.querySelector('.input_company')

                const allCards = await Request.requestCompanyHomePage()

                const pesquisar = input.value.toLowerCase()

                const filtered = allCards.filter(element =>
                    element.name.toLowerCase().includes(pesquisar) ||
                    element.sectors.description.toLowerCase().includes(pesquisar)
                )
                this.renderCompany(filtered)
                input.value = ''
            })
        }

    }

    static async createCompany() {

        if (localStorage.getItem('is_admin') == 'true') {
            const btnCreate = document.querySelector('.create_company_btn')
            const sectors = await Request.requestSector()
            const body = document.querySelector('body')

            btnCreate.addEventListener('click', async (event) => {
                event.preventDefault()


                const createModal = document.createElement('div')
                const modal = document.createElement('div')
                const divTitleModal = document.createElement('div')
                const TitleModal = document.createElement('h1')
                const closedBtn = document.createElement('p')
                const divInput = document.createElement('div')
                const inputName = document.createElement('input')
                const inputHour = document.createElement('input')
                const inputdescr = document.createElement('input')

                const select = document.createElement('select')
                const btnSend = document.createElement('button')

                createModal.classList.add('create_modal')
                modal.classList.add('modal')
                divTitleModal.classList.add('div_title_modal')
                TitleModal.classList.add('title_modal')
                closedBtn.classList.add('closed_btn')
                divInput.classList.add('div_input')
                inputName.classList.add('input_create', 'name_comp')
                inputHour.classList.add('input_create', 'hour_comp')
                inputdescr.classList.add('input_create', 'description_comp')
                select.classList.add('select_value')
                btnSend.classList.add('btn', 'btn_send')


                TitleModal.innerText = 'Cadastrar Empresa'
                closedBtn.innerText = 'X'
                inputName.placeholder = 'Nome da Empresa'
                inputHour.type = 'Time'
                inputdescr.placeholder = 'Descrição da Empresa'
                btnSend.innerText = 'Cadastrar'

                sectors.forEach((element) => {
                    const option = document.createElement('option')
                    option.value = element.uuid
                    option.innerText = element.description

                    select.append(option)
                })


                closedBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    createModal.classList.toggle('close_menu')
                })


                btnSend.addEventListener('click', async (event) => {
                    event.preventDefault()

                    const data = {
                        name: inputName.value,
                        opening_hours: inputHour.value,
                        description: inputdescr.value,
                        sector_uuid: select.options[select.selectedIndex].value
                    }
                    await Request.requestCreateCompany(data)
                    const enterprise = await Request.requestCompanyHomePage()
                    
                    Company.renderCompany(enterprise)
                    createModal.classList.toggle('close_menu')
                })
               
                divInput.append(inputName, inputHour, inputdescr, select, btnSend)
                divTitleModal.append(TitleModal, closedBtn)
                modal.append(divTitleModal, divInput)
                createModal.append(modal)
                body.append(createModal)
            })
        }


    }


}



Dashboard.Userlogged()
Dashboard.showMenu()
const enterprise = await Request.requestCompanyHomePage()
Company.renderCompany(enterprise)

Company.swipper
Company.searchCompany()
Company.createCompany()