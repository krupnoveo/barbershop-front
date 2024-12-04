"use strict"
let host = "localhost";
document.addEventListener("DOMContentLoaded", async function () {
    const url = `http://${host}:9090/service/all`
    let ans = await fetch(url)
    let services = await ans.json()
    console.log(services)
    services.services.forEach(function (service) {
        const name = service.name
        const description = service.description
        const cost1 = service.first_grade_price
        const cost2 = service.second_grade_price
        const cost3 = service.third_grade_price
        let elem =
            `
            <li class="service">
                <p class="name">${name}</p>
                <p class="description">${description}</p>
                <p class="cost">${cost1} / ${cost2} / ${cost3} руб.</p>
            </li>
            `
        let list = document.querySelector("#service-list")
        list.innerHTML += elem
    })
})