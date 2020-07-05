this.domain = "http://localhost"
this.port = "8080"

function login() {
    var xhr = new XMLHttpRequest()

    var responseText = ""

    var usernameEmail = document.getElementById("inputUsernameEmail").value
    var password = document.getElementById("inputPassword").value

    if (document.getElementById("inputUsernameEmail").value != "" && document.getElementById("inputPassword").value != "") {
        var data = { usernameEmail: usernameEmail, password: password }
        var url = `${this.domain}:${this.port}/login`
        xhr.open("POST", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify(data))

        document.getElementById("inputUsernameEmail").value = ""
        document.getElementById("inputPassword").value = ""

        var json = JSON.parse(xhr.response)
        if ("id" in json) {
            console.log(json)
            responseText = json.id
        }

        else
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
        var url = `${this.domain}:${this.port}/registration`
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