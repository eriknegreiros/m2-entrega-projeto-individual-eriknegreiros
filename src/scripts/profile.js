import {
    Request
} from "./models/api.js";


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
        } else if 
        (localStorage.getItem('is_admin') == 'true') {
            profile.classList.add('none')
        }
    }

}

class ChangeProfile {

    static async changeUser() {

        if (localStorage.getItem('is_admin') == 'false') {
            const username = document.querySelector('.username_profile')
            const email = document.querySelector('.email_profile')
            const password = document.querySelector('.password_profile')
            const btn = document.querySelector('.btn_atualizar')

            const user = await Request.requestUser()

            username.value = user.username
            email.value = user.email 
            password.value = '******'



            btn.addEventListener('click', async (event) => {
                event.preventDefault()

                const base = {
                    username: username.value,
                    email: email.value,
                    password: password.value
                }
                await Request.requestChangeProfile(base)
                console.log(base)
            })
        }
    }
}


console.log('osdasdasdasdadsi')

Dashboard.showMenu()

const user = await Request.requestUser()
console.log(user)

ChangeProfile.changeUser(user)