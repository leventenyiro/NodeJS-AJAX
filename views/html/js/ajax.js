this.url = "http://localhost:8080/"
this.data = []

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
                    <select class="form-control" id="input_table_upd_keszleten_${i.id}" onchange="updateKeszleten(${i.id})">`
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

async function insert() {
    var nev = document.getElementById("input_nev").value
    var ar = document.getElementById("input_ar").value
    var keszleten = document.getElementById("input_keszleten").value

    var data = { nev: nev, ar: ar, keszleten: keszleten }
    await fetch(`${this.url}products`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(loadingAdd())
    .then(getAll())
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
    // jQuery-t ki kell váltani - BS5
    document.getElementById("updateForm").innerHTML = x
    $(document).ready(function() {
        $("#updateModal").modal("show")
    })
}

async function update(id) {
    var nev = document.getElementById("input_upd_nev").value
    var ar = document.getElementById("input_upd_ar").value
    var keszleten = document.getElementById("input_upd_keszleten").value

    var data = { nev: nev, ar: ar, keszleten: keszleten }
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
    var keszleten = document.getElementById(`input_table_upd_keszleten_${id}`).value
    var data = await fetch(`${this.url}products/${id}`, {
        method: "GET"
    }).then(data => data.json())
    await fetch(`${this.url}products/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nev: data.nev, ar: data.ar, keszleten: keszleten })
    }).then(getAll())
}

function loadingAdd() {
    // töltőképernyő
    document.getElementById("loading").classList.add("loading")
}
function loadingRemove() {
    document.getElementById("loading").classList.remove("loading")
}