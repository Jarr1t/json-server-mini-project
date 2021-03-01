


document.addEventListener("DOMContentLoaded", () => {
    const cardCont = document.querySelector("#collection");
    fetchCall(cardCont);
    let form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addLang();
    })
})

function fetchCall (cardCont){
    fetch("http://localhost:3000/languages")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(lang => newCard(lang, cardCont));
    });
}

function newCard(lang, container) {
    container.innerHTML += `
        <div id="${lang.id}" class="card">
            <h2>${lang.name}</h2>
            <img alt="${lang.name}" src="${lang.image}" class="avatar" />
            <button id="${lang.name}" class="btn">Remove</button>
        </div>`;
    const button = document.getElementById(lang.name);
    button.addEventListener("click", (e) => {
        const parent = e.target.parentElement().id;
        console.log("click")
        deleteLang(parent);
    });
}

function deleteLang(id) {
    console.log(id);
}

function addLang(){
    let nameSearch = document.getElementById("name").value
    let imageSearch = document.getElementById("image").value
    let options = {
        method:"POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            name : nameSearch,
            image : imageSearch
        })
    }

    fetch("http://localhost:3000/languages", options)
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector("#collection");
        newCard(data, container);
        debugger;
    });
}

