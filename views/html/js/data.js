this.url = "http://localhost:8080/"
this.data = []

async function login() {
    var usernameEmail = document.getElementById("inputUsernameEmail").value
    var password = document.getElementById("inputPassword").value
    const lang = navigator.language.split("-")[0]

    var response = await fetch(`${this.url}login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ usernameEmail: usernameEmail, password: password, lang: lang })
    }).then(response => response.json())
    if ("error" in response) {
        this.response(response)
        document.getElementById("inputPassword").value = ""
    } else if ("success" in response) {
        window.location = "./product.html"
    }
}

async function registration() {
    var username = document.getElementById("inputUsername").value
    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value
    var passwordAgain = document.getElementById("inputPasswordAgain").value

    var response = await fetch(`${this.url}registration`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password, passwordAgain: passwordAgain })
    }).then(response => response.json())
    if ("error" in response) {
        document.getElementById("inputPassword").value = ""
        document.getElementById("inputPasswordAgain").value = ""
    }
    this.response(response)
    if ("success" in response)
        setTimeout(function() { window.location = "index.html", 1000})
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
    if (response == "success")
        document.getElementById("status").innerHTML = "<h1>Successful verification</h1>"
    else
        document.getElementById("status").innerHTML = "<h1>Already verificated</h1>"
    setTimeout(function() { window.close() }, 100)
}

async function sendForgotPassword() {
    var email = document.getElementById("input_email").value
    var res = await fetch(`${this.url}forgotpassword`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    }).then(res => res.json())
    if ("error" in res) {
        document.getElementById("input_email").value = ""
        this.response(res)
    } else
        window.location = "index.html"
}

async function forgotPassword() {
    var password = document.getElementById("input_password").value
    var passwordAgain = document.getElementById("input_password_again").value
    var id = new URL(window.location.href).searchParams.get("id")
    var res = await fetch(`${this.url}forgotpassword`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, password: password, passwordAgain: passwordAgain })
    }).then(res => res.json())
    if ("error" in res) {
        document.getElementById("input_password").value = ""
        document.getElementById("input_password_again").value = ""
        this.response(res)
    } else
        window.close()
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


async function getUser(url) {
    var res = await fetch(`${this.url}login`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
    if ("error" in res)
        window.location = "index.html"
    else {
        if (url == "product.html") {
            document.getElementById("username").innerHTML = `${res.username} ${res.id} ${res.email}`
            this.getAll()
        } else
            this.getFavorite()
    }
}

async function logout() {
    await fetch(`${this.url}logout`, {
        method: "POST",
        credentials: "include"
    })
    window.location = "index.html"
}

// ajax

async function getAll() {
    var search = document.getElementById("input_search").value
    var url = `${this.url}products`
    if (search != "") {
        url += `?search=${search}`
    }
    var newData = await fetch(`${url}`, {
        method: "GET"
    }).then(newData => newData.json())
    if (JSON.stringify(this.data) != JSON.stringify(newData) || newData.length == 0) {
        this.data = newData
        list()
    }
}
if (window.location == "product.html")
    setInterval(getAll, 500)

function list() {
    document.getElementById("tbody_product").innerHTML = "";
    var x = ""
    if (this.data.length > 0) {
        this.data.forEach(i => {
            x += `
            <tr>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>
                    <select class="form-control" id="input_table_upd_keszleten_${i.id}" onchange="updateKeszleten(${i.id})">`
                    if (i.availability == 1) {
                        x += `
                        <option value="1" selected>Igen</option>
                        <option value="0">Nem</option>`
                    } else {
                        x += `
                        <option value="1">Igen</option>
                        <option value="0" selected>Nem</option>`
                    }
                    x += `</select>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="torles(${i.id})">Törlés</button>
                    <button class="btn btn-primary" onclick="updateForm(${i.id})">Módosítás</button>
                </td>
            </tr>`
        });
    } else {
        x = `<tr><td colspan="5"><h3>Nincs adat</h3></td></tr>`
    }
    document.getElementById("tbody_product").innerHTML += x;
}

async function insert() {
    var name = document.getElementById("input_nev").value
    var price = document.getElementById("input_ar").value
    var availability = document.getElementById("input_keszleten").value

    var data = { name: name, price: price, availability: availability }
    await fetch(`${this.url}products`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(loadingAdd())
    .then(getAll())
    var name = document.getElementById("input_nev").value = ""
    var price = document.getElementById("input_ar").value = ""
}

async function torles(id) {
    await fetch(`${this.url}products/${id}`, {
        method: "DELETE"
    }).then(getAll())
}

async function updateForm(id) {
    var data = await fetch(`${this.url}products/${id}`, {
        method: "GET"
    }).then(data => data.json())
    document.getElementById("updateForm").innerHTML = ""
    x = `
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Módosítás</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="padding: 2%; margin:auto">
                        <div class="form-group">
                            <input class="form-control" type="text" id="input_upd_nev" placeholder="Név" value="${data.name}">
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="number" id="input_upd_ar" placeholder="Ár" value="${data.price}">
                        </div>
                        <div class="form-group">
                            <p>Készleten</p>
                            <select class="form-control" id="input_upd_keszleten">`
                            if (data.availability == 1) {
                                x += `
                                <option value="1" selected>Igen</option>
                                <option value="0">Nem</option>`
                            } else {
                                x += `
                                <option value="1">Igen</option>
                                <option value="0" selected>Nem</option>`
                            }
                            x += `
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-dismiss="modal" onclick="update(${id})">Módosítás</button>
                </div>
            </div>
        </div>
    </div>`
    // jQuery-t ki kell váltani - BS5
    document.getElementById("updateForm").innerHTML = x
    $(document).ready(function() {
        $("#updateModal").modal("show")
    })
}

async function update(id) {
    var name = document.getElementById("input_upd_nev").value
    var price = document.getElementById("input_upd_ar").value
    var availability = document.getElementById("input_upd_keszleten").value

    var data = { name: name, price: price, availability: availability }
    await fetch(`${this.url}products/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(loadingAdd())
    .then(getAll())
}

async function updateKeszleten(id) {
    var availability = document.getElementById(`input_table_upd_keszleten_${id}`).value
    var data = await fetch(`${this.url}products/${id}`, {
        method: "GET"
    }).then(data => data.json())
    await fetch(`${this.url}products/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: data.name, price: data.price, availability: availability })
    }).then(getAll())
}

function loadingAdd() {
    // töltőképernyő
    document.getElementById("loading").classList.add("loading")
}
function loadingRemove() {
    document.getElementById("loading").classList.remove("loading")
}

// FAVORIT

async function addFavorite(id) {
    await fetch(`${this.url}favorite/${id}`, {
        method: "POST",
        credentials: "include"
    })
}

async function getFavorite() {
    var res = await fetch(`${this.url}favorite`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
    document.getElementById("tbody_favorite").innerHTML = "";
    var x = ""
    if (res.length > 0) {
        res.forEach(i => {
            x += `
            <tr>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>`
                    x += i.availability == 1 ? `Igen` : `Nem
                </td>
                <td>
                    Gomb helye
                </td>
            </tr>`
        });
    } else {
        x = `<tr><td colspan="4"><h3>Nincs kedvenc</h3></td></tr>`
    }
    document.getElementById("tbody_favorite").innerHTML += x;
}

async function removeFavorite(id) {
    await fetch(`${this.url}favorite/${id}`, {
        method: "DELETE"
    }).then(getFavorite())
}