


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
    
    const button = document.createElement("button");
    button.id = lang.name;
    button.class = "btn";
    button.innerText = "Remove";
    const newCard = document.createElement("div");
    newCard.id = lang.id;
    newCard.className = "card";
    newCard.innerHTML = `
        <h2>${lang.name}</h2>
        <img alt="${lang.name}" src="${lang.image}" class="avatar" />
    `;
    newCard.append(button);
    container.append(newCard);
    button.addEventListener("click", (e) => {
        const parent = e.target.parentElement.id;
        deleteLang(parent);
    });
}

function deleteLang(id) {
    const options = {
        method: "DELETE",
        headers : {
            "Content-Type": "application/json"
        }
    }
    const card = document.getElementById(id);
    card.remove();
    fetch(`http://localhost:3000/languages/${id}`, options);
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

