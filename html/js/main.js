"use strict"
let host = "localhost";
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#choose-office").addEventListener("click", function (event) {
        event.preventDefault();
        if (localStorage.getItem("jwtToken") === null) {
            // if (window.location.pathname.endsWith("index.html")) {
            //     window.location.href = './html/login.html'
            // } else {
            //     window.location.href = '../html/login.html'
            // }
            window.location.href = '../login.html'
        } else {
            // if (window.location.pathname.endsWith("index.html")) {
            //     window.location.href = './html/bookRecord.html'
            // } else {
            //     window.location.href = '../html/bookRecord.html'
            // }
            window.location.href = '../bookRecord.html'
        }
    })
})