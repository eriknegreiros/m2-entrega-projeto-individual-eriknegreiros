import { Request } from "./models/api.js"

class Login {

    static loginUser(){
        const entrarBtn = document.querySelector('.entrar_btn')

        const email = document.querySelector('.input_email')
        const password = document.querySelector('.input_password')

        entrarBtn.addEventListener('click', async (event) =>{
            event.preventDefault()

            const data = {  
                email: email.value, 
                password: password.value
            }

            await Request.requestLogin(data)


        })
    }
}

Login.loginUser()