"use strict"
let host = "localhost";
document.addEventListener("DOMContentLoaded", async function () {
    const url = `http://${host}:9090/barbershop/all`
    let ans = await fetch(url)
    let barbershops = await ans.json()
    barbershops.barbershops.forEach(function (barbershop) {
        const address = barbershop.address
        let elem =
            `
            <li class="office">
                <p class="address">${address}</p>
            </li>
            `
        let list = document.querySelector("#office-list")
        list.innerHTML += elem
    })
})