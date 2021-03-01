


document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
    })
})

function fetchCall (){
    fetch("http://localhost:3000/languages")
    .then(response => response.json())
    .then(data => {
        console.log(data)})
}

function makeNewCard(){
    let nameSearch = document.getElementById("name").value
    let imageSearch = document.getElementById("image").value
    let options = {
        method:"POST",
        header : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            "name" : nameSearch,
            "image" : imageSearch
        })
    }
    fetch("http://localhost:3000/languages", options)
    .then(response => response.json())
    .then(data => {
        console.log(data)})
}