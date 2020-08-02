var parameter = require("./parameter.json")
this.data = []

function getAll() {
    var xhttp = new XMLHttpRequest()

    var search = document.getElementById("input_search").value
    var url = `${parameter.url}/products`
    if (search != "") {
        url += `?search=${search}`
    }

    xhttp.open("GET", url, false)
    xhttp.send()
    newData = JSON.parse(xhttp.response)
    if (JSON.stringify(this.data) != JSON.stringify(newData) || newData.length == 0) {
        this.data = newData
        list()
    }
}
setInterval(getAll, 500)

function list() {
    document.getElementById("tbody").innerHTML = "";
    var x = ""
    if (this.data.length > 0) {
        this.data.forEach(i => {
            x += `
            <tr>
                <td>${i.nev}</td>
                <td>${i.ar}</td>
                <td>
                    <select class="form-control" id="input_table_upd_keszleten" onchange="updateKeszleten(${i.id})">`
                    if (i.keszleten == 1) {
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
    document.getElementById("tbody").innerHTML += x;
}

function insert() {
    var xhttp = new XMLHttpRequest()

    var nev = document.getElementById("input_nev").value
    var ar = document.getElementById("input_ar").value
    var keszleten = document.getElementById("input_keszleten").value

    if (document.getElementById("input_nev").value != "" && document.getElementById("input_ar").value != "") {
        var data = {nev: nev, ar: ar, keszleten: keszleten}
        xhttp.open("POST", `${parameter.url}/products`, false)
        xhttp.setRequestHeader("Content-type", "application/json")
        xhttp.send(JSON.stringify(data))

        document.getElementById("input_nev").value = ""
        document.getElementById("input_ar").value = ""
        document.getElementById("input_keszleten").value = 1
    
        getAll()
    }
}

function torles(id) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("DELETE", `${parameter.url}/products/${id}`, false)
    xhttp.send()
    
    getAll()
}

function updateForm(id) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", `${parameter.url}/products/${id}`, false)
    xhttp.send()
    var data = JSON.parse(xhttp.response)
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
                            <input class="form-control" type="text" id="input_upd_nev" placeholder="Név" value="${data.nev}">
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="number" id="input_upd_ar" placeholder="Ár" value="${data.ar}">
                        </div>
                        <div class="form-group">
                            <p>Készleten</p>
                            <select class="form-control" id="input_upd_keszleten">`
                            if (data.keszleten == 1) {
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
    document.getElementById("updateForm").innerHTML = x
    $(document).ready(function() {
        $("#updateModal").modal("show")
    })
}

function update(id) {
    var xhttp = new XMLHttpRequest()

    var nev = document.getElementById("input_upd_nev").value
    var ar = document.getElementById("input_upd_ar").value
    var keszleten = document.getElementById("input_upd_keszleten").value

    if (document.getElementById("input_upd_nev").value != "" && document.getElementById("input_upd_ar").value != "") {
        var data = {nev: nev, ar: ar, keszleten: keszleten}
        xhttp.open("PUT", `${parameter.url}/products/${id}`, false)
        xhttp.setRequestHeader("Content-type", "application/json")
        xhttp.send(JSON.stringify(data))

        getAll()
    }
}

function updateKeszleten(id) {
    var xhttp = new XMLHttpRequest()

    var keszleten = document.getElementById("input_table_upd_keszleten").value

    xhttp.open("GET", `${parameter.url}/products/${id}`, false)
    xhttp.send()
    var data = JSON.parse(xhttp.response)

    xhttp.open("PUT", `${parameter.url}/products/${id}`, false)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify({nev: data[0].nev, ar: data[0].ar, keszleten: keszleten}))

    getAll()
}