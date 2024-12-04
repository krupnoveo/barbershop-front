"use strict"
let host = "localhost";
document.addEventListener("DOMContentLoaded", function () {
    let but = document.querySelector("#register")
    let email = document.querySelector(".email")
    let password1 = document.querySelector("#pass1")
    let password2 = document.querySelector("#pass2")
    let name = document.querySelector(".name")
    let phoneNumber = document.querySelector(".phone_number")
    but.onclick = async (e) => {
        let emailValue = email.value.replaceAll(" ", "")
        let passwordValue1 = password1.value.replaceAll(" ", "")
        let passwordValue2 = password2.value.replaceAll(" ", "")
        let nameValue = name.value.replaceAll(" ", "")
        let phoneNumberValue = phoneNumber.value.replaceAll(" ", "")
        if (emailValue === "" || passwordValue1 === "" || passwordValue2 === "" || nameValue === "" || phoneNumberValue === "") {
            alert("Поля \"Имя\", \"Почта\", \"Номер телефона\" и \"Пароль\" являются обязательными")
            email.value = ""
            password1.value = ""
            password2.value = ""
            name.value = ""
            phoneNumber.value = ""
            return
        }
        if (password1.value !== password2.value) {
            alert("Пароли не совпадают!")
            return
        }
        let user = {
            email: email.value,
            password: password1.value,
            first_name: name.value.split(" ")[0],
            last_name: name.value.split(" ")[1],
            phone_number: phoneNumber.value
        }
        const url = `http://${host}:9090/auth/signup`
        let response = await axios.post(url, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            }})
        console.log(response.data)
        let jsonUser = await response.data
        let jwtToken = jsonUser.jwt_token
        console.log(jwtToken)
        localStorage.setItem("jwtToken", jwtToken)
        window.location.href = "../index.html"
    }
})