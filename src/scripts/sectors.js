import { Request } from "./models/api.js"

export class Dashboard {

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

        if (localStorage.getItem('is_admin') == 'false') {
            sector.classList.add('none')
        } else if (localStorage.getItem('is_admin') == 'true') {
            profile.classList.add('none')
        }
    }
}

class Sector {
    static renderSector(data){
        const divCard = document.querySelector('.div_card')

       const base = data.forEach((element) =>{
            const card = document.createElement('div')
            const nameSector = document.createElement('h2')
    
            card.classList.add('card')
            nameSector.classList.add('name_sector')
    
            nameSector.innerText = element.description
    
            card.append(nameSector)
            divCard.append(card)
        })
        return base
    }
}



Dashboard.showMenu()

const section = await Request.requestSector()
Sector.renderSector(section)

