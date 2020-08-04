var parameter = require("./parameter.json")

function login() {
    var xhr = new XMLHttpRequest()

    var responseText = ""

    var usernameEmail = document.getElementById("inputUsernameEmail").value
    var password = document.getElementById("inputPassword").value

    if (document.getElementById("inputUsernameEmail").value != "" && document.getElementById("inputPassword").value != "") {
        var data = { usernameEmail: usernameEmail, password: password }
        var url = `${parameter.url}/login`
        xhr.open("POST", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify(data))

        document.getElementById("inputUsernameEmail").value = ""
        document.getElementById("inputPassword").value = ""

        var json = JSON.parse(xhr.response)
        if ("id" in json) {
            console.log(json)
            responseText = json.id
        } else
            responseText = json.error
        
    } else
        responseText = "Ki kell tölteni mindent!"
    document.getElementById("status").innerHTML = `<h3>${responseText}</h3>`
}

function registration() {
    var xhr = new XMLHttpRequest()

    var responseText = ""

    var username = document.getElementById("inputUsername").value
    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value

    if (document.getElementById("inputUsername").value != "" && document.getElementById("inputEmail").value != "" && document.getElementById("inputPassword").value != "") {
        var data = { username: username, email: email, password: password }
        var url = `${parameter.url}/registration`
        xhr.open("POST", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify(data))

        var json = JSON.parse(xhr.response)
        if ("message" in json) {
            document.getElementById("inputUsername").value = ""
            document.getElementById("inputEmail").value = ""
            window.location.href="index.html"
        } else {
            console.log(json)
            responseText = json.error
        }
        document.getElementById("inputPassword").value = ""
    } else
        responseText = "Ki kell tölteni mindent!"
    document.getElementById("status").innerHTML = `<h3>${responseText}</h3>`
}

function emailVerification() {
    var xhr = new XMLHttpRequest()
    var url = `${parameter.url}/verification`
    xhr.open("POST", url, false)
    xhr.setRequestHeader("Content-type", "application/json")
    var id = new URL(window.location.href).searchParams.get("id")
    xhr.send(JSON.stringify({ id: id }))
    if (xhr.responseText == "success")
        document.getElementById("status").innerHTML = "<h1>Successful verification</h1>"
    else
        document.getElementById("status").innerHTML = "<h1>Already verificated</h1>"          
    //setTimeout(function() { window.location.href = "http://www.trophien.com" }, 100)
    setTimeout(function() { window.close }, 100)
}

function sendForgotPassword() {
    if (document.getElementById("input_email").value != "") {
        var xhr = new XMLHttpRequest()
        var url = `http://${parameter.url}/forgotpassword`
        xhr.open("POST", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify({ email: document.getElementById("input_email").value }))
        window.location.href = "http://www.trophien.com";
    } else
        document.getElementById("status").innerHTML = "<h1>You have to fill all of the form!</h1>"
}

function forgotPassword() {
    if (document.getElementById("input_password").value != "" && document.getElementById("input_password_again").value != "" && document.getElementById("input_password").value == document.getElementById("input_password_again").value) {
        var xhr = new XMLHttpRequest()
        var url = `http://localhost:8080/forgotpassword`
        xhr.open("PUT", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        var id = new URL(window.location.href).searchParams.get("id")
        xhr.send(JSON.stringify({ id: id, password: document.getElementById("input_password").value }))
        setTimeout(function() { window.location.href = "http://www.trophien.com" }, 100)
    } else if (document.getElementById("input_password").value != document.getElementById("input_password_again").value)
        document.getElementById("status").innerHTML = "<h1>Passwords doesn't correct!</h1>"
    else
        document.getElementById("status").innerHTML = "<h1>You have to fill all of the form!</h1>"
    document.getElementById("input_password").value = ""
    document.getElementById("input_password_again").value = ""
}