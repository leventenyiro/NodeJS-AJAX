function getAll() {
    var xhttp = new XMLHttpRequest()
    xhttp.open("GET", "http://localhost:8080/products", false)
    xhttp.send()
    var data = JSON.parse(xhttp.response)
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
        x = `<tr><td colspan="3">Nincs adat</td></tr>`
    }
    document.getElementById("tbody").innerHTML += x;
}