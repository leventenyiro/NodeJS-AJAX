this.ip = "192.168.0.10"

function getAll() {
    var xhttp = new XMLHttpRequest()

    var search = document.getElementById("input_search").value
    var url = `http://${this.ip}:8080/products`
    console.log(url)
    if (search != "") {
        url += `?search=${search}`
    }
    xhttp.open("GET", url, false)
    xhttp.send()
    var data = JSON.parse(xhttp.response)
    document.getElementById("tbody").innerHTML = "";
    var x = ""
    if (data.length > 0) {
        data.forEach(i => {
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
        xhttp.open("POST", `http://${this.ip}:8080/products`, true)
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
    xhttp.open("DELETE", `http://${this.ip}:8080/products/${id}`, true)
    xhttp.send()
    
    getAll()
}

function updateForm(id) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", `http://${this.ip}:8080/products/${id}`, false)
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
                            <input class="form-control" type="text" id="input_upd_nev" placeholder="Név" value="${data[0].nev}">
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="number" id="input_upd_ar" placeholder="Ár" value="${data[0].ar}">
                        </div>
                        <div class="form-group">
                            <p>Készleten</p>
                            <select class="form-control" id="input_upd_keszleten">`
                            if (data[0].keszleten == 1) {
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
        xhttp.open("PUT", `http://${this.ip}:8080/products/${id}`, true)
        xhttp.setRequestHeader("Content-type", "application/json")
        xhttp.send(JSON.stringify(data))

        getAll()
    }
}

function updateKeszleten(id) {
    var xhttp = new XMLHttpRequest()

    xhttp.open("GET", `http://${this.ip}:8080/products/${id}`, false)
    xhttp.send()
    var data = JSON.parse(xhttp.response)

    var keszleten = document.getElementById("input_table_upd_keszleten").value
    xhttp.open("PUT", `http://${this.ip}:8080/products/${id}`, true)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify({nev: data[0].nev, ar: data[0].ar, keszleten: keszleten}))

    getAll()
}