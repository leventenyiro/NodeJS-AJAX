function getAll() {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "http://localhost:8080/products", false)
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
                <td>${i.keszleten}</td>
            </tr>`
        });
    } else {
        x = `<tr><td colspan="3"><h3>Nincs adat</h3></td></tr>`
    }
    document.getElementById("tbody").innerHTML += x;
}

function insert() {
    var xhttp = new XMLHttpRequest()

    var nev = document.getElementById("input_nev").value
    var ar = document.getElementById("input_ar").value
    var keszleten = document.getElementById("input_keszleten").value

    var data = {nev: nev, ar: ar, keszleten: keszleten}
    xhttp.open("POST", "http://localhost:8080/products", true)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send(JSON.stringify(data))

    getAll()
}