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

    static async createCompany() {
        const btnCreate = document.querySelector('.create_company_btn')
        const modal = document.querySelector('.create_modal')

        btnCreate.addEventListener('click', () => {
            modal.classList.remove('close_menu')
        })

        const closeModal = document.querySelector('.closed_btn')
        closeModal.addEventListener('click', () => {
            modal.classList.add('close_menu')
        })


        const btnSend = document.querySelector('.btn_send')

        btnSend.addEventListener('click', async (event) => {
            event.preventDefault()

            const name = document.querySelector('.name_comp')
            const hour = document.querySelector('.hour_comp')
            const description = document.querySelector('.description_comp')

            const select = document.getElementById('valores')

            console.log(name.value)
            console.log(hour.value)
            console.log(description.value)
            console.log(select.value)

            const data = {
                name: name.value,
                opening_hours: hour.value,
                description: description.value,
                sector_uuid: select.value
            }
            
            await Request.requestCreateCompany(data)

        })

    }


}



Dashboard.Userlogged()
Dashboard.showMenu()

const enterprise = await Request.requestCompanyHomePage()
Company.renderCompany(enterprise)
Company.searchCompany()
Company.createCompany()