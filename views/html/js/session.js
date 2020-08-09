this.url = "http://localhost:8080/"

async function login() {
    var usernameEmail = document.getElementById("inputUsernameEmail").value
    var password = document.getElementById("inputPassword").value

    var response = await fetch(`${this.url}login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameEmail: usernameEmail, password: password })
    }).then(response => response.json())
    this.response(response)
    if ("success" in response) {
        window.location = "./table.html"
    }
}

function registration() {
    var xhr = new XMLHttpRequest()

    var responseText = ""

    var username = document.getElementById("inputUsername").value
    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value

    if (document.getElementById("inputUsername").value != "" && document.getElementById("inputEmail").value != "" && document.getElementById("inputPassword").value != "") {
        var data = { username: username, email: email, password: password }
        var url = `${this.url}registration`
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
        console.log(xhr.status)
        document.getElementById("inputPassword").value = ""
    } else
        responseText = "Ki kell tölteni mindent!"
    document.getElementById("status").innerHTML = `<h3>${responseText}</h3>`
}

async function emailVerification() {
    var id = new URL(window.location.href).searchParams.get("id")
    var response = await fetch(`${this.url}verification`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.text())
    console.log(response)
    if (response == "success")
        document.getElementById("status").innerHTML = "<h1>Successful verification</h1>"
    else
        document.getElementById("status").innerHTML = "<h1>Already verificated</h1>"
    //setTimeout(function() { window.location.href = "http://www.trophien.com" }, 100)
    setTimeout(function() { window.close }, 100)
}

function sendForgotPassword() {
    if (document.getElementById("input_email").value != "") {
        var xhr = new XMLHttpRequest()
        var url = `${this.url}forgotpassword`
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
        var url = `${this.url}forgotpassword`
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

function response(response) {
    var header = ""
    var css = ""
    var message = ""
    if ("success" in response) {
        header = "Success"
        css = "success-modal-content"
        message = response.success
    } else if ("error" in response) {
        header = "Error"
        css = "error-modal-content"
        message = response.error
    }
    // ide jön az alert a lekért válasszal
    document.getElementById("response").innerHTML = `
    <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content ${css}">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorModalLabel">${header}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">${message}</div>
            </div>
        </div>
    </div>`
    $('#successModal').modal("show")
}