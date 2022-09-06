import {
    Request
} from "./models/api.js"

class Company {
    static renderCards(data) {
        const cardsCompleteDiv = document.querySelector('.cards_complete_div')
        cardsCompleteDiv.innerHTML = ''
        data.forEach((element) => {
            const cardBg = document.createElement('div')
            const divBorder = document.createElement('div')
            const nameCompany = document.createElement('h1')
            const nameDepartment = document.createElement('p')
            const quality = document.createElement('p')


            cardBg.classList.add('card_bg')
            divBorder.classList.add('div_border')
            nameCompany.classList.add('name_company')
            nameDepartment.classList.add('name_department')
            quality.classList.add('quality')

            nameCompany.innerText = element.name
            nameDepartment.innerText = element.sectors.description
            quality.innerText = element.description


            divBorder.append(nameCompany)
            cardBg.append(divBorder, nameDepartment, quality)
            cardsCompleteDiv.append(cardBg)
        })
    }

    static search() {
        const searchBtn = document.querySelector('.search_btn')



        searchBtn.addEventListener('click', async (event) => {
            event.preventDefault()
            const inputSearch = document.querySelector('.input_search')

            const allCards = await Request.requestCompanyHomePage()

            const pesquisar = inputSearch.value.toLowerCase()
            console.log(pesquisar)

            const filtered = allCards.filter(element =>
                element.name.toLowerCase().includes(pesquisar) ||
                element.sectors.description.toLowerCase().includes(pesquisar)
            )

            this.renderCards(filtered)


        })
    }
}



const company = await Request.requestCompanyHomePage()

Company.renderCards(company)
Company.search()