import { Request } from "./models/api.js"

class SignUp{

    static Userlogged() {
        if (localStorage.getItem('token')) {
            window.location.replace('../pages/dashboard.html')
        }
    }

    static SignUpUser(){

        const SignUpBtn = document.querySelector('.signup_btn')

        const username = document.querySelector('.username')
       
        const email = document.querySelector('.email')

        const levelProfessional = document.querySelector('.professional')

        const password = document.querySelector('.password')


        SignUpBtn.addEventListener('click', async (event) =>{
            event.preventDefault()

            const data = {
                password: password.value, 
                email: email.value, 
                professional_level: levelProfessional.value, 
                username: username.value
            }
            await Request.requestSignUp(data)
        })

    }
}

SignUp.Userlogged()
SignUp.SignUpUser()