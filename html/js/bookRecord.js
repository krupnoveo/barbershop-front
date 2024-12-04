"use strict"

var chosenOffice;
var chosenBarber;
var chosenService;
var chosenTime;
let host = "localhost";

document.addEventListener("DOMContentLoaded", async function () {
    const officeDiv = document.querySelector("#office")
    const officeSelect = document.querySelector("#office-select")
    const offices = await axios.get(`http://${host}:9090/barbershop/all`)
    const officeP = document.querySelector("#office>p")
    offices.data.barbershops.forEach(function (office) {
        const address = office.address
        const id = office.id
        let elem = `
        <li class="office-option">
                            <p class="office-address">${address}</p>
                            <p class="office-id">${id}</p>
                        </li>
        `
        officeSelect.innerHTML += elem
    })
    officeDiv.addEventListener("click", function (event) {
        var targetElement = event.target.closest(".office-option");
        chosenOffice = targetElement;
        targetElement.style.marginTop = "10px";
        const items = document.querySelectorAll(".office-option")
        for (var item of items) {
            if (item !== chosenOffice) {
                item.style.display = "none"
            }
        }
        one()
    })
    officeP.addEventListener("click", function () {
        chosenOffice.style.marginTop = "0px";
        chosenOffice = undefined
        const items = document.querySelectorAll(".office-option")
        for (var item of items) {
            item.style.display = "flex"
        }
        one()
    })

    const bookBut = document.querySelector("#book")
    bookBut.onclick = async (e) => {
        const p2 = chosenBarber.querySelector(".barber-id").innerHTML;
        const p1 = chosenOffice.querySelector(".office-id").innerHTML
        const p3 = chosenService.querySelector(".service-id").innerHTML
        const p4 = chosenTime.querySelector(".time-id").innerHTML
        let record = {
            barbershop_id: p1,
            service_id: p3,
            barber_id: p2,
            time_id: p4
        }
        await axios.post(`http://${host}:9090/record/new`, record, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        alert("Вы записаны")
        window.location.href = "../account.html"
    }


})

async function one() {
    if (chosenOffice !== undefined) {

        const barberDiv = document.querySelector("#barber")
        barberDiv.style.display = "block"
        const barberSelect = document.querySelector("#barber-select")
        const id = chosenOffice.querySelector(".office-id").innerHTML
        const barbers = await axios.get(`http://${host}:9090/me/all?role=BARBER&barbershopId=${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        const barberP = document.querySelector("#barber>p")
        barberSelect.innerHTML = ""
        barbers.data.users.forEach(function (barber) {
            const name = barber.first_name + " " + barber.last_name
            const id = barber.id
            let elem = `
        <li class="barber-option">
                            <p class="barber-name">${name}</p>
                            <p class="barber-id">${id}</p>
                        </li>
        `
            barberSelect.innerHTML += elem
        })
        barberDiv.addEventListener("click", function (event) {
            var targetElement = event.target.closest(".barber-option");
            chosenBarber = targetElement;
            targetElement.style.marginTop = "10px";
            const items = document.querySelectorAll(".barber-option")
            for (var item of items) {
                if (item !== chosenBarber) {
                    item.style.display = "none"
                }
            }
            two()
        })
        barberP.addEventListener("click", function () {
            chosenBarber.style.marginTop = "0px";
            chosenBarber = undefined
            const items = document.querySelectorAll(".barber-option")
            for (var item of items) {
                item.style.display = "flex"
            }
            two()
        })
    }
}

async function two() {
    if (chosenOffice !== undefined && chosenBarber !== undefined) {
        const serviceDiv = document.querySelector("#service")
        serviceDiv.style.display = "block"
        const serviceSelect = document.querySelector("#service-select")
        const services = await axios.get(`http://${host}:9090/service/all`)
        const serviceP = document.querySelector("#service>p")
        serviceSelect.innerHTML = ""
        services.data.services.forEach(function (service) {
            const name = service.name
            const description = service.description
            const cost1 = service.first_grade_price
            const cost2 = service.second_grade_price
            const cost3 = service.third_grade_price
            const serviceId = service.id
            let elem = `
        <li class="service-option">
                            <p class="service-name">${name}</p>
                            <p class="service-cost">${cost1} / ${cost2} / ${cost3} руб.</p>
                            <p class="service-id">${serviceId}</p>
                        </li>
        `
            serviceSelect.innerHTML += elem
        })
        serviceDiv.addEventListener("click", function (event) {
            var targetElement = event.target.closest(".service-option");
            chosenService = targetElement;
            targetElement.style.marginTop = "10px";
            serviceSelect.style.height = "200px";
            const items = document.querySelectorAll(".service-option")
            for (var item of items) {
                if (item !== chosenService) {
                    item.style.display = "none"
                }
            }
            three()
        })
        serviceP.addEventListener("click", function () {
            chosenService.style.marginTop = "0px";
            serviceSelect.style.height = "140px";
            chosenService = undefined
            const items = document.querySelectorAll(".service-option")
            for (var item of items) {
                item.style.display = "flex"
            }
            three()
        })
    }
}
async function three() {
    if (chosenOffice !== undefined && chosenBarber !== undefined && chosenService !== undefined) {
        const timeDiv = document.querySelector("#time")
        timeDiv.style.display = "block"
        const timeSelect = document.querySelector("#time-select")
        const p = chosenBarber.querySelector(".barber-id");
        const times = await axios.get(`http://${host}:9090/available_time/all?barberId=${p.innerHTML}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        const timeP = document.querySelector("#time>p")
        timeSelect.innerHTML = ""
        times.data.times.forEach(function (time) {
            const date = new Date(time.time)
            const id = time.id
            const strDate = `${date}`
            let elem = `
        <li class="time-option">
                            <p class="time-value">${strDate.replaceAll("GMT+0300 (Москва, стандартное время)", "")}</p>
                            <p class="time-id">${id}</p>
                        </li>
        `
            timeSelect.innerHTML += elem
        })
        timeDiv.addEventListener("click", function (event) {
            var targetElement = event.target.closest(".time-option");
            chosenTime = targetElement;
            targetElement.style.marginTop = "10px";
            timeSelect.style.height = "200px";
            const items = document.querySelectorAll(".time-option")
            for (var item of items) {
                if (item !== chosenTime) {
                    item.style.display = "none"
                }
            }
        })
        timeP.addEventListener("click", function () {
            chosenTime.style.marginTop = "0px";
            timeSelect.style.height = "140px";
            chosenTime = undefined
            const items = document.querySelectorAll(".time-option")
            for (var item of items) {
                item.style.display = "flex"
            }
        })
    }


}