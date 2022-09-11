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
        if(localStorage.getItem('is_admin') == 'true'){
            const cardWrapper = document.querySelector('.card_wrapper')

            data.forEach((element) => {
                const card = document.createElement('div')
                const cardContent = document.createElement('div')
                const nameEmployee = document.createElement('h2')
                const levelProfissional = document.createElement('p')
                const kindOfWork = document.createElement('p')
    
                card.classList.add('card', 'swiper-slide')
                cardContent.classList.add('card_content')
                nameEmployee.classList.add('name_employee')
                levelProfissional.classList.add('level_professional')
                kindOfWork.classList.add('kind_of_work')
    
                
                nameEmployee.innerText = element.username
                levelProfissional.innerText = element.professional_level
                kindOfWork.innerText = element.kind_of_work
    
                cardContent.append(nameEmployee, levelProfissional, kindOfWork)
                card.append(cardContent)
                cardWrapper.append(card)
               
            })
        }
        
    }



    static swipper() {
        const swiper = new Swiper(".slide_content", {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }


}




Dashboard.Userlogged()
Dashboard.showMenu()
Dashboard.swipper()
const allUsers = await Request.requestAllEmployee()
Dashboard.renderEmployee(allUsers)