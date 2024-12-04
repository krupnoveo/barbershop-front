"use strict"
let host = "localhost";
document.addEventListener("DOMContentLoaded", async function () {
    let logout = document.querySelector("#logout")
    logout.onclick = (e) => {
        localStorage.clear()
        window.location.href = "../index.html"
    }
    const url = `http://${host}:9090/me`
    let response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    const urlRecords = `http://${host}:9090/record/all`
    let response2 = await axios.get(urlRecords, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    const records = response2.data.records
    records.forEach(function (record) {
        let myRecords = document.querySelector("#my-records-list")
        const id = record.id
        const barberName = record.barber_first_name
        const serviceName = record.service_name
        const barbershopAddress = record.barbershop_address
        const recordTime = new Date(record.time)
        const cost = record.price
        let elem = `
            <li class="record">
                <div>
                  <p class="time">Время записи: ${recordTime}</p>
                  <p class="barbershop-address">Адрес: ${barbershopAddress}</p>
                  <p class="barber-name">Барбер: ${barberName}</p>
                  <p class="service-name">Услуга: ${serviceName}</p>
                  <p class="service-cost">Стоимость: ${cost} руб.</p>
                  <p class="record-uuid">${id}</p>
                </div>
                <div>
                    <button class="delete">X</button>
                </div>
            </li>
        `
        myRecords.innerHTML += elem
    })
    const deleteButtons = document.querySelectorAll(".delete")
    for (var btn of deleteButtons) {
        btn.onclick = async (e) => {
            const target = e.target.closest(".record")
            const id = target.querySelector(".record-uuid").innerHTML
            await axios.delete(`http://${host}:9090/record/${id}/delete`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
            target.parentNode.removeChild(target)
        }
    }
    const name = response.data.first_name + " " + response.data.last_name
    const email = response.data.email
    const phone = response.data.phone_number
    const inputName = document.querySelector(".name")
    const inputEmail = document.querySelector(".email")
    const inputPhone = document.querySelector(".phone-number")
    inputName.value = name
    inputEmail.value = email
    inputPhone.value = phone

    const redactBut = document.querySelector("#redact-button")
    const save = document.querySelector("#profile-save-data")
    redactBut.onclick = (e) => {
        inputName.disabled = false
        inputPhone.disabled = false
        save.disabled = false
    }

    save.onclick = async (e) => {
        const urlUpdate = `http://${host}:9090/me/update/data`

        let newData = {
            first_name: inputName.value.split(" ")[0],
            last_name: inputEmail.value.split(" ")[1],
            phone_number: inputPhone.value
        }
        let nameResponse = await axios.post(urlUpdate, newData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })

        const name = nameResponse.data.first_name + " " + nameResponse.data.last_name
        const phone = nameResponse.data.phone_number
        inputName.value = name
        inputPhone.value = phone
        inputName.disabled = true
        inputPhone.disabled = true
        save.disabled = true
    }

    const bookBut = document.querySelector("#book-new-record")
    bookBut.onclick = (e) => {
        window.location.href = "../bookRecord.html"
    }


})

