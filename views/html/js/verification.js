var parameter = require("./parameter.json")

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